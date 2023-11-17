import { CEP } from 'cep-promise';
import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
export type PromiseRes = Promise<Response<any, Record<string, any>>>;
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
export type PromiseVoidOrRes = Promise<void | Response<
  any,
  Record<string, any>
>>;
type CepErrorObjInner = {
  message: string;
  service: string;
};
export type CepErrorObj = {
  name: string;
  message: string;
  type: string;
  errors: CepErrorObjInner[];
};

export type CepObjRes = CepErrorObj | CEP;

export type UserBody = {
  name: string;
  lastname: string;
  cpf: string;
  cep: string;
  email: string;
  password: string;
  admin: boolean;
};

export type UserResponse = {
  req: UserBody;
  errors: string[];
  status: number[];
};

export type reqValidate = {
  name: string;
  body: UserBody;
  errors: string[];
};

export type errorsIndexType = {
  lengthError: string;
  validationError: string;
  mustHave: string;
  cannotHave: string;
  mustBeUnique: string;
};

export type errorMessageParams = {
  errorName: string;
  args: string[];
};

export type cepValidationRes = {
  cleanCep: string;
  cepErrors: string[];
};

export type cpfValidationRes = {
  cleanCpf: string;
  cpfErrors: string[];
};

export type paramQueryType = {
  attributes?: string[] | void[];
  limit?: string | ParsedQs | string[] | ParsedQs[] | number;
  order?: any[][];
  offset?: number;
  where?: {
    admin?: boolean;
  };
};

type pageKeys = {

};

export type pageType = {
  size?: string | number;
  number?: string | number;
}
