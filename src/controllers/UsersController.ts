import { Response } from 'express';
import UsersModel from '../models/UsersModel';
import { CustomReq, PromiseRes } from '../types';
import Controller from '../types/Controller';
import cepValidator from '../utils/cepValidator';
import cpfValidator from '../utils/cpfValidator';

class UsersController extends Controller {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const cleanCpf = cpfValidator(req.body.cpf);
      const cleanCep = await cepValidator(req.body.cep);

      if (!cleanCpf) {
        return res.status(404).json({
          errors: ['Invalid Cpf'],
        });
      }

      if (!cleanCep) {
        return res.status(404).json({
          errors: ['Invalid Cep'],
        });
      }

      req.body.cpf = cleanCpf;
      req.body.cep = cleanCep;

      const { id, name, lastname, email, cpf, cep } = await UsersModel.create(
        req.body,
      );

      return res.json({ id, name, lastname, email, cpf, cep });
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }

  async index(req: CustomReq, res: Response): PromiseRes {
    try {
      const Users = await UsersModel.findAll({
        attributes: ['id', 'name', 'lastname', 'email', 'cpf', 'cep', 'admin'],
      });
      return res.json(Users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req: CustomReq, res: Response): PromiseRes {
    try {
      const User = await UsersModel.findByPk(req.params.id, {
        attributes: ['id', 'name', 'lastname', 'email', 'cpf', 'cep', 'admin'],
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
      const cleanCpf = cpfValidator(req.body.cpf);
      const cleanCep = await cepValidator(req.body.cep);

      if (!cleanCpf) {
        return res.status(404).json({
          errors: ['Invalid Cpf'],
        });
      }

      if (!cleanCep) {
        return res.status(404).json({
          errors: ['Invalid Cep'],
        });
      }

      const user = await UsersModel.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['user not found'],
        });
      }

      if ((!user.admin && req.body.admin) || (user.admin && !req.body.admin)) {
        return res.status(400).json({
          errors: ['You cannot change your admin status'],
        });
      }

      const { id, email, name, lastname, cep, cpf, admin } = await user.update(
        req.body,
      );
      return res.json({ id, email, name, lastname, cep, cpf, admin });
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
