import { IUser } from "./user.type";

export interface IPost {
  _id?: string;
  title: string;
  message?: string;
  date: Date;
  user?: IUser;
};

export interface IParams {
  user?: string;
  date?: string;
  title?: string;
  userId?: string;
}

export interface IPostRepository {
  create(post: IPost): Promise<IPost>;
  update(id: string, post: IPost): Promise<IPost | null>;
  findAll(params?: IParams): Promise<IPost[]>;
  findById(id: string): Promise<IPost | null>;
  findByUserId(userId: string): Promise<IPost[]>;
  delete(id: string): Promise<IPost | null>;
};