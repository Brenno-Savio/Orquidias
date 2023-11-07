import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel';
import { CustomReq, PromiseVoidOrRes } from '../types';

export default async (
  req: CustomReq,
  res: Response,
  next: NextFunction,
): PromiseVoidOrRes => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  try {
    if (!token) return;
    const data = jwt.verify(token, process.env.TOKEN_SECRET as string);
    const { id } = data as jwt.JwtPayload;
    const user = await UsersModel.findByPk(id, { attributes: ['admin'] });

    if (!user?.dataValues.admin)
      return res.status(400).json({
        erros: ['This option is only available for admins'],
      });

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Invalid user'],
    });
  }
};
