import { Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import { resolve } from 'path';
import multerConfig from '../config/multerConfig';
import PicturesModel from '../models/PicturesModel';
import { CustomFile, CustomReq, PromiseRes } from '../types';

const upload = multer(multerConfig).single('picture');

class PicturesController {
  store(req: CustomReq, res: Response): void {
    return upload(req, res, async (err): PromiseRes => {
      if (err) {
        return res.status(400).json({
          errors: [err],
        });
      }

      try {
        const { originalname, filename } = req.file as CustomFile;
        const { clothe_id } = req.body;
        const picture = await PicturesModel.create({
          originalname,
          filename,
          clothe_id,
        });

        return res.json(picture);
      } catch (e) {
        return res.status(400).json({
          errors: ['This post does not exist'],
        });
      }
    });
  }

  async delete(req: CustomReq, res: Response): PromiseRes {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not sent'],
        });
      }
      const picture = await PicturesModel.findByPk(req.params.id);
      if (!picture) {
        return res.status(400).json({
          errors: ['picture not found'],
        });
      }
      const filePath = resolve(
        __dirname,
        '..',
        '..',
        'uploads',
        'images',
        `${picture.filename}`,
      );
      fs.unlinkSync(filePath);
      await picture.destroy();
      return res.json(`this picture was deleted successfully`);
    } catch (e: any) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err: any) => err.message) });
    }
  }
}

export default new PicturesController();
