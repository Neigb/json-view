import { useJsonContext } from "../JsonContext";
import { StringElementProps, TypeEnum } from "../global";
import ValueType from "./ValueType";

export default function StringElement({ value, isLast }: StringElementProps) {
  const { showValueTypes, theme } = useJsonContext();
  return (
    <span style={{ color: theme.string }}>
      "{value}"
      {!isLast ? (
        <span style={{ color: "gray", marginLeft: "2px" }}>,</span>
      ) : null}
      {showValueTypes ? <ValueType valueType={TypeEnum.String} /> : null}
    </span>
  );
}
