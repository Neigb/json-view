export type BaseValueType =
  | { [key: string | number]: BaseValueType}
  | Array<BaseValueType>
  | string
  | number
  | boolean
  | null
  | undefined
  | bigint
  | Date;

export type Dict = { [key: string | number]: BaseValueType};
export type SelectKeyType = string | number | undefined;
export interface SelectInfo {
  keyName?: SelectKeyType;
  checked: boolean;
  depth: number;
  value?: BaseValueType;
  parent?: ElementWrapParent;
}

export interface ElementWrapProps extends ElementCommonProps<BaseValueType> {
  keyName?: string | number;
  showStringQuotes?: boolean;
  defaultExpanded?: boolean;
  depth?: number;
  iconSize?: number;
  parent?: ElementWrapParent;
  onSelect?: (
    keyName: SelectKeyType,
    checked: boolean,
    newValue: BaseValueType
  ) => void;
}

export interface ElementWrapParent {
  keyName?: string | number;
  value?: BaseValueType;
  parent?: ElementWrapParent;
}

export interface ElementCommonProps<T> {
  value: T;
  keyName?: string | number;
  isLast?: boolean;
  parent?: ElementWrapParent;
}

export interface ObjectElementProps
  extends ElementCommonProps<{ [key: string|number]: BaseValueType }> {
  depth: number;
  expanded?: boolean;
}

export interface ArrayElementProps
  extends ElementCommonProps<Array<BaseValueType>> {
  depth: number;
  expanded?: boolean;
}

export interface StringElementProps extends ElementCommonProps<string> {}

export interface NumberElementProps extends ElementCommonProps<number> {}

export interface BooleanElementProps extends ElementCommonProps<boolean> {}

export interface BigintElementProps extends ElementCommonProps<bigint> {}

export interface NullElementProps extends ElementCommonProps<null> {}

export interface UndefinedElementProps extends ElementCommonProps<undefined> {}

export interface ValueTypeProps {
  valueType: TypeEnum;
}

export interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  style?: React.CSSProperties;
}

export interface SelectedInfo {
  selectedDict: Record<string, boolean>;
  indeterminateDict: Record<string, boolean>;
}

export interface JsonContextType {
  indent: number;
  showStringQuotes: boolean;
  defaultExpanded: boolean;
  defaultExpandDepth: number;
  selectable: boolean;
  iconSize: number;
  showValueTypes: boolean;
  selectedValue: BaseValueType | null;
  selectedInfo: SelectedInfo,
  onSelect: (info: SelectInfo) => void;
}

export interface JsonViewProps {
  value: { [key: string | number]: BaseValueType } | Array<BaseValueType>;
  defaultExpanded?: boolean;
  defaultExpandDepth?: number;
  selectable?: boolean;
  indent?: number;
  iconSize?: number;
  showStringQuotes?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: (selected: BaseValueType, key: SelectKeyType, value: BaseValueType, type: "select" | "unselect") => void;
  errorComponent?: React.ComponentType<{
    error: Error;
  }>;
}

export enum TypeEnum {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Object = "object",
  Array = "array",
  Null = "null",
  Undefined = "undefined",
  Function = "function",
  Symbol = "symbol",
  BigInt = "bigint",
  Date = "date",
}

export const NoneValue = Symbol("NoneValue");