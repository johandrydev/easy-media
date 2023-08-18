import mongoose from 'mongoose';
import { IUser } from '../types/user.type';

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  const { password, ...rest } = obj;
  return rest;
}

export default mongoose.model('User', userSchema);