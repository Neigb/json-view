import { ArrayElementProps } from "../global";
import { hasValue } from "../utils";
import ElementWrap from "./ElementWrap";
import Ellipsis from "./Ellipsis";

export default function ArrayElement({
  value,
  depth,
  keyName,
  parent,
  toggleExpand,
  expanded = false,
}: ArrayElementProps) {
  const content = expanded ? (
    value.map((item, index) => (
      <ElementWrap
        keyName={index}
        key={index}
        value={item}
        depth={depth + 1}
        isLast={index + 1 === value.length}
        parent={{ keyName, parent, value }}
      />
    ))
  ) : hasValue(value) ? (
    <Ellipsis onClick={() => toggleExpand(true)} />
  ) : null;
  const style = {
    display: expanded ? "block" : "inline",
  };
  return <div style={style}>{content}</div>;
}
