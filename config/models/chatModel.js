import mongoose from "mongoose";
const {Schema, model, models, Types} = mongoose;

const messageSchema = new Schema(
	{
		text: {
			type: String,
			default: "",
		},
		seen: {
			type: Boolean,
			default: false,
		},
		fromId: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{timestamps: true}
);

const conversationSchema = new Schema(
	{
		sender: {
			type: Types.ObjectId,
			required: true,
			ref: "User",
		},
		receiver: {
			type: Types.ObjectId,
			required: true,
			ref: "User",
		},
		messages: [
			{
				type: Types.ObjectId,
				ref: "Message",
			},
		],
	},
	{timestamps: true}
);

const Message = models.Message || model("Message", messageSchema);
const Conversation =
	models.Conversation || model("Conversation", conversationSchema);

export {Message, Conversation};
