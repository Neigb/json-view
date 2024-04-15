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
  const json = {
    _id: "65fa8491b014d7e58c62296d",
    base: {
      app_env: "wechat",
      app_env_sdk: "3.3.4",
      app_env_ver: "8.0.47",
      brand: "vivo",
      chn: "g80-1-wechat2",
      debug: "0",
      ev: "2",
      gsdk_ver: "3.12.0",
      ip: "222.75.226.118",
      language: "zh_CN",
      model: "V2266A",
      mp_query: {},
      os_ver: "Android 14",
      platform: "android",
      scene: "1106",
      user_agent:
        "Mozilla/5.0 (Linux; Android 14; V2266A Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160065 MMWEBSDK/20231202 MMWEBID/9416 MicroMessenger/8.0.47.2560(0x28002F3F) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
      vc: 10102,
      ver: "1.1.2",
      wx_app: "8.0.47",
      wx_sdk: "3.3.4",
    },
    chn: "g80-1-wechat2",
    create_time: "2024-03-20 14:39:13",
    ext: {
      appBootCount: 1,
      challenge_num: 0,
      fist_lv2: true,
      game_celestial_num: 0,
      game_classical_num: 0,
      game_skill_num: 0,
      infinite: false,
      infinite10: false,
      infinite11: false,
      infinite2: false,
      infinite3: false,
      infinite4: false,
      infinite5: false,
      infinite6: false,
      infinite7: false,
      infinite8: false,
      infinite9: false,
      lastLoginTime: 1710916752409,
      last_time: 1710916752409,
      main_level_lv: 1,
      main_num_lv: 1,
      main_speed_lv: 1,
      main_video_num: 0,
      max_lv: 1,
      music_switch: true,
      play_times: 0,
      skill_lv: {
        skill_101: 0,
      },
      snake_skin: [],
      sound_switch: true,
      support_score: {},
      totalLoginDay: 1,
      use_prop1: 0,
      use_prop2: 0,
      use_prop3: 0,
    },
    modify_time: "2024-03-20 14:39:13",
    server_version: 1,
    uid: "1110908876",
    version: 1,
  };
  const selectable = true;
  const text = "很长很长很长阿珂老师的机票去忘记脾气及配件去评价我清江浦区发奇葩发票情况请"
  return (
    <div>
      <p style={{ width: "40px", overflow:"hidden", whiteSpace:"nowrap", textOverflow: "ellipsis"}} title={text}>{text}</p>
      <JsonView value={{}} />
      <JsonView value={test} style={{ width: "400px" }} onSelect={console.log} selectable={selectable} />
      <JsonView value={json} selectable={true} showValueTypes={false} />
    </div>
  );
}
