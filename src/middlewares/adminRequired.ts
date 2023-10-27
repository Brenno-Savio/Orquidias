import { NextFunction, Response } from 'express';
import UsersModel from '../models/UsersModel';
import { CustomReq, PromiseVoidOrRes } from '../types';

export default async (req: CustomReq, res: Response, next: NextFunction): PromiseVoidOrRes => {
  try {
    const user = await UsersModel.findByPk(req.params.id, {attributes: ['admin']});
    if(!user?.admin) return res.status(400).json({
      erros: ['This option is only available for admins']
    });

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Invalid user'],
    });
  }
};
