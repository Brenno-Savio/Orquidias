import { Response } from 'express';
import { CustomReq, PromiseRes } from '.';

export default abstract class Controller {
  abstract store(req: CustomReq, res: Response): PromiseRes;
  abstract index(req: CustomReq, res: Response): PromiseRes;
  abstract show(req: CustomReq, res: Response): PromiseRes;
  abstract update(req: CustomReq, res: Response): PromiseRes;
  abstract delete(req: CustomReq, res: Response): PromiseRes;
}
