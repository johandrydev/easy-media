import { IPostRepository, IPost, IParams } from "../types/post.type";
import dbconn from "../services/mongo.service";
import postModel from "../models/post.model";
import { UserRepository } from "./user.repository";

export class PostRepository implements IPostRepository {
  constructor(private userRepository: UserRepository) { }

  async create(post: IPost): Promise<IPost> {
    dbconn();
    return postModel.create(post);
  }
  async findAll(params?: IParams): Promise<IPost[]> {
    dbconn();
    if (params.user || params.date || params.title) {
      const $and = [];

      if (params.date) {
        const startDate = new Date(params.date);
        const endDate = new Date(params.date);
        endDate.setDate(endDate.getDate() + 1);
        $and.push({ date: { $gte: startDate, $lt: endDate } })
      }

      if (params.title) {
        $and.push({ title: { $regex: params.title, $options: 'i' } })
      }

      if (params.user) {
        const validation = {
          path: 'user',
          match: { _id: params.user }
        }

        let postResult = [];
        if ($and.length === 0) {
          postResult = await postModel.find().populate(validation);
        } else if ($and.length === 1) {
          postResult = await postModel.find($and[0]).populate(validation);
        } else {
          postResult = await postModel.find({ $and }).populate(validation);
        }
        return postResult.filter(post => post.user !== null);
      }

      if ($and.length === 0) {
        return await postModel.find().populate('user');
      } else if ($and.length === 1) {
        return await postModel.find($and[0]).populate('user');
      }

      return postModel.find({ $and }).populate('user');
    }

    return postModel.find().populate('user');
  }
  async findById(id: string): Promise<IPost | null> {
    dbconn();
    return postModel.findById(id).populate('user');
  }
  async findByUserId(user: string): Promise<IPost[]> {
    dbconn();
    return postModel.find({ user }).populate('user');
  }
  async update(id: string, post: IPost): Promise<IPost | null> {
    dbconn();
    return postModel.findByIdAndUpdate({ _id: id }, post, { new: true })
  }
  async delete(id: string): Promise<IPost | null> {
    dbconn();
    return postModel.findByIdAndRemove(id);
  }
}