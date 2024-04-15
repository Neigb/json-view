import { useJsonContext } from "../JsonContext";
import { NullElementProps, TypeEnum } from "../global";
import ValueType from "./ValueType";

export default function NullElement({ value, isLast }: NullElementProps) {
  const { showValueTypes } = useJsonContext();
  return (
    <span style={{ color: "pink" }}>
      {value || "null"}
      {!isLast ? (
        <span style={{ color: "gray", marginLeft: "2px" }}>,</span>
      ) : null}
      {showValueTypes ? <ValueType valueType={TypeEnum.Null} /> : null}
    </span>
  );
}
