import { useJsonContext } from "../JsonContext";
import { ArrayElementProps } from "../global";
import { hasValue } from "../utils";
import ElementWrap from "./ElementWrap";

export default function ArrayElement({
  value,
  depth,
  keyName,
  parent,
  toggleExpand,
  expanded = false,
}: ArrayElementProps) {
  const { theme } = useJsonContext();
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
    <span
      onClick={() => toggleExpand(true)}
      style={{
        cursor: "pointer",
        background: theme.ellipsis,
        borderRadius: "4px",
        padding: "0 5px",
        margin: "0 2px",
      }}
    >
      ...
    </span>
  ) : null;
  const style = {
    display: expanded ? "block" : "inline",
  };
  return <div style={style}>{content}</div>;
}
