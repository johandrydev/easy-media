import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { PostRepository } from "../repositories/post.repository";
import { UserRepository } from "../repositories/user.repository";

const userRepository = new UserRepository();
const postRepository = new PostRepository(userRepository);
const postController = new PostController(postRepository);

export const postRoutes = Router();

postRoutes.get('/post/own', postController.getOwnPosts);
postRoutes.route('/post')
  .post(postController.createPost)
  .get(postController.getPosts);

postRoutes.route('/post/:id')
  .get(postController.getPost)
  .put(postController.updatePost)
  .delete(postController.deletePost);
