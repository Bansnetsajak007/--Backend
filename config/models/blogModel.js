import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  created_at: { type: Date, default: Date.now }
});

const Blogs = mongoose.model('Post', postSchema);

export default Blogs;
