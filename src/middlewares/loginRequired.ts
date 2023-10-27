import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel';
import { CustomReq, PromiseVoidOrRes } from '../types';

export default async (req: CustomReq, res: Response, next: NextFunction): PromiseVoidOrRes => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET as string);
    const { id, email, admin } = data as jwt.JwtPayload;
    const author = await UsersModel.findOne({
      where: {
        id,
      }
    })

    if(!author) {
      return res.status(401).json({
        errors: ['Expired or invalid author'],
      });
    }
    req.userId = id;
    req.userEmail = email;
    req.userAdmin = admin;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Expired or invalid token'],
    });
  }
};
