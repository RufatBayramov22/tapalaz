import mongoose from "mongoose"
const Schema = mongoose.Schema;

const savedPostSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  postId: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },
  createdAt: { type: Date, default: Date.now }
});

savedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

const SavedPost = mongoose.model('SavedPost', savedPostSchema);
export default SavedPost;
