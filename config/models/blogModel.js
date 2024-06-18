import mongoose, { Types } from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  createdBy: {
    type: String,
    require: true
  },
  userId: {
    type: Types.ObjectId,
    require: true,
    ref: "User"
  }
}, {timestamps: true});

const Blogs = mongoose.Blog || mongoose.model('Blog', postSchema);

export default Blogs;
