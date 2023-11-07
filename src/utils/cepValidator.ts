import cep from 'cep-promise';
import { CepObjRes } from '../types';
import splitIndex from './splitIndex';

export default async function cepValidator(value: string): Promise<boolean | string> {
  const cepObject: CepObjRes = await cep(value);
  if('name' in cepObject) return false;
  const newValue = splitIndex(value, 5);
  return newValue;
};
