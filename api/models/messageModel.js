import mongoose from "mongoose"
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  chatId: { type: mongoose.Types.ObjectId, required: true, ref: 'Chat' },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
