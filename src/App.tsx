import JsonView from "../packages/JsonView";

export default function App() {
  const test = [{
    a: 123,
    b: { e: 9994, k: 123 },
    c: "testtesttesttesttesttesttesttesttest",
    d: [1, 2, 3, true, false, "gg"],
    f: true,
    g: false,
    h: "这是一个立刻就爱上大家啊老师登记了请问 ml.qmsl；代码请问么其名为鹏人抛弃我们人去外面人了；；阿里什么的；啦；但是看啊；深刻的脾气我看泡咖啡缺口怕开了；反馈发；阿克苏；了看；阿列克我人品情况我卡可怕卡人我；了看；拉卡拉；我看；兰卡威暗恋我；看；另外；",
    i: BigInt(54984816146545),
    j: null,
    l: undefined,
  }];
  const selectable = true;
  return (
    <div>
      <h1>Hello, world!</h1>
      <JsonView value={test} style={{ width: "400px" }} onSelect={console.log} selectable={selectable} />
    </div>
  );
}
