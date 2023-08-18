import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

const schemaLogin = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
})

export class AuthController {
  constructor(private userRepository: UserRepository) { }

  login = async ({ body }: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schemaLogin.validate(body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const user = await this.userRepository.findByEmail(body.email);
      if (!user) return res.status(400).json({ message: 'Invalid data' });

      const validPassword = await bcrypt.compare(body.password, user.password);
      if (!validPassword) return res.status(400).json({ message: 'Invalid data' });

      // create token
      const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
      }, process.env.TOKEN_SECRET);
      
      res.json({
        data: {
          user,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }
}