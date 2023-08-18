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
    if (params.user || params.date || params.title || params.userId) {
      const $and = [];

      if (params.date) {
        $and.push({ date: { $gte: params.date } });
      }

      if (params.title) {
        $and.push({ title: { $regex: params.title, $options: 'i' } });
      }

      if (params.user) {
        const validation = {
          path: 'user',
          match: { name: { $regex: params.user, $options: 'i' } }
        }
        const postResult = ($and.length > 0)
          ? await postModel.find({ $and }).populate(validation)
          : await postModel.find().populate(validation);

        return postResult.filter(post => post.user !== null);
      } else if (params.userId) {
        const validation = {
          path: 'user',
          match: { _id: params.userId }
        }
        const postResult = ($and.length > 0)
          ? await postModel.find({ $and }).populate(validation)
          : await postModel.find().populate(validation);

        return postResult.filter(post => post.user !== null);
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