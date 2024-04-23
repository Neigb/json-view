import { useEffect, useState } from "react";
import JsonView from "../packages/JsonView";

export default function App() {
  const value = {
    a: 123,
    b: { e: 9994, k: 123, m: { n: "value"} },
    c: "testtesttesttesttesttesttesttesttest",
    d: [1, null, 2, 3, true, false, "gg"],
    f: true,
    g: false,
    h: "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain",
    i: BigInt(54984816146545),
    j: null,
    l: undefined,
    create_time: "2024-04-18 15:42:56",
    user: "lw-json-view",
    empty: {},
  };
  const selectable = true;

  const _initValue = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const [backgroundColor, setBackgroundColor] = useState(_initValue);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const changeTheme = (theme: "light" | "dark") => {
    setTheme(theme);
    setBackgroundColor(theme === "dark" ? "black" : "white");
  };
  const onMediaEvent = (e: MediaQueryListEvent) => {
    setBackgroundColor(e.matches ? "black" : "white");
    setTheme(e.matches ? "dark" : "light");
  };
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", onMediaEvent);
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", onMediaEvent);
    };
  }, []);
  return (
    <div style={{ backgroundColor }}>
      <button onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}>
        切换主题
      </button>
      <JsonView
        theme={theme}
        value={value}
        style={{ width: "500px" }}
        onSelect={console.log}
        selectable={selectable}
      />
      <JsonView
        theme={theme}
        value={value}
        onSelect={console.log}
        selectable={["create_time", "user", "b", "m", "d", "0"]}
      />
    </div>
  );
}
