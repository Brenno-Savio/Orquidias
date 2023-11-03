import cep from 'cep-promise';
import { CepObjRes } from '../types';

export default async function cepValidator(value: string): Promise<boolean | string> {
  const cepObject: CepObjRes = await cep(value);
  if('name' in cepObject) return false;
  return value;
};
