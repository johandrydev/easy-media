import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) return res.status(403).json({ message: 'Access denied' });
  try {
    const tkn = token.includes('Bearer') ? token.split(' ')[1] : token;
    
    const decoded = jwt.verify(tkn, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ message: 'Invalid token' });
  }
};