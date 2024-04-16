import { useJsonContext } from "../JsonContext";
import { TypeEnum, UndefinedElementProps } from "../global";
import ValueType from "./ValueType";

export default function NullElement({ value, isLast }: UndefinedElementProps) {
  const { showValueTypes, theme } = useJsonContext();
  return (
    <span style={{ color: theme.undefined }}>
      {value || "undefined"}
      {!isLast ? (
        <span style={{ color: "gray", marginLeft: "2px" }}>,</span>
      ) : null}
      {showValueTypes ? <ValueType valueType={TypeEnum.Undefined} /> : null}
    </span>
  );
}
