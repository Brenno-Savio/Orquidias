import { Response } from 'express';
import CategoriesModel from '../models/CategoriesModel';
import ClothesModel from '../models/ClothesModel';
import UsersModel from '../models/UsersModel';
import { CustomReq, PromiseRes } from '../types';
import Controller from '../types/Controller';
import exist from '../utils/exist';

class ClothesController extends Controller {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const validUser = await exist(req.body.user_id, UsersModel);
      const validCategory = await exist(req.body.category_id, CategoriesModel);

      if (!validUser || !validCategory) {
        return res.status(404).json({ errors: ['User or Category not found'] });
      }

      req.body.slug = `${req.body.name.replace(' ', '-')}-${req.body.color}`;
      const newClothe = await ClothesModel.create(req.body);
      const { id, name, price, stock, color, slug, user_id, category_id } =
        newClothe;

      return res.json({
        id,
        name,
        price,
        stock,
        color,
        slug,
        user_id,
        category_id,
      });
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }

  async index(req: CustomReq, res: Response): PromiseRes {
    try {
      const Users = await ClothesModel.findAll({
        attributes: [
          'id',
          'name',
          'price',
          'stock',
          'color',
          'slug',
          'user_id',
          'category_id',
        ],
      });
      return res.json(Users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req: CustomReq, res: Response): PromiseRes {
    try {
      const User = await ClothesModel.findByPk(req.params.id, {
        attributes: [
          'id',
          'name',
          'price',
          'stock',
          'color',
          'slug',
          'user_id',
          'category_id',
        ],
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
      const clothe = await ClothesModel.findByPk(req.params.id);
      if (!clothe) {
        return res.status(400).json({
          errors: ['clothe not found'],
        });
      }

      if(req.body.user_id || req.body.category_id) {
        const validUser = await exist(req.body.user_id, UsersModel);
        const validCategory = await exist(req.body.category_id, CategoriesModel);

        if (!validUser || !validCategory) {
          return res.status(404).json({ errors: ['User or Category not found'] });
        }
      }

      const newData = await clothe.update(req.body);
      const { id, name, price, stock, color, slug, user_id, category_id } =
        newData;

      return res.json({
        id,
        name,
        price,
        stock,
        color,
        slug,
        user_id,
        category_id,
      });
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
      const user = await ClothesModel.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }
      if (user.stock > 0) {
        return res.status(400).json({
          errros: ['This clothe cannot be exclud while stock is more than 0'],
        });
      }
      await user.destroy();
      return res.json('This user was deleted successfully');
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }
}

export default new ClothesController();
