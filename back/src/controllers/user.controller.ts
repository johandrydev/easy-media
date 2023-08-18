import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";
import Joi from 'joi';
import { IUser } from "../types/user.type";

const schemaUserFull = Joi.object<IUser>({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

const schemaUser = Joi.object<IUser>({
    name: Joi.string().required(),
    email: Joi.string().required().email()
})

export class UserController {
  constructor(private userRepository: UserRepository) { }

  createUser = async ({ body }: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schemaUserFull.validate(body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const user = await this.userRepository.create(body);
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userRepository.findAll();
      res.send(users);
    } catch (error) {
      next(error);
    }
  }

  getUser = async ({ params }: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userRepository.findById(params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  updateUser = async ({ params, body }: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schemaUser.validate(body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const user = await this.userRepository.update(params.id, body);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  deleteUser = async ({ params }: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userRepository.delete(params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
}