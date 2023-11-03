import { CEP } from 'cep-promise';
import { Request, Response } from 'express';
export type PromiseRes = Promise<Response<any, Record<string, any>>>
interface UserRequest extends Request {
  userId?: number;
  userEmail?: string;
  userAdmin?: boolean;
  file?: CustomFile;
}
export interface CustomFile extends Express.Multer.File {
  originalname: string;
  filename: string;
}
export type CustomReq = Request & UserRequest;
export type PromiseVoidOrRes = Promise<void | Response<any, Record<string, any>>>;
type CepErrorObjInner = {
  message: string;
  service: string;
}
export type CepErrorObj = {
  name: string;
  message: string;
  type: string;
  errors: CepErrorObjInner[];
}

export type CepObjRes = CepErrorObj | CEP
