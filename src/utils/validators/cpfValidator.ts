import { mask, validate } from 'node-cpf';
import { cpfValidationRes, errorMessageParams } from '../../types';
import { getErrorMessage } from '../getErrorMessage';

export default function cpfValidator(
  cpf: string,
  errorsArray: string[],
  message: errorMessageParams,
): cpfValidationRes {
  let errors = [...errorsArray];
  if (!validate(cpf))
    errors = [
      ...errorsArray,
      getErrorMessage(message.errorName, ...message.args),
    ];
  return {
    cleanCpf: mask(cpf),
    cpfErrors: errors,
  };
}
