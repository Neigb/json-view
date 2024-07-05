import { useState } from "react";
import { useJsonContext } from "../JsonContext";
import { StringElementProps, TypeEnum } from "../global";
import ValueType from "./ValueType";
import Ellipsis from "./Ellipsis";
import { isLink } from "../utils";

export default function StringElement({ value, isLast }: StringElementProps) {
  const { showValueTypes, theme, stringMaxLength } = useJsonContext();
  const canExpand = stringMaxLength && value.length > stringMaxLength;
  const [showEllipsis, setShowEllipsis] = useState(canExpand);
  const toggleEllipsis = () => {
    setShowEllipsis(!showEllipsis);
  };
  const link = isLink(value);
  const color = link ? theme.link : theme.string;
  const ellipsisContent = link ? <a style={{ color }} href={value} target="_blank">{value.slice(0, stringMaxLength)}</a> : value.slice(0, stringMaxLength);
  const content = link ? <a style={{ color }} href={value} target="_blank">{value}</a> : value;
  return (
    <span style={{ color, whiteSpace: showEllipsis ? "nowrap" : "normal" }}>
      "
      {showEllipsis ? (
        <>
          {ellipsisContent}
          <Ellipsis
            style={{ background: "transparent", color, padding: 0}}
            onClick={toggleEllipsis}
          />
        </>
      ) : (
        <span style={{ cursor: !canExpand || showEllipsis ? "text" : "pointer"}} onClick={() => canExpand && !link ? setShowEllipsis(true) : void 0}>{content}</span>
      )}
      "
      {!isLast ? (
        <span style={{ color: "gray", marginLeft: "2px" }}>,</span>
      ) : null}
      {showValueTypes ? <ValueType valueType={TypeEnum.String} /> : null}
    </span>
  );
}
