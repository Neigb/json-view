import { useJsonContext } from "../JsonContext";
import { ValueTypeProps } from "../global";

export default function ValueType({ valueType }: ValueTypeProps) {
  const { theme } = useJsonContext();
  return (
    <span style={{ color: theme.type, marginLeft: "5px", fontStyle: "italic" }}>
      {valueType}
    </span>
  );
}
