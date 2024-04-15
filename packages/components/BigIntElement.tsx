import { BigintElementProps } from "../global";

export default function BigintElement({ value, isLast }: BigintElementProps) {
  return (
    <span style={{ color: "purple" }}>
      {String(value)}
      {!isLast ? (
        <span style={{ color: "gray", marginLeft: "2px" }}>,</span>
      ) : null}
    </span>
  );
}
