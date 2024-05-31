import mongoose from "mongoose";
const {models, Schema, model} = mongoose;

const marketplaceSchema = new Schema({
	userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
	itemName: {
		type: String,
		require: true
	},
	pictureUrl: {
		type: String,
		require: true,
	},
	price: {
		type: Number,
		require: true,
	},
	details: {
		type: String,
		require: true,
	},
	location: {
		type: String,
		require: true,
	},
	type: {
		type: String,
		enum: ["sale", "rent"],
		require: true,
		default: "sale"
	},
	date: {
		type: Date,
		require: true,
	},
});

const Marketplace =
	models.Marketplace || model("Marketplace", marketplaceSchema);
export default Marketplace;
