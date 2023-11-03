import { Response } from 'express';
import UsersModel from '../models/UsersModel';
import { CustomReq, PromiseRes } from '../types';
import Controller from '../types/Controller';
import cepValidator from '../utils/cepValidator';
import cpfValidator from '../utils/cpfValidatior';

class UsersController extends Controller {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const newUser = await UsersModel.create(req.body);
      const { id, name, lastname, email, cpf, cep } = newUser;
      const cleanCpf = cpfValidator(cpf);
      const cleanCep = await cepValidator(cep);

      cleanCep === false
      ? res.status(404).json({
          errors: ['Invalid Cep'],
        })
      : cleanCep;

      cleanCpf === false
        ? res.status(404).json({
            errors: ['Invalid Cpf'],
          })
        : cleanCpf;

      return res.json({ id, name, lastname, email, cleanCpf, cleanCep });
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }

  async index(req: CustomReq, res: Response): PromiseRes {
    try {
      const Users = await UsersModel.findAll({
        attributes: ['id', 'name', 'lastname', 'email', 'cpf'],
      });
      return res.json(Users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req: CustomReq, res: Response): PromiseRes {
    try {
      const User = await UsersModel.findByPk(req.params.id, {
        attributes: ['id', 'name', 'lastname', 'email', 'cpf'],
      });
      return res.json(User);
    } catch (e) {
      return res.json({ errors: ["this user doesn't exist"] });
    }
  }

  async update(req: CustomReq, res: Response): PromiseRes {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not sent'],
        });
      }
      const user = await UsersModel.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['user not found'],
        });
      }
      const newData = await user.update(req.body);
      const { id, email, name, lastname, cpf, cep } = newData;
      const cleanCpf = cpfValidator(cpf);
      const cleanCep = await cepValidator(cep);

      cleanCep === false
      ? res.status(404).json({
          errors: ['Invalid Cep'],
        })
      : cleanCep;

      cleanCpf === false
        ? res.status(404).json({
            errors: ['Invalid Cpf'],
          })
        : cleanCpf;

        return res.json({ id, email, name, lastname, cleanCpf });
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }

  async delete(req: CustomReq, res: Response): PromiseRes {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not sent'],
        });
      }
      const user = await UsersModel.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }
      await user.destroy();
      return res.json(`This user was deleted successfully`);
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }
}

export default new UsersController();
