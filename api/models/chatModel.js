import mongoose from "mongoose"
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  userIDs: { type: [mongoose.Types.ObjectId], required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  seenBy: { type: [mongoose.Types.ObjectId], ref: 'User' },
  messages: { type: [mongoose.Types.ObjectId], ref: 'Message' },
  lastMessage: { type: String }
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
