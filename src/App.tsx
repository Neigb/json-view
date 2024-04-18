import { useEffect, useState } from "react";
import JsonView from "../packages/JsonView";

export default function App() {
  const value = {
    a: 123,
    b: { e: 9994, k: 123 },
    c: "testtesttesttesttesttesttesttesttest",
    d: [1, null, 2, 3, true, false, "gg"],
    f: true,
    g: false,
    h: "这是一个立刻就爱上大家啊老师登记了请问 ml.qmsl；代码请问么其名为鹏人抛弃我们人去外面人了；；阿里什么的；啦；但是看啊；深刻的脾气我看泡咖啡缺口怕开了；反馈发；阿克苏；了看；阿列克我人品情况我卡可怕卡人我；了看；拉卡拉；我看；兰卡威暗恋我；看；另外；",
    i: BigInt(54984816146545),
    j: null,
    l: undefined,
    create_time: "2024-04-18 15:42:56",
    user: "lw-json-view",
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
        style={{ width: "500px" }}
        onSelect={console.log}
        selectable={selectable}
        canSelectFn={(_, keyName) => !["create_time", "user"].includes(String(keyName))}
      />
    </div>
  );
}
