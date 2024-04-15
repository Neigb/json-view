import { useJsonContext } from "../JsonContext";
import { TypeEnum, UndefinedElementProps } from "../global";
import ValueType from "./ValueType";

export default function NullElement({ value, isLast }: UndefinedElementProps) {
  const { showValueTypes } = useJsonContext();
  return (
    <span style={{ color: "burlywood" }}>
      {value || "undefined"}
      {!isLast ? (
        <span style={{ color: "gray", marginLeft: "2px" }}>,</span>
      ) : null}
      {showValueTypes ? <ValueType valueType={TypeEnum.Undefined} /> : null}
    </span>
  );
}
