import { ObjectElementProps } from "../global";
import ElementWrap from "./ElementWrap";
export default function ObjectElement({
  value,
  depth,
  parent,
  keyName,
  expanded = false,
}: ObjectElementProps) {
  const keys = Object.keys(value);
  const content = expanded ? (
    keys.map((key, index) => (
      <ElementWrap
        key={key}
        keyName={key}
        value={value[key]}
        depth={depth + 1}
        isLast={index + 1 === keys.length}
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
        height: "16px",
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
