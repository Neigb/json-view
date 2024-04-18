import { useState } from "react";
import { useJsonContext } from "../JsonContext";
import { StringElementProps, TypeEnum } from "../global";
import ValueType from "./ValueType";
import Ellipsis from "./Ellipsis";

export default function StringElement({ value, isLast }: StringElementProps) {
  const { showValueTypes, theme, stringMaxLength } = useJsonContext();
  const canExpand = stringMaxLength && value.length > stringMaxLength;
  const [showEllipsis, setShowEllipsis] = useState(canExpand);
  const toggleEllipsis = () => {
    setShowEllipsis(!showEllipsis);
  };
  return (
    <span style={{ color: theme.string, whiteSpace: showEllipsis ? "nowrap" : "normal" }}>
      "
      {showEllipsis ? (
        <>
          {value.slice(0, stringMaxLength)}
          <Ellipsis
            style={{ background: "transparent", color: theme.string, padding: 0}}
            onClick={toggleEllipsis}
          />
        </>
      ) : (
        <span style={{ cursor: !canExpand || showEllipsis ? "text" : "pointer"}} onClick={() => canExpand ? setShowEllipsis(true) : void 0}>{value}</span>
      )}
      "
      {!isLast ? (
        <span style={{ color: "gray", marginLeft: "2px" }}>,</span>
      ) : null}
      {showValueTypes ? <ValueType valueType={TypeEnum.String} /> : null}
    </span>
  );
}
