import { Response } from 'express';
import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel';
import { CustomReq, PromiseRes } from '../types';

class TokenController {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({ errors: ['Invalid email or password'] });
      }

      const user = await UsersModel.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ errors: ['This user not exist'] });
      }

      if (!(await user.passwordValidator(password))) {
        return res.status(401).json({ errors: ['Invalid password'] });
      }

      if (!process.env.TOKEN_SECRET) {
        return res.status(401).json({
          errors: ['An unexpected error has occurred, please contact support'],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ token });
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }
}

export default new TokenController();
