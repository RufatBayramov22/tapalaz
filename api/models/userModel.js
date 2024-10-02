import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true }, // Yeni alan
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  chatIDs: { type: [mongoose.Types.ObjectId], ref: 'Chat' }
});

const User = mongoose.model('User', userSchema);
export default User;
