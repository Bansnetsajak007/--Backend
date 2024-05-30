import mongoose from "mongoose";
const {models, Schema, model} = mongoose;

const marketplaceSchema = new Schema({
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
	},
	date: {
		type: Date,
		require: true,
	},
});

const Marketplace =
	models.Marketplace || model("Marketplace", marketplaceSchema);
export default Marketplace;
