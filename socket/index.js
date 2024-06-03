import express from "express";
import {Server} from "socket.io";
import http from "http";

// import {Conversation, Message} from "../config/models/chatModel";
// import getConversation from "../utils/getConversation";
// import User from "../config/models/userModel";

export const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

//online user
const onlineUser = new Set();

io.on("connection", async (socket) => {
    // using mongoDb _id as a socket identifier
    //DON'T forget. client-socket will have auth: {userId: mongoDB_id}
    socket.id = socket.handshake.auth.userId;
    console.log(`User connected: ${socket.id}`);

    // TODO: STORE in database
    /* messageObj shall hold = {
        senderId,
        receiverId,
        message,
    } */
	socket.on("sendMessage", (message) => {
        // console.log(message)
		io.emit("receive_message", message);
	});
	
	//disconnect
	socket.on("disconnect", () => {
		onlineUser.delete(socket.id?.toString());
		console.log("disconnect user ", socket.id);
	});
});

export {server};
