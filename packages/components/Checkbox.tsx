import { CheckboxProps } from "../global";

const checkedStyle = {
  border: "2px solid white",
  width: "4px",
  height: "6px",
  borderTop: "0",
  borderInlineStart: 0,
  insetInlineStart: "25%",
  top: "55%",
  transform: "rotate(45deg) translate(-50%,-50%)",
};

const indeterminateStyle = {
  width: "8px",
  height: "8px",
  background: "#1890ff",
  border: "0",
  transform: "translate(-50%,-50%)",
  top: "50%",
  left: "50%",
};

export default function Checkbox({
  checked,
  onChange,
  indeterminate,
  style,
}: CheckboxProps) {
  const defaultStyle =
    checked && indeterminate ? indeterminateStyle : checkedStyle;
  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        cursor: "pointer",
        height: "fit-content",
        ...style,
      }}
      onClick={() => onChange(!(!indeterminate && checked))}
    >
      <input
        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
        type="checkbox"
        checked={checked}
        readOnly
      />
      <span
        style={{
          display: "block",
          width: "14px",
          height: "14px",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          background: checked && !indeterminate ? "#1890ff" : "white",
        }}
      ></span>
      <span
        style={{
          display: checked ? "block" : "none",
          position: "absolute",
          ...defaultStyle,
        }}
      ></span>
    </span>
  );
}
