import { Op } from 'sequelize';

type ParamsObj = {
  where?: object;
};

const filterSystem = (filters: string[]) => {
  const paramsObj: ParamsObj = {};
  const filterArray = [];

  const operator = filters[0];
  filters.shift();

  for (const filter of filters) {
    let query: Array<any> = filter.split(':');

    if(query[0] === 'admin') {
      query[1] === 'true' ? query[1] = true : query[1] = false;
    }

    if (operator === 'equal') {
      if(typeof paramsObj.where !== 'undefined' ) {
        paramsObj.where = {...paramsObj.where,
          [query[0]]: {
            [Op.eq]: query[1],
          },
        };
      } else {
        paramsObj.where = {
          [query[0]]: {
            [Op.eq]: query[1],
          },
        };
      }
    }
    if (operator === 'not') {
      if(typeof paramsObj.where !== 'undefined' ) {
        paramsObj.where = {...paramsObj.where,
          [query[0]]: {
            [Op.ne]: query[1],
          },
        };
      } else {
        paramsObj.where = {
          [query[0]]: {
            [Op.ne]: query[1],
          },
        };
      }
    }
    if (operator === 'or') {
      filterArray.push({
        [query[0]]: query[1],
      });
      paramsObj.where = {
        [Op.or]: filterArray,
      };
    }
    if (operator === 'and') {
      filterArray.push({
        [query[0]]: query[1],
      });
      paramsObj.where = {
        [Op.and]: filterArray,
      };
    }
  }

  return paramsObj.where;
};

export default filterSystem;

// if (operator === 'equal') {
//   paramsObj.where = {
//     [query[0]]: {
//       [Op.eq]: query[1],
//     },
//   };
// }
// if (operator === 'not') {
//   paramsObj.where = {
//     [query[0]]: {
//       [Op.ne]: query[1],
//     },
//   };
// }
// if (operator === 'or') {
//   paramsObj.where = {
//     [Op.or]: [
//       {[query[0]]: query[1]},
//     ],
//   };
// }
// if (operator === 'and') {
//   paramsObj.where = {
//     [Op.and]: [{
//       [query[0]]: query[1],
//     }],
//   };
// }
