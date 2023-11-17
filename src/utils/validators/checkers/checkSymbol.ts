import { errorMessageParams } from '../../../types';
import { getErrorMessage } from '../../getErrorMessage';

export default function checkSymbol(
  value: string,
  has: boolean,
  errorsArray: string[],
  message: errorMessageParams,
): string[] {
  const valid = /((?=.*\W)|(?=.*_))^[^ ]+$/.test(value);

  if (has) {
    if (!valid) {
      errorsArray.push(getErrorMessage(message.errorName, ...message.args));
      return errorsArray;
    }

    return errorsArray;
  } else {
    if (valid) {
      errorsArray.push(getErrorMessage(message.errorName, ...message.args));
      return errorsArray;
    }

    return errorsArray;
  }
}
