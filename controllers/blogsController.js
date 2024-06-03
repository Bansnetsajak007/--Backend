import Blogs from "../config/models/blogModel.js";

const blogsController = {
    get: async (req, res) => {
        try {
            const data = await Blogs.find();
            if(data) return res.status(200).json({message: "Data Fetched successfully"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: error.message});
        }
       
    },

    createPost: async(req, res) => {
        try {
            const { title, body } = req.body;
            const newPost = new Blogs({ title, body });
            await newPost.save();
            res.status(201).json(newPost);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    },

    getPost: async(req, res) => {
        try {
            const post = await Blogs.findById(req.params.id);
            if (!post) return res.status(404).json({ error: 'Post not found' });
            res.json(post);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    },

    updatePost: async(req, res) => {
        try {
            const { title, body } = req.body;
            const post = await Blogs.findByIdAndUpdate(
              req.params.id,
              { title, body },
              { new: true }
            );
            if (!post) return res.status(404).json({ error: 'Post not found' });
            res.json(post);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        
    },

    deletePost: async(req, res) => {
        try {
            const post = await Blogs.findByIdAndDelete(req.params.id);
            if (!post) return res.status(404).json({ error: 'Post not found' });
            res.json({ message: 'Post deleted' });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    }
}

export default blogsController