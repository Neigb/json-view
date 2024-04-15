import { TypeEnum } from "../global";

const TypeDict = {
  boolean: TypeEnum.Boolean,
  number: TypeEnum.Number,
  string: TypeEnum.String,
  object: TypeEnum.Object,
  function: TypeEnum.Function,
  symbol: TypeEnum.Symbol,
  bigint: TypeEnum.BigInt,
  undefined: TypeEnum.Undefined,
  date: TypeEnum.Date,
  array: TypeEnum.Array,
}

export const getValueType = (value: unknown): TypeEnum => {
  if (value === null) {
    return TypeEnum.Null;
  }
  if (Array.isArray(value)) {
    return TypeEnum.Array;
  }
  if (value instanceof Date) {
    return TypeEnum.Date;
  }
  return TypeDict[typeof value];
};
