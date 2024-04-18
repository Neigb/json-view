import { useJsonContext } from "../JsonContext";

export default function Ellipsis({
  onClick,
  style,
}: { onClick: () => void, style?: React.CSSProperties }) {
  const { theme } = useJsonContext();
  return (
    <span
      onClick={onClick}
      style={{
        cursor: "pointer",
        background: theme.ellipsis,
        borderRadius: "4px",
        padding: "0 5px",
        margin: "0 2px",
        color: theme.primary,
        ...(style || {})
      }}
    >
      ...
    </span>
  );
}