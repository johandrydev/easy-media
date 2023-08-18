import mongoose from 'mongoose';
import { IPost } from '../types/post.type';

const postSchema = new mongoose.Schema<IPost>({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


export default mongoose.model('Post', postSchema);