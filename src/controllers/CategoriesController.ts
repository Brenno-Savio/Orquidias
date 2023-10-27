import { Response } from 'express';
import CategoriesModel from '../models/CategoriesModel';
import { CustomReq, PromiseRes } from '../types';

class CategoryController {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const newCategory = await CategoriesModel.create(req.body);
      const { id, name } = newCategory;
      return res.json({ id, name });
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }

  async index(req: CustomReq, res: Response): PromiseRes {
    try {
      const categories = await CategoriesModel.findAll({
        attributes: ['id', 'name']
      });
      return res.json(categories);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req: CustomReq, res: Response): PromiseRes {
    try {
      const category = await CategoriesModel.findByPk(req.params.id, {
        attributes: ['id', 'name']
      });
      return res.json(category);
    } catch (e) {
      return res.json({ errors: ["this category doesn't exist"] });
    }
  }

  async update(req: CustomReq, res: Response): PromiseRes {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not sent'],
        });
      }
      const category = await CategoriesModel.findByPk(req.params.id);
      if (!category) {
        return res.status(400).json({
          errors: ['category not found'],
        });
      }
      const newData = await category.update(req.body);
      const { id, name } = newData;
      return res.json({ id, name });
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
      const category = await CategoriesModel.findByPk(req.params.id);
      if (!category) {
        return res.status(400).json({
          errors: ['category not found'],
        });
      }
      await category.destroy();
      return res.json(`this category was deleted successfully`);
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }
}

export default new CategoryController();
