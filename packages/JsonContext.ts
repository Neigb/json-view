import { createContext, useContext } from 'react';
import { JsonContextType } from './global';
import colorMap from './theme';

export const defaultValue: JsonContextType = {
  indent: 18,
  showStringQuotes: true,
  defaultExpanded: true,
  defaultExpandDepth: 1,
  iconSize: 16,
  selectable: false,
  showValueTypes: true,
  selectedValue: null,
  selectedInfo: {
    selectedDict: {},
    indeterminateDict: {},
  },
  theme: colorMap("light"),
  onSelect: () => {},
};

export const JsonContext = createContext<JsonContextType>(defaultValue);

export function useJsonContext() {
  return useContext(JsonContext);
}