import { ArrayElementProps } from "../global";
import ElementWrap from "./ElementWrap";

export default function ArrayElement({
  value,
  depth,
  keyName,
  parent,
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
  ) : (
    <span
      style={{
        background: "rgb(230,230,230)",
        borderRadius: "4px",
        padding: "0 5px",
        margin: "0 2px",
      }}
    >
      ...
    </span>
  );
  const style = {
    display: expanded ? "block" : "inline",
  };
  return (
    <div style={style}>{content}</div>
  );
}
