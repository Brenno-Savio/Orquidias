import { Response } from 'express';
import ClothesModel from '../models/ClothesModel';
import SalesModel from '../models/SalesModel';
import UsersModel from '../models/UsersModel';
import { CustomReq, PromiseRes } from '../types';
import Controller from '../types/Controller';
import exist from '../utils/exist';

class SalesController extends Controller {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const validUser = await exist(req.body.user_id, UsersModel);
      const validClothe = await exist(req.body.category_id, ClothesModel);

      if (!validUser || !validClothe) {
        return res.status(404).json({ errors: ['User or Clothe not found'] });
      }

      const newSale = await SalesModel.create(req.body);
      const { id, clothe_price, confirmed_sale, user_id, clothe_id } = newSale;
      return res.json({ id, clothe_price, confirmed_sale, user_id, clothe_id });
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }

  async index(req: CustomReq, res: Response): PromiseRes {
    try {
      const sales = await SalesModel.findAll({
        attributes: ['id', 'name'],
      });
      return res.json(sales);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req: CustomReq, res: Response): PromiseRes {
    try {
      const sale = await SalesModel.findByPk(req.params.id, {
        attributes: [
          'id',
          'clothe_price',
          'confirmed_sale',
          'user_id',
          'clothe_id',
        ],
      });
      return res.json(sale);
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
      const sale = await SalesModel.findByPk(req.params.id);
      if (!sale) {
        return res.status(400).json({
          errors: ['sale not found'],
        });
      }
      const newData = await sale.update(req.body);
      const { id, clothe_price, confirmed_sale, user_id, clothe_id } = newData;
      return res.json({ id, clothe_price, confirmed_sale, user_id, clothe_id });
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
      const sale = await SalesModel.findByPk(req.params.id);
      if (!sale) {
        return res.status(400).json({
          errors: ['sale not found'],
        });
      }
      await sale.destroy();
      return res.json(`this sale was deleted successfully`);
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }
}

export default new SalesController();
