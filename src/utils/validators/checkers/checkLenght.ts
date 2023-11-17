import { errorMessageParams } from '../../../types';
import { getErrorMessage } from '../../getErrorMessage';

export default function checkLength(
  value: string,
  start: number,
  limit: number,
  errorsArray: string[],
  message: errorMessageParams,
): string[] {
  const valid = value.length > start && value.length < limit;
  valid === false
    ? errorsArray.push(getErrorMessage(message.errorName, ...message.args))
    : null;
  return errorsArray;
}
