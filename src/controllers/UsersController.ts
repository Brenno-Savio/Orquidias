import { Response } from 'express';
import { FindOptions, Op } from 'sequelize';
import UsersModel from '../models/UsersModel';
import { CustomReq, PromiseRes } from '../types';
import Controller from '../types/Controller';
import { getErrorMessage } from '../utils/getErrorMessage';
import reqValidator from '../utils/validators/reqValidator';

class UsersController extends Controller {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const requisition = {
        name: 'users',
        body: req.body,
        errors: [],
      };

      const validReq = await reqValidator(requisition);

      if (typeof validReq === 'undefined') {
        return res.status(500).json({
          errors: getErrorMessage('unknownError'),
        });
      }

      if (validReq?.errors.length > 0) {
        return res.status(400).json(validReq?.errors);
      }

      const { id, name, lastname, email, cpf, cep } = await UsersModel.create(
        validReq.body,
      );

      return res.status(200).json({ id, name, lastname, email, cpf, cep });
    } catch (e: any) {
      const err = e.errors.map((err: any) => err.message);

      if (
        err[0] === 'cpf must be unique' ||
        err[0] === 'email must be unique'
      ) {
        return res.status(400).json({
          errors: err,
        });
      }

      return res.status(400).json({
        errors: err,
      });

      // return res.status(500).json({
      //   errors: getErrorMessage('unknownError'),
      // });
    }
  }

  async index(req: CustomReq, res: Response): PromiseRes {
    const { filter, sort, page } = req.query;

    // const typedPage = page as pageType;

    const paramQuery: FindOptions = {
      attributes: ['id', 'name', 'lastname', 'email', 'cpf', 'cep', 'admin'],
    };
    let limit;
    let offset;

    if (typeof filter === 'string') {
      let query = filter.split(':');
      let status;

      if (query[0] === 'admin') {
        query[1] === 'true' ? (status = true) : (status = false);

        paramQuery.where = {
          [query[0]]: {
            [Op.eq]: status,
          },
        };
      } else {
        paramQuery.where = {
          [query[0]]: query[1],
        };
      }
    }

    console.log(req.query);

    try {
      console.log(paramQuery);

      const Users = await UsersModel.findAll(paramQuery);
      return res.json(Users);
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknownError'),
      });
    }
  }

  async show(req: CustomReq, res: Response): PromiseRes {
    try {
      const User = await UsersModel.findByPk(req.params.id, {
        attributes: ['id', 'name', 'lastname', 'email', 'cpf', 'cep', 'admin'],
      });
      return res.json(User);
    } catch (e) {
      return res.status(404).json({ errors: ['User not found'] });
    }
  }

  async update(req: CustomReq, res: Response): PromiseRes {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not sent'],
        });
      }

      const requisition = {
        name: 'users',
        body: req.body,
        errors: [],
      };

      const user = await UsersModel.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          errors: ['user not found'],
        });
      }

      if ((!user.admin && req.body.admin) || (user.admin && !req.body.admin)) {
        return res.status(400).json({
          errors: ['You cannot change your admin status'],
        });
      }

      const validReq = await reqValidator(requisition);

      if (typeof validReq === 'undefined') {
        return res.status(500).json({
          errors: getErrorMessage('unknownError'),
        });
      }

      if (validReq?.errors.length > 0) {
        return res.status(400).json(validReq?.errors);
      }

      const { id, email, name, lastname, cep, cpf, admin } = await user.update(
        validReq?.body,
      );
      return res.json({ id, email, name, lastname, cep, cpf, admin });
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknownError'),
      });
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
        return res.status(404).json({
          errors: ['User not found'],
        });
      }
      await user.destroy();
      return res.json(`This user was deleted successfully`);
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknownError'),
      });
    }
  }
}

export default new UsersController();
