
const SqlWhereParser = require('sql-where-parser');
const OPERATOR_UNARY_MINUS = Symbol('-');

export function validateExpression(exp: string): string | undefined {

  const parser = new SqlWhereParser();
  const params = {} as any;
  const evaluator = (operatorValue: string | typeof OPERATOR_UNARY_MINUS, operands: any[]) => {
    if (operatorValue === OPERATOR_UNARY_MINUS) {
      operatorValue = '-';
    }
    if (operatorValue === ',') {
      return [].concat(operands[0], operands[1]);
    }

    switch (operatorValue) {
      case 'OR':
        return `(${operands.join(' OR ')})`;
      case 'AND':
        return `(${operands.join(' AND ')})`;
      default:
        const arr = operands[0].split('.');
        //let modelAlias = ownerMeta.alias;
        if (arr.length > 1) {
          //const relation = ownerMeta.findRelatiOrFailed(arr[0]);
          //if (relation) {
           // operands[0] = arr[1];
           // modelAlias = relation.alias;
          //}
        }
        //operands[0] = `${modelAlias}.${operands[0]}`;
        //params[paramName] = operands[1];
        //if (operatorValue === 'IN') {
        //  return `${operands[0]} ${operatorValue} (:...${paramName})`;
        //}
        //return `${operands[0]} ${operatorValue} :${paramName}`;
    }
  };

  //const parsed = parser.parse(commandMeta.value, evaluator);
  return '哈哈';
}
