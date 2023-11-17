import { hash } from 'bcryptjs';
import UsersModel from '../../../models/UsersModel';
import { errorMessageParams } from '../../../types';
import { getErrorMessage } from '../../getErrorMessage';

export default async function checkPassword(
  password: string,
  model: string,
  errorsArray: string[],
  message: errorMessageParams,
): Promise<string[]> {
  if (model === 'users') {
    const cryptPassword = await hash(password, 8);
    const models = await UsersModel.findAll();
    let uniquePassword = true;

    for (const model of models) {
      uniquePassword = await model.passwordValidator(password);
    }

    if (uniquePassword) {
      errorsArray.push(getErrorMessage(message.errorName, ...message.args));
      return errorsArray;
    }
    return errorsArray;
  }

  return errorsArray;
}
