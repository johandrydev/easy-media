import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';

export const userRegisterRoute = Router();
export const userRoutes = Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

userRegisterRoute.post('/user', userController.createUser);

userRoutes.get('/user', userController.getUsers);
userRoutes.route('/user/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);
