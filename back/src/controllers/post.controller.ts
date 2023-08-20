import { Request, Response, NextFunction } from "express";
import { PostRepository } from "../repositories/post.repository";
import Joi from 'joi';
import { IParams, IPost } from "../types/post.type";

const schemaPost = Joi.object<IPost>({
  title: Joi.string().required(),
  message: Joi.string().required()
})

export class PostController {
  constructor(private postRepository: PostRepository) { }

  createPost = async (req, res: Response, next: NextFunction) => {
    try {
      const { error } = schemaPost.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const user = req.user._id;
      const post = await this.postRepository.create({
        ...req.body,
        user
      });
      res.status(201).json({ data: post, message: 'Post created suscessfully' });
    } catch (error) {
      next(error);
    }
  }

  getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, date, title } = req.query;
      const posts = await this.postRepository.findAll({ user, date, title } as IParams);
      res.json({ data: posts });
    } catch (error) {
      next(error);
    }
  }

  getOwnPosts = async (req, res: Response, next: NextFunction) => {
    try {
      const { date } = req.query;
      const user = req.user._id;
      console.log(user);
      const posts = await this.postRepository.findAll({ user, date });
      res.json({ data: posts });
    } catch (error) {
      next(error);
    }
  }

  getPost = async ({ params }: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postRepository.findById(params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json({ data: post });
    } catch (error) {
      next(error);
    }
  }

  updatePost = async ({ params, body }: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schemaPost.validate(body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const post = await this.postRepository.update(params.id, body);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json({ data: post, message: 'Post updated suscessfully' });
    } catch (error) {
      next(error);
    }
  }

  deletePost = async ({ params }: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postRepository.delete(params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json({ message: 'Post deleted suscessfully' });
    } catch (error) {
      next(error);
    }
  }
}