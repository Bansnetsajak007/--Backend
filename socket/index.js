import express from "express";
import {Server} from "socket.io";
import http from "http";

import {Conversation, Message} from "../config/models/chatModel.js";
import {getConversation} from "../utils/getConversation.js";


export const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

//online user
const onlineUser = new Map(); // storing on (changableClientSocket, client's User Model's _id )

io.on("connection", async (socket) => {
	console.log("socket id: ", socket.id)
	const mutableClientSocketId = socket.id; // client socket id

	// using mongoDb _id as a socket identifier
	//DON'T forget. client-socket will have auth: {token: mongoDB_id} in io connection
	socket.id = socket.handshake.auth.token; // setting client's _id as socket_id in server
	console.log(`User connected: ${socket.id}`);

	socket.join(socket.id); // create one room
	onlineUser.set(mutableClientSocketId, socket.id); // list of online users

	// console.log(onlineUser);

	// emit list of users available online
	io.emit("onlineUser", Array.from(onlineUser.values()));

	/* messageObj shall hold = {
        senderId,
        receiverId,
        message,
    } */
	socket.on("sendMessage", async (messageObj) => {
		console.log(messageObj);
		const {senderId, receiverId} = messageObj;

		try {
			// conversation exist?
			let conversation = await Conversation.findOne({senderId, receiverId});
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

			// updating conversation
			const updateConversation = await Conversation.updateOne(
				{_id: conversation._id},
				{$push: {messages: saveMessage._id}}
			);

			const getConversationMessage = await Conversation.findOne({
				$or: [
					{senderId, receiverId},
					{sender: receiverId, receiver: senderId},
				],
			})
				.populate("messages")
				.sort({updatedAt: -1});

                
			io.to(mutableClientSocketId).emit("receiveMessage", messageObj); // TODO: remove in production. [testing purposes]
			// sending message element to both sender and receiver
			// io.to(senderId).emit("receiveMessage", messageObj);
			io.to(receiverId).emit("receiveMessage", messageObj);
		} catch (err) {
			console.log(err);
		}
	});

	// on message box view, we'll emit seen where msgByUserId={senderId, receiverId}
	socket.on("seen", async (msgByUserId) => {
		const {senderId, receiverId} = msgByUserId;

		let conversation = await Conversation.findOne({
			$or: [
				{senderId, receiverId},
				{senderId, receiverId},
			],
		});

		const conversationMessageId = conversation?.messages || [];

		// set all message to seen, TODO: definately change the seen processing
		const updateMessages = await Message.updateMany(
			{_id: {$in: conversationMessageId}, msgByUserId: msgByUserId},
			{$set: {seen: true}}
		);

		//send conversation
		const conversationSender = await getConversation(user?._id?.toString());
		const conversationReceiver = await getConversation(msgByUserId);

		io.to(user?._id?.toString()).emit("conversation", conversationSender);
		io.to(msgByUserId).emit("conversation", conversationReceiver);
	});

	//disconnect
	socket.on("disconnect", () => {
		onlineUser.delete(mutableClientSocketId);
		io.emit("onlineUser", Array.from(onlineUser.values()));
		console.log("disconnect user ", socket.id);
	});
});

export { server };