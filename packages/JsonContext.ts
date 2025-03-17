import { createContext, useContext } from 'react';
import { JsonContextType } from './global';
import colorMap from './theme';

export const defaultValue: JsonContextType = {
  indent: 54,
  showStringQuotes: true,
  defaultExpanded: true,
  defaultExpandDepth: 1,
  iconSize: 16,
  selectable: false,
  showValueTypes: true,
  selectedValue: null,
  stringMaxLength: 16,
  selectedInfo: {
    selectedDict: {},
    indeterminateDict: {},
  },
  theme: colorMap("light"),
  onSelect: () => { },
  selectValueCandidate: undefined,
  selectableDict: {},
};

export const JsonContext = createContext<JsonContextType>(defaultValue);

export function useJsonContext() {
  return useContext(JsonContext);
}