import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


// Get all posts
// backend/controllers/posts.js
export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i'); // case-insensitive

    const query = {};

    if (searchQuery && searchQuery !== 'none') {
  const title = new RegExp(searchQuery, 'i');
  query.$or = [
    { title },
    { message: title }
  ];
}

    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    const posts = await PostMessage.find(query);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    if (!post) return res.status(404).send('Post not found');

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const post = req.body;
 console.log("📝 Creating post by:", req.userId);
  console.log("📝 Post data received:", post);
  const newPost = new PostMessage({
    ...post,
    creator: req.userId, // Set from middleware
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update post
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const postData = req.body;

  if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' });
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  try {
    const post = await PostMessage.findById(_id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    

    if (String(post.creator) !== req.userId)
      return res.status(403).json({ message: 'Not authorized to update this post' });

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, postData, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  try {
    const post = await PostMessage.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    

    if (String(post.creator) !== req.userId)
      return res.status(403).json({ message: 'Not authorized to delete this post' });

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Like/Unlike a post
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  try {
    const post = await PostMessage.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const index = post.likes.findIndex((userId) => userId === String(req.userId));

    if (index === -1) {
      // Not liked before → Like it
      post.likes.push(req.userId);
    } else {
      // Already liked → Unlike it
      post.likes = post.likes.filter((userId) => userId !== String(req.userId));
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { text, name, creator } = req.body;

  if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const post = await PostMessage.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = {
      text,
      name,
      creator,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    const updatedPost = await post.save();

    res.status(200).json(updatedPost); // <-- very important: return updatedPost
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Add Comment
export const addComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const post = await PostMessage.findById(id);
    const newComment = {
      text,
      creator: req.userId,
      createdAt: new Date(),
    };
    post.comments.push(newComment);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

// Update Comment
export const updateComment = async (req, res) => {
  const { id, commentId } = req.params;
  const { text } = req.body;

  const post = await PostMessage.findById(id);
  const comment = post.comments.id(commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  if (comment.creator !== req.userId)
    return res.status(403).json({ message: "Unauthorized" });

  comment.text = text;
  await post.save();
  res.status(200).json(post);
};

// Delete Comment
export const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  const post = await PostMessage.findById(id);
  const comment = post.comments.id(commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  if (comment.creator !== req.userId)
    return res.status(403).json({ message: "Unauthorized" });

  comment.deleteOne();
  await post.save();
  res.status(200).json(post);
};
