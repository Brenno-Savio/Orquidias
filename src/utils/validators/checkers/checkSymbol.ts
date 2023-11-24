import { errorMessageParams } from '../../../types';
import { getErrorMessage } from '../../getErrorMessage';

export default function checkSymbol(
  value: string,
  has: boolean,
  errorsArray: string[],
  message: errorMessageParams,
): string[] {
  let valid

  if (has) {
    valid = /((?=.*\W)|(?=.*_))^[^ ]+$/.test(value);

    if (!valid) {
      errorsArray.push(getErrorMessage(message.errorName, ...message.args));
      return errorsArray;
    }

    return errorsArray;
  } else {
    valid = /[a-zA-Z0-9À-ÿ]+$/.test(value)

    if (!valid) {
      errorsArray.push(getErrorMessage(message.errorName, ...message.args));
      return errorsArray;
    }

    return errorsArray;
  }
}
