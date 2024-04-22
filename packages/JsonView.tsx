/* eslint-disable @typescript-eslint/ban-ts-comment */
import { JsonContext, defaultValue } from "./JsonContext";
import ElementWrap from "./components/ElementWrap";
import React, { useEffect, useState } from "react";
import { isUndefined } from "./utils";
import {
  JsonViewProps,
  BaseValueType,
  SelectInfo,
  JsonContextType,
  Theme,
} from "./global";
import colorMap from "./theme";
import useSelect from "./hooks/useSelect";

const JsonView: React.FC<JsonViewProps> = function ({
  value,
  selectable,
  showStringQuotes,
  defaultExpanded,
  defaultExpandDepth,
  showValueTypes,
  iconSize,
  stringMaxLength,
  theme = "default",
  onSelect,
  className,
  style,
}: JsonViewProps) {
  const { selectedInfo, selectCandidate, innerOnSelect, selectableDict } = useSelect({ selectable: selectable || false, value, defaultSelect: false, onSelect: console.log });
  
  const _onSelect = (info: SelectInfo) => {
    innerOnSelect(info)
  }
  const defaultTheme = theme === "default" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;
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
  

  const props: JsonContextType = {
    ...defaultValue,
    selectable: isUndefined(selectable) ? defaultValue.selectable : selectable!,
    showStringQuotes: isUndefined(showStringQuotes) ? defaultValue.showStringQuotes : showStringQuotes!,
    iconSize: iconSize || defaultValue.iconSize,
    defaultExpanded: isUndefined(defaultExpanded) ? defaultValue.defaultExpanded : defaultExpanded!,
    defaultExpandDepth: defaultExpandDepth || defaultValue.defaultExpandDepth,
    showValueTypes: isUndefined(showValueTypes) ? defaultValue.showValueTypes : showValueTypes!,
    stringMaxLength: isUndefined(stringMaxLength) ? defaultValue.stringMaxLength : stringMaxLength!,
    theme: _theme,
    selectValueCandidate: selectCandidate,
    selectedInfo,
    selectableDict,
  };
  return (
    <JsonContext.Provider
      value={{
        ...props,
        onSelect: _onSelect,
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
          candidate={selectCandidate}
        />
      </div>
    </JsonContext.Provider>
  );
};

export default JsonView;