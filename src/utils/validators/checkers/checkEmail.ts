import isEmail from 'validator/lib/isEmail';
import { errorMessageParams } from '../../../types';

export default function checkEmail(
  value: string,
  errorsArray: string[],
  message: errorMessageParams,
): string[] {
  const valid = isEmail(value);
  if(!valid) {

  }

  return errorsArray;
}
