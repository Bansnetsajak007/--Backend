import express from "express";
import {Server} from "socket.io";
import http from "http";

import {Conversation, Message} from "../config/models/chatModel.js";

export const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

//online user
const onlineUser = new Map(); // storing on (client's User Model's _id, changableClientSocket )

io.on("connection", async (socket) => {
	const mutableClientSocketId = socket.id; // client socket id

	// using mongoDb _id as a socket identifier
	//DON'T forget. client-socket will have auth: {token: mongoDB_id} in io connection
	socket.id = socket.handshake.auth.token; // setting client's _id as socket_id in server
	console.log(
		`User connected: ${socket.id}, original socketId: ${mutableClientSocketId}`
	);

	socket.join(socket.id); // create one room
	onlineUser.set(socket.id, mutableClientSocketId); // list of online users
	// console.log(onlineUser);

	// emit list of users available online
	io.emit("onlineUser", Array.from(onlineUser.keys()));

	/* messageObj shall hold = {
        senderId,
        receiverId,
        message,
    } */
	socket.on("sendMessage", async (messageObj) => {
		const {senderId, receiverId} = messageObj;

		try {
			// conversation exist?
			let conversation = await Conversation.findOne({
				$or: [
					{senderId, receiverId},
					{senderId: receiverId, receiverId: senderId},
				],
			});
			// no conversation exist
			if (!conversation) {
				const newConversation = await Conversation.create({
					senderId,
					receiverId,
				});
				conversation = await newConversation.save();
			}

			// creating message
			const message = new Message({
				text: messageObj.message,
				senderId,
			});
			const saveMessage = await message.save();

			// updating conversation's message field
			const updateConversation = await Conversation.updateOne(
				{_id: conversation._id},
				{$push: {messages: saveMessage._id}}
			);

			// get user's changable socket id from onlineUser map
			const senderSocketId = onlineUser.get(senderId);
			const receiverSocketId = onlineUser.get(receiverId);

			// check if users are online before sending socket for less load on server [P.E]
			if (senderSocketId) {
				io.to(senderSocketId).emit("receiveMessage", saveMessage);
			}
			if (senderSocketId) {
				io.to(receiverSocketId).emit("receiveMessage", saveMessage);
			}

		} catch (err) {
			console.log(err);
		}
	});

	socket.on("getConversationMessages", async(roomUsersId)=> {
		const {viewer, roomer} = roomUsersId;

		// get conversation
		const conversation = await Conversation.findOne({
			$or: [
				{senderId: viewer, receiverId: roomer},
				{senderId: roomer, receiverId: viewer},
			],
		});

		if(!conversation) return;

		const conversationMessageId = conversation?.messages || [];

		const viewerSocketId = onlineUser.get(viewer);
		const messages = await Message.find({
			_id: {$in: conversationMessageId}, // messageIdList is the array of message IDs
		});

		io.to(viewerSocketId).emit("receiveConversation", messages);

	})

	// on message box view, we'll emit seen where roomUsersId={viewer, roomer}
	socket.on("seen", async (roomUsersId) => {
		const {viewer, roomer} = roomUsersId;
		// console.log(viewer, roomer);

		// get conversation
		const conversation = await Conversation.findOne({
			$or: [
				{senderId: viewer, receiverId: roomer},
				{senderId: roomer, receiverId: viewer},
			],
		});


		const conversationMessageId = conversation?.messages || [];
		const updateMessages = await Message.updateMany(
			{
				_id: {$in: conversationMessageId},
				senderId: {$ne: viewer}, // senderId is not viewer
			},
			{$set: {seen: true}}
		);
	});

	//disconnect
	socket.on("disconnect", () => {
		onlineUser.delete(mutableClientSocketId);
		io.emit("onlineUser", Array.from(onlineUser.values()));
		console.log("disconnect user ", socket.id);
	});
});

export {server};
