import { useJsonContext } from "../JsonContext";
import { BigintElementProps, TypeEnum } from "../global";
import ValueType from "./ValueType";

export default function BigintElement({ value, isLast }: BigintElementProps) {
  const { showValueTypes, theme } = useJsonContext();
  return (
    <span style={{ color: theme.BigInt }}>
      {String(value)}
      {!isLast ? (
        <span style={{ color: "gray", marginLeft: "2px" }}>,</span>
      ) : null}
      {showValueTypes ? <ValueType valueType={TypeEnum.BigInt} /> : null}
    </span>
  );
}
