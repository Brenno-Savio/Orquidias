import cep from 'cep-promise';
import { CepObjRes, cepValidationRes, errorMessageParams } from '../../types';
import { getErrorMessage } from '../getErrorMessage';
import splitIndex from '../splitIndex';

export default async function cepValidator(
  value: string,
  errorsArray: string[],
  message: errorMessageParams,
): Promise<cepValidationRes> {
  try {
    const cepObject: CepObjRes = await cep(value);
    const newValue = splitIndex(value, 5);

    return {
      cleanCep: newValue,
      cepErrors: errorsArray,
    };
  } catch (error) {
    errorsArray.push(getErrorMessage(message.errorName, ...message.args));

    return {
      cleanCep: value,
      cepErrors: errorsArray,
    };
  }
}
