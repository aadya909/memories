import mongoose from "mongoose";

// Define comment schema
const commentSchema = mongoose.Schema({
  text: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String }, // Display name
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Define post schema
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,     // User ID
  name: String,        // User name for display
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: [commentSchema], // Use subdocument schema here
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
