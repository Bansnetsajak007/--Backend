import {Conversation} from "../config/models/chatModel.js";

// TODO: To explore
// roomUsersId => {senderId, receiverId}
export const getConversation = async (roomUsersId) => {
	const currentUserConversation = await Conversation.find({
		$or: [{sender: roomUsersId}, {receiver: roomUsersId}],
	})
		.sort({updatedAt: -1})
		.populate("messages")
		.populate("senderId")
		.populate("receiverId");


	return conversation || [];
};

// export const getConversation = async (roomUsersId) => {
// 	if (roomUsersId) {
// 		const currentUserConversation = await Conversation.find({
// 			$or: [{sender: roomUsersId}, {receiver: roomUsersId}],
// 		})
// 			.sort({updatedAt: -1})
// 			.populate("messages")
// 			.populate("sender")
// 			.populate("receiver");

// 		const conversation = currentUserConversation.map((conv) => {
// 			const countUnseenMsg = conv?.messages?.reduce((prev, curr) => {
// 				const msgByUserId = curr?.msgByUserId?.toString();

// 				if (msgByUserId !== roomUsersId) {
// 					return prev + (curr?.seen ? 0 : 1);
// 				} else {
// 					return prev;
// 				}
// 			}, 0);

// 			return {
// 				_id: conv?._id,
// 				sender: conv?.sender,
// 				receiver: conv?.receiver,
// 				unseenMsg: countUnseenMsg,
// 				lastMsg: conv.messages[conv?.messages?.length - 1],
// 			};
// 		});

// 		return conversation;
// 	} else {
// 		return [];
// 	}
// };
