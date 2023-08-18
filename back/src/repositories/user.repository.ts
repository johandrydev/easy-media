import userModel from "../models/user.model";
import dbconn from "../services/mongo.service";
import bcrypt from "bcrypt";
import { IUser, IUserRepository } from "../types/user.type";

export class UserRepository implements IUserRepository {
  async create(user: IUser): Promise<IUser> {
    dbconn();
    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return await userModel.create(user);
  }
  async findAll(): Promise<IUser[]> {
    dbconn();
    return await userModel.find();
  }
  async findByName(name: string): Promise<IUser | null> {
    dbconn();
    return await userModel.findOne({ name });
  }
  async findByEmail(email: string): Promise<IUser | null> {
    dbconn();
    return await userModel.findOne({ email });
  }
  async findById(id: string): Promise<IUser | null> {
    dbconn();
    return await userModel.findById(id);
  }
  async update(id: string, user: IUser): Promise<IUser | null> {
    dbconn();
    return await userModel.findByIdAndUpdate({ _id: id }, user, { new: true });
  }
  async delete(id: string): Promise<IUser | null> {
    dbconn();
    return await userModel.findByIdAndRemove(id);
  }
}