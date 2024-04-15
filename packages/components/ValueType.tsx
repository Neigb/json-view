import { ValueTypeProps } from "../global";

export default function ValueType({ valueType }: ValueTypeProps) {
  return (
    <span style={{ color: "gray", marginLeft: "5px", fontStyle: "italic" }}>
      {valueType}
    </span>
  );
}
