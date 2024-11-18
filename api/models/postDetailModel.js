import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postDetailSchema = new Schema({
  desc: { type: String, required: true },
  postId: { type: mongoose.Types.ObjectId, unique: true, ref: 'Post' }
});

const PostDetail = mongoose.model('PostDetail', postDetailSchema);
export default PostDetail;
