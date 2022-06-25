import _ from 'lodash';
import fs from 'fs';

export default (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(firstPath);
  const secondFile = fs.readFileSync(secondPath);

  const firstObject = JSON.parse(firstFile);
  const secondObject = JSON.parse(secondFile);

  const allKeys = Object.keys({ ...secondObject, ...firstObject }).sort();

  let result = allKeys.reduce((acc, key) => {
    if (!_.hasIn(secondObject, key)) {
      return `${acc}\n  - ${key}: ${firstObject[key]}`;
    }

    if (_.hasIn(secondObject, key) && _.hasIn(firstObject, key)) {
      if (firstObject[key] === secondObject[key]) {
        return `${acc}\n    ${key}: ${firstObject[key]}`;
      }
      return `${acc}\n  - ${key}: ${firstObject[key]}\n  + ${key}: ${secondObject[key]}`;
    }
    return `${acc}\n  + ${key}: ${secondObject[key]}`;
  }, '{');

  result += '\n}';

  console.log(result);
};
