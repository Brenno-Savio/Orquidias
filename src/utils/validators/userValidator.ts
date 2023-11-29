import { reqValidate } from '../../types';
import { errorsIndex } from '../getErrorMessage';
import cepValidator from './cepValidator';
import checkEmail from './checkers/checkEmail';
import checkLength from './checkers/checkLenght';
import checkLowerLetter from './checkers/checkLowerLetter';
import checkNumber from './checkers/checkNumber';
import checkPassword from './checkers/checkPassword';
import checkSymbol from './checkers/checkSymbol';
import checkUpperLetter from './checkers/checkUpperLetter';
import cpfValidator from './cpfValidator';

export default async function UserValidator(req: reqValidate) {
  req.errors = [
    ...checkLength(req.body.name, 3, 20, req.errors, {
      errorName: errorsIndex.lengthError,
      args: ['name', '3', '20'],
    }),
  ];

  req.errors = [
    ...checkNumber(req.body.name, false, req.errors, {
      errorName: errorsIndex.cannotHave,
      args: ['name', 'numbers'],
    }),
  ];

  req.errors = [
    ...checkSymbol(req.body.name, false, req.errors, {
      errorName: errorsIndex.cannotHave,
      args: ['name', 'symbols'],
    }),
  ];

  req.errors = [
    ...checkLength(req.body.lastname, 3, 20, req.errors, {
      errorName: errorsIndex.lengthError,
      args: ['lastname', '3', '20'],
    }),
  ];

  req.errors = [
    ...checkNumber(req.body.lastname, false, req.errors, {
      errorName: errorsIndex.cannotHave,
      args: ['lastname', 'numbers'],
    }),
  ];

  req.errors = [
    ...checkSymbol(req.body.lastname, false, req.errors, {
      errorName: errorsIndex.cannotHave,
      args: ['lastname', 'symbols'],
    }),
  ];

  const { cleanCep, cepErrors } = await cepValidator(req.body.cep, req.errors, {
    errorName: errorsIndex.validationError,
    args: ['cep'],
  });

  req.errors = [...cepErrors];

  const { cleanCpf, cpfErrors } = await cpfValidator(req.body.cpf, req.errors, {
    errorName: errorsIndex.validationError,
    args: ['cpf'],
  });

  req.errors = [...cpfErrors];

  req.errors = [
    ...checkEmail(req.body.email, req.errors, {
      errorName: errorsIndex.validationError,
      args: ['email'],
    }),
  ];

  const passwordError = await checkPassword(
    req.body.password,
    'users',
    req.errors,
    {
      errorName: errorsIndex.mustBeUnique,
      args: ['password'],
    },
  );

  req.errors = [...passwordError];

  req.errors = [
    ...checkLength(req.body.password, 8, 16, req.errors, {
      errorName: errorsIndex.lengthError,
      args: ['password', '8', '16'],
    }),
  ];

  req.errors = [
    ...checkUpperLetter(req.body.password, true, req.errors, {
      errorName: errorsIndex.mustHave,
      args: ['password', 'one', 'uppercase'],
    }),
  ];

  req.errors = [
    ...checkLowerLetter(req.body.password, true, req.errors, {
      errorName: errorsIndex.mustHave,
      args: ['password', 'one', 'lowercase'],
    }),
  ];

  req.errors = [
    ...checkNumber(req.body.password, true, req.errors, {
      errorName: errorsIndex.mustHave,
      args: ['password', 'one', 'number'],
    }),
  ];

  req.errors = [
    ...checkSymbol(req.body.password, true, req.errors, {
      errorName: errorsIndex.mustHave,
      args: ['password', 'one', 'symbol'],
    }),
  ];

  req.body.cpf = cleanCpf;
  req.body.cep = cleanCep;

  return req;
}
