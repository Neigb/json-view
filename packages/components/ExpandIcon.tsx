export default function ExpandIcon({
  expanded = false,
  color = "#bfbfbf",
  onClick = (value: boolean) => console.log("onClick: ", value),
  size = 22,
}) {
  const rotate = expanded ? 0 : -90;
  return (
    <span>
      <svg
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4265"
        width={size}
        height={size}
        onClick={() => onClick(!expanded)}
        style={{ transform: `rotate(${rotate}deg)`, cursor: "pointer" , verticalAlign: "middle"}}
      >
        <path
          d="M512 704.412l311.598-311.598-73.226-73.226L512 557.441 273.627 319.588l-73.226 73.226L512 704.412z"
          p-id="4266"
          fill={color}
        ></path>
      </svg>
    </span>
  );
}
