import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dbconn from '../services/mongo.service';

import { UserDto } from '../dtos/user.dto';

export class AuthController {
  // constructor(private userDto: UserDto) { }
  login = async (req: Request, res: Response) => {
    dbconn();
    const user = {
      username: 'test',
      email: 'test@contact.com'
    };
    // create token
    const token = jwt.sign(user, process.env.TOKEN_SECRET);
    res.json({
      data: {
        ...user,
        token
      },
      message: 'Login'
    });
  }
}