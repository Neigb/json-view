import { useEffect, useState } from "react";
import {
  BaseValueType,
  Dict,
  SelectInfo,
  SelectKeyType,
  SelectableType,
  SelectedInfo,
} from "../global";
import { getValueType, hasValue, isDict } from "../utils";

function isSelectable(
  selectable: SelectableType,
  level: number,
  keyName: string | number,
  value: BaseValueType
) {
  if (typeof selectable === "boolean") {
    return selectable;
  }
  if (Array.isArray(selectable)) {
    return selectable.includes(keyName);
  }
  return selectable(level, keyName, value);
}

export default function useSelect({
  selectable,
  value,
  onSelect,
}: {
  selectable: SelectableType;
  value: BaseValueType;
  defaultSelect: boolean;
  onSelect?: (
    key: SelectKeyType,
    value: BaseValueType,
    checked: boolean
  ) => void;
}) {
  const valueType = getValueType(value);
  const defaultValue = valueType === "object" ? {} : [];
  // 当前选中的值
  const [selectedValue, setSelectedValue] = useState<BaseValueType | null>(
    defaultValue
  );
  // 选中和半选信息表
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfo>({
    selectedDict: {},
    indeterminateDict: {},
  });
  // 节点勾选应当设置的值
  const [selectCandidate, setSelectCandidate] =
    useState<BaseValueType>(defaultValue);
  // 节点是否可以勾选
  const [selectableDict, setSelectableDict] = useState<Record<string, boolean>>(
    {}
  );
  useEffect(() => {
    const selectCandidate: BaseValueType = structuredClone(value as Dict);
    const selectableDict: Record<string, boolean> = {};
    // 深度优先遍历, value是当前节点的值, depth是当前节点的深度, path是当前节点的key, fullPath是当前节点的完整路径, parent是selectCandidate当前节点的父节点
    const dfs = (
      value: BaseValueType,
      depth: number,
      path: string,
      fullPath: string,
      parent?: BaseValueType
    ) => {
      const canSelect = isSelectable(selectable, depth, path, value);
      if (canSelect) {
        selectableDict[fullPath] = true;
      } else if (parent && isDict(parent)) {
        delete (parent as Dict)[path];
      }
      if (isDict(value)) {
        const keys = Object.keys(value as Dict);
        keys.forEach((key) => {
          const childValue = (value as Dict)[key];
          const newParent = !depth
            ? selectCandidate
            : parent
            ? (parent as Dict)[path]
            : undefined;
          dfs(childValue, depth + 1, key, `${fullPath}.${key}`, newParent);
        });
        // 子元素都遍历完了，结果自己可以选择但是子元素一个都没有，那么默认选中自己就是选中自己所有的子元素，但是子元素没有勾选框
        if (canSelect && parent && !hasValue((parent as Dict)[path])) {
          (parent as Dict)[path] = structuredClone(value as Dict);
        }
        if (!depth && hasValue(selectCandidate)) {
          selectableDict[""] = true;
        }
      }
    };
    dfs(value, 0, "", "", selectCandidate);
    setSelectCandidate(selectCandidate);
    setSelectableDict(selectableDict);
  }, [value, selectable]);

  const updateSelectedInfo = (selectedValue: BaseValueType) => {
    const selectedDict: Record<string, boolean> = {};
    const indeterminateDict: Record<string, boolean> = {};
    const dfs = (
      value: BaseValueType,
      depth: number,
      fullPath: string,
      candidate: BaseValueType
    ) => {
      if (!depth && !hasValue(value)) { return ; }
      selectedDict[fullPath] = true;
      if (isDict(value)) {
        // 选中的数量和候选的数量不一样，那么就是半选
        if (
          hasValue(candidate) &&
          Object.keys(candidate as Dict).length > 0 &&
          Object.keys(candidate as Dict).length !==
            Object.keys(value as Dict).length
        ) {
          indeterminateDict[fullPath] = true;
        }
        // 遍历子元素
        const keys = Object.keys(value as Dict);
        keys.forEach((key) => {
          const childValue = (value as Dict)[key];
          const childCandidate = (candidate as Dict)[key];
          dfs(childValue, depth + 1, `${fullPath}.${key}`, childCandidate);
        });
      }
    };
    dfs(selectedValue, 0, "", selectCandidate);
    setSelectedInfo({ selectedDict, indeterminateDict });
  };

  // setSelectableDict(canSelectDict);
  // 勾选节点回调
  const innerOnSelect = ({
    depth,
    candidateValue,
    checked,
    keyPath,
  }: SelectInfo) => {
    let newValue = structuredClone(selectedValue);
    if (!depth) {
      newValue = structuredClone(checked ? candidateValue : defaultValue);
    } else {
      let current = newValue;
      let currentCandidate: BaseValueType = selectCandidate;
      const parentStack = [];
      for (let i = 0; i < keyPath.length - 1; i++) {
        const key = keyPath[i];
        if (isDict(current) && (current as Dict)[key] === undefined) {
          (current as Dict)[key] =
            getValueType(currentCandidate) === "object" ? {} : [];
        }
        parentStack.push({ value: current as Dict, key: key });
        current = (current as Dict)[key];
        currentCandidate = (currentCandidate as Dict)[key];
      }
      const lastKey = keyPath[keyPath.length - 1];
      if (checked) {
        (current as Dict)[lastKey] = structuredClone(candidateValue);
      } else {
        delete (current as Dict)[lastKey];
        for (let i = parentStack.length - 1; i >= 0; i--) {
          const { value, key } = parentStack[i];
          if (!hasValue(value[key])) {
            delete value[key];
          }
        }
      }
    }
    setSelectedValue(newValue);
    updateSelectedInfo(newValue);
    onSelect && onSelect(keyPath.pop(), newValue, checked);
  };

  return {
    selectedValue,
    selectedInfo,
    selectCandidate,
    innerOnSelect,
    selectableDict,
  };
}
