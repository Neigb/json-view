/* eslint-disable @typescript-eslint/ban-ts-comment */
import { JsonContext, defaultValue } from "./JsonContext";
import ElementWrap from "./components/ElementWrap";
import React, { useEffect, useState } from "react";
import { getValueType, isUndefined } from "./utils";
import {
  JsonViewProps,
  BaseValueType,
  TypeEnum,
  SelectInfo,
  Dict,
  SelectedInfo,
  JsonContextType,
  Theme,
} from "./global";
import colorMap from "./theme";

const JsonView: React.FC<JsonViewProps> = function ({
  value,
  selectable,
  showStringQuotes,
  defaultExpanded,
  defaultExpandDepth,
  showValueTypes,
  iconSize,
  theme = "default",
  onSelect,
  className,
  style,
}: JsonViewProps) {
  const valueType = getValueType(value);
  const [selectedValue, setSelectedValue] = useState<BaseValueType>(
    valueType === TypeEnum.Array ? [] : {}
  );
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfo>({
    selectedDict: {},
    indeterminateDict: {},
  });

  const defaultTheme = theme === "default" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;
  console.log(defaultTheme);
  const [_theme, setTheme] = useState<Theme>(colorMap(defaultTheme));
  const changeTheme = (e: MediaQueryListEvent) => {
    setTheme(colorMap(e.matches ? "dark" : "light"));
  }
  useEffect(() => {
    setTheme(colorMap(defaultTheme));
    if (theme === "default") {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", changeTheme);
      return () => {
        window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", changeTheme);
      }
    }
  }, [defaultTheme, theme]);
  const computSelectedDict = (newValue: BaseValueType) => {
    const dfs = (currentValue: BaseValueType, path: string) => {
      const dict: Record<string, boolean> = {};
      const valueType = getValueType(currentValue);
      if (valueType === TypeEnum.Object || valueType === TypeEnum.Array) {
        const keys = Object.keys(currentValue as Dict);
        for (const key of keys) {
          const newPath = `${path}.${key}`;
          Object.assign(dict, dfs((currentValue as Dict)[key], newPath));
        }
        const dict_keys = Object.keys(dict);
        const selfSelected = dict_keys.some((key) => dict[key]) || (path === "" ? Object.keys(value).length === 0 : keys.length === 0);
        dict[path] = selfSelected;
      } else {
        dict[path] = true;
      }
      return dict;
    };
    const dict = dfs(newValue, "");
    return dict;
  };
  const computIndeterminateDict = (selectedDict: Record<string, boolean>) => {
    const dict: Record<string, boolean> = {};
    const temp = value;
    const dfs = (value: BaseValueType, path: string) => {
      const valueType = getValueType(value);
      if (valueType === TypeEnum.Object || valueType === TypeEnum.Array) {
        const keys = Object.keys(value as Dict);
        for (const key of keys) {
          const newPath = `${path}.${key}`;
          dfs((value as Dict)[key], newPath);
        }
        // 如果子元素是普通数据则看selectedDict中是否有这个key，否则看dict中是否有这个key
        let count = 0;
        for (const key of keys) {
          const currentValueType = getValueType((value as Dict)[key]);
          const keyPath = `${path}.${key}`;
          if (
            currentValueType !== TypeEnum.Object &&
            currentValueType !== TypeEnum.Array &&
            selectedDict[keyPath]
          ) {
            count++;
          } else if (dict[keyPath]) {
            dict[path] = true;
            return;
          } else if (selectedDict[keyPath]) {
            count++;
          }
        }
        if (count > 0 && count < Object.keys(value as Dict).length) {
          dict[path] = true;
        }
      }
    };
    dfs(temp, "");
    return dict;
  };

  const setSelectedDict = (newValue: BaseValueType) => {
    const newSelectedDict = computSelectedDict(newValue);
    const newIndeterminateDict = computIndeterminateDict(newSelectedDict);
    setSelectedInfo({
      selectedDict: newSelectedDict,
      indeterminateDict: newIndeterminateDict,
    });
  };
  const addValue = (info: SelectInfo) => {
    if (selectedValue === null || undefined) {
      throw new Error("Root value must be an object or an array");
    }
    const { keyName, value, parent } = info;
    const keyPaths = [keyName];
    let current = parent;
    let targetParent = value;
    const newValue = selectedValue;
    let temp = newValue;
    while (current) {
      targetParent = current.value;
      if (current.keyName === undefined) {
        break;
      }
      keyPaths.unshift(current.keyName);
      current = current.parent;
    }
    for (let i = 0; i < keyPaths.length; i++) {
      const key = keyPaths[i];
      if (key === undefined) return;
      if (
        targetParent === null ||
        typeof targetParent !== "object" ||
        targetParent instanceof Date
      ) {
        throw new Error("Parent value must be an object or an array");
      }
      const sourceType = getValueType((targetParent as Dict)[key]);
      if (
        sourceType === TypeEnum.Object &&
        (temp as Dict)[key] === undefined &&
        i !== keyPaths.length - 1
      ) {
        (temp as Dict)[key] = {};
      } else if (
        sourceType === TypeEnum.Array &&
        (temp as Array<BaseValueType>)[key as number] === undefined &&
        i !== keyPaths.length - 1
      ) {
        (temp as Array<BaseValueType>)[key as number] = [];
      } else if (i === keyPaths.length - 1) {
        const valueType = getValueType((targetParent as Dict)[key]);
        if (valueType === TypeEnum.Array || valueType === TypeEnum.Object) {
          (temp as Dict)[key] = structuredClone((targetParent as Dict)[key]);
        } else {
          (temp as Dict)[key] = (targetParent as Dict)[key];
        }
      }
      // @ts-expect-error
      temp = (temp as Dict)[key];
      targetParent = (targetParent as Dict)[key];
    }
    setSelectedValue(structuredClone(newValue) as BaseValueType);
    setSelectedDict(newValue);
  };

  const removeValue = (info: SelectInfo) => {
    const keyPaths = [info.keyName];
    let current = info.parent;
    while (current) {
      if (current.keyName !== undefined) {
        keyPaths.unshift(current.keyName);
      }
      current = current.parent;
    }
    let target = selectedValue;
    const parentStack = [];
    for (let i = 0; i < keyPaths.length; i++) {
      const key = keyPaths[i];
      if (key === undefined) return;
      const valueType = getValueType(target);
      if (i === keyPaths.length - 1) {
        if (valueType === TypeEnum.Object || valueType === TypeEnum.Array) {
          delete (target as Dict)[key];
        }
      } else if (
        valueType === TypeEnum.Object ||
        valueType === TypeEnum.Array
      ) {
        parentStack.push({ key, value: (target as Dict)[key], parent: target });
        target = (target as Dict)[key];
      }
    }
    while (parentStack.length) {
      const current = parentStack.pop();
      if (!current) break;
      const { key, value, parent } = current;
      if (key === undefined) break;
      const valueType = getValueType(parent);
      if (valueType === TypeEnum.Object) {
        if (Object.keys(value as Dict).length === 0) {
          delete (parent as Dict)[key];
        }
      } else if (valueType === TypeEnum.Array) {
        if ((value as Dict).length === 0) {
          delete (parent as Dict)[key];
        }
      }
    }
    setSelectedValue(structuredClone(selectedValue) as BaseValueType);
    setSelectedDict(selectedValue);
  };
  const _onSelect = (info: SelectInfo) => {
    const { checked, value, depth } = info;
    // 根节点处理
    if (depth === 0) {
      const valueType = getValueType(value);
      if (valueType === TypeEnum.Array) {
        setSelectedValue(checked ? structuredClone(value) : []);
        setSelectedDict(checked ? value : []);
      } else if (valueType === TypeEnum.Object) {
        setSelectedValue(checked ? structuredClone(value) : {});
        setSelectedDict(checked ? value : {});
      } else {
        console.error("Root value must be an object or an array");
      }
    } else {
      if (checked) {
        addValue(info);
      } else {
        removeValue(info);
      }
    }
    if (onSelect) {
      onSelect(structuredClone(selectedValue), info.keyName, value, checked ? "select" : "unselect");
    }
  };
  const props: JsonContextType = {
    ...defaultValue,
    selectable: isUndefined(selectable) ? defaultValue.selectable : selectable!,
    showStringQuotes: isUndefined(showStringQuotes) ? defaultValue.showStringQuotes : showStringQuotes!,
    iconSize: iconSize || defaultValue.iconSize,
    defaultExpanded: isUndefined(defaultExpanded) ? defaultValue.defaultExpanded : defaultExpanded!,
    defaultExpandDepth: defaultExpandDepth || defaultValue.defaultExpandDepth,
    showValueTypes: isUndefined(showValueTypes) ? defaultValue.showValueTypes : showValueTypes!,
    selectedValue,
    theme: _theme,
    onSelect: _onSelect,
    selectedInfo,
  };
  return (
    <JsonContext.Provider
      value={{
        ...props,
        selectedValue,
        onSelect: _onSelect,
        selectedInfo,
      }}
    >
      <div
        className={className}
        style={{
          fontSize: "14px",
          fontFamily: "Consolas, Menlo, Courier, monospace",
          boxSizing: "border-box",
          ...style,
        }}
      >
        <ElementWrap
          value={value as BaseValueType}
          defaultExpanded={false}
          isLast={true}
        />
      </div>
    </JsonContext.Provider>
  );
};

export default JsonView;
