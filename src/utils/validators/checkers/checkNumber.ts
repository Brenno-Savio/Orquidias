import { errorMessageParams } from '../../../types';
import { getErrorMessage } from '../../getErrorMessage';

export default function checkNumber(
  value: string,
  has: boolean,
  errorsArray: string[],
  message: errorMessageParams,
): string[] {
  const valid = /(?=.*\d)^[^ ]+$/.test(value);

  if (has) {
    if (!valid) {
      errorsArray.push(getErrorMessage(message.errorName, ...message.args));
      return errorsArray;
    }

    return errorsArray;
  }

  if (valid) {
    errorsArray.push(getErrorMessage(message.errorName, ...message.args));
    return errorsArray;
  }

  return errorsArray;
}
