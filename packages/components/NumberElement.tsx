import { useJsonContext } from "../JsonContext";
import { NumberElementProps, TypeEnum } from "../global";
import ValueType from "./ValueType";

export default function NumberElement({ value, isLast }: NumberElementProps) {
  const { showValueTypes } = useJsonContext();
  return (
    <span style={{ color: "green" }}>
      {value}
      {!isLast ? (
        <span style={{ color: "gray", marginLeft: "5px" }}>,</span>
      ) : null}
      {showValueTypes ? <ValueType valueType={TypeEnum.Number} /> : null}
    </span>
  );
}
