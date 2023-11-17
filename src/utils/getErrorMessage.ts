import { errorsIndexType } from '../types';

const getErrorMessage = (errorName: string, ...args: string[]): string => {
  const errorMessage = {
    lengthError: `The field ${args[0]} must be between ${args[1]} and ${args[2]} characters long.`,
    validationError: `The field ${args[0]} is invalid or already reserved.`,
    mustHave: `The field ${args[0]} must have at last ${args[1]} ${args[2]} character(s).`,
    cannotHave: `The field ${args[0]} can not have ${args[1]} as character(s).`,
    unknownError: 'The server has encountered a situation it does not know how to handle.',
    mustBeUnique: `The field ${args[0]} must be unique.`,
  };
  const errorAsArray = Object.entries(errorMessage);
  const [filtedError] = errorAsArray.filter(([key]) => key === errorName);
  return filtedError[1];
};

const errorsIndex: errorsIndexType = {
  lengthError: 'lengthError',
  validationError: 'validationError',
  mustHave: 'mustHave',
  cannotHave: 'cannotHave',
  mustBeUnique: 'mustBeUnique',
};

export { errorsIndex, getErrorMessage };
