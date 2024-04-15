import { useJsonContext } from "../JsonContext";
import { BooleanElementProps, TypeEnum } from "../global";
import ValueType from "./ValueType";

export default function BooleanElement({ value, isLast }: BooleanElementProps) {
  const { showValueTypes } = useJsonContext();
  return (
    <span style={{ color: "blue" }}>
      {value ? "true" : "false"}
      {!isLast ? (
        <span style={{ color: "gray", marginLeft: "2px" }}>,</span>
      ) : null}
      {showValueTypes ? <ValueType valueType={TypeEnum.Boolean} /> : null}
    </span>
  );
}
