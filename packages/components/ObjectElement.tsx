import { Dict, ObjectElementProps } from "../global";
import { hasValue } from "../utils";
import ElementWrap from "./ElementWrap";
import Ellipsis from "./Ellipsis";
export default function ObjectElement({
  value,
  depth,
  parent,
  keyName,
  toggleExpand,
  candidate,
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
        candidate={ candidate ? (candidate as Dict)[key] : value[key]}
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
