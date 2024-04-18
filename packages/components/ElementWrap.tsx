import { useState } from "react";
import { getValueType } from "../utils";
import ObjectElement from "./ObjectElement";
import StringElement from "./StringElement";
import ExpandIcon from "./ExpandIcon";
import NumberElement from "./NumberElement";
import ArrayElement from "./ArrayElement";
import { useJsonContext } from "../JsonContext";
import BooleanElement from "./BooleanElement";
import BigIntElement from "./BigIntElement";
import NullElement from "./NullElement";
import Checkbox from "./Checkbox";
import { ElementWrapProps, BaseValueType, TypeEnum, Dict } from "../global";
import UndefinedElement from "./UndefinedElement";

export default function ElementWrap({
  keyName,
  value,
  depth = 0,
  isLast,
  parent,
}: ElementWrapProps) {
  const {
    showStringQuotes,
    indent,
    iconSize,
    defaultExpandDepth,
    defaultExpanded,
    selectable,
    selectedInfo,
    theme,
    onSelect,
  } = useJsonContext();
  const [expanded, setExpanded] = useState(
    defaultExpanded && depth < defaultExpandDepth
  );
  const onToggleExpand = (value: boolean) => {
    setExpanded(value);
  };
  const defaultExpandIcon = (
    <ExpandIcon expanded={expanded} onClick={onToggleExpand} size={iconSize} />
  );

  const getContent = (value: BaseValueType) => {
    const type = getValueType(value);
    const commonProps = { keyName, isLast, parent };
    switch (type) {
      case TypeEnum.String:
        return <StringElement value={value as string} {...commonProps} />;
      case TypeEnum.Object:
        return (
          <ObjectElement
            value={value as Dict}
            expanded={expanded}
            depth={depth}
            toggleExpand={onToggleExpand}
            {...commonProps}
          />
        );
      case TypeEnum.Array:
        return (
          <ArrayElement
            value={value as Array<BaseValueType>}
            expanded={expanded}
            depth={depth}
            toggleExpand={onToggleExpand}
            {...commonProps}
          />
        );
      case TypeEnum.Number:
        return <NumberElement value={value as number} {...commonProps} />;
      case TypeEnum.Boolean:
        return <BooleanElement value={value as boolean} {...commonProps} />;
      case TypeEnum.BigInt:
        return <BigIntElement value={value as bigint} {...commonProps} />;
      case TypeEnum.Null:
        return <NullElement value={value as null} {...commonProps} />;
      case TypeEnum.Undefined:
        return <UndefinedElement value={value as undefined} {...commonProps} />;
      default:
        return <span style={{ color: "red" }}>{String(value)} TODO</span>;
    }
  };
  const valueType = getValueType(value);
  const canExpand = [TypeEnum.Object, TypeEnum.Array].includes(valueType);
  let expandStartSymbol = "";
  let expandEndSymbol = "";
  if (canExpand) {
    if (valueType === TypeEnum.Object) {
      expandStartSymbol = "{";
      expandEndSymbol = "}";
    } else if (valueType === TypeEnum.Array) {
      expandStartSymbol = "[";
      expandEndSymbol = "]";
    }
  }
  const marginLeft = indent * depth - (canExpand && !selectable ? iconSize : 0);
  let isChecked = false;
  let indeterminate = false;
  if (selectable) {
    let path = keyName === undefined ? "" : keyName;
    let currentParent = parent;
    while (currentParent) {
      const currentKey =
        currentParent.keyName === undefined ? "" : currentParent.keyName;
      path = `${currentKey}.${path}`;
      currentParent = currentParent.parent;
    }
    const { selectedDict, indeterminateDict } = selectedInfo;
    isChecked = selectedDict[path] || false;
    indeterminate = indeterminateDict[path] || false;
  }

  return (
    <div
      style={{
        marginLeft: `${marginLeft}px`,
        padding: "2px 0",
        paddingLeft: !depth ? "25px" : "0",
        boxSizing: "border-box",
        color: theme.primary,
      }}
    >
      {selectable ? (
        <Checkbox
          style={{ marginRight: "4px" }}
          checked={isChecked}
          indeterminate={indeterminate}
          onChange={(checked: boolean) => {
            onSelect && onSelect({ keyName, parent, depth, checked, value });
          }}
        />
      ) : null}
      <span>{canExpand ? defaultExpandIcon : null}</span>
      {keyName !== undefined && typeof keyName !== "number" && (
        <span>
          {showStringQuotes ? `"${keyName}"` : keyName}
          <span style={{ margin: "0 5px" }}>:</span>
        </span>
      )}
      {canExpand ? <span>{expandStartSymbol}</span> : null}
      {(valueType === TypeEnum.Object || valueType === TypeEnum.Array) ? (
        <div style={{ display: expanded ? "block" : "inline-block" }}>
          {getContent(value)}
        </div>
      ) : (
        getContent(value)
      )}
      {canExpand ? (
        <span style={{ marginLeft: expanded ? `${iconSize}px` : "0" }}>
          {expandEndSymbol}
          {!isLast ? (
            <span style={{ color: "gray", marginLeft: "5px" }}>,</span>
          ) : null}
        </span>
      ) : null}
    </div>
  );
}
