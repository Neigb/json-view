import { useJsonContext } from "../JsonContext";
import { ObjectElementProps } from "../global";
import { hasValue } from "../utils";
import ElementWrap from "./ElementWrap";
export default function ObjectElement({
  value,
  depth,
  parent,
  keyName,
  toggleExpand,
  expanded = false,
}: ObjectElementProps) {
  const { theme } = useJsonContext();
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
