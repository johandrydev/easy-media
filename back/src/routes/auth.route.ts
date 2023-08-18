import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { UserRepository } from '../repositories/user.repository';

export const authRoutes = Router();

const userRepository = new UserRepository();
const authController = new AuthController(userRepository);

authRoutes.post('/login', authController.login);
