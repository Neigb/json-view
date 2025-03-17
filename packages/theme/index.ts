import { Theme } from "../global";

const lightTheme: Theme = {
  background: '#fff',
  primary: '#000',
  secondary: '#E6E6E6',
  string: 'red',
  number: '#00A000',
  boolean: '#5558cc',
  null: '#FFA0CB',
  undefined: '#DEB887',
  BigInt: '#800080',
  Date: "",
  type: "#808080",
  ellipsis: "#DDD",
  link: "#0366D6",
}

const darkTheme: Theme = {
  background: '#000',
  primary: '#CCC',
  secondary: '#333',
  string: '#FFA500',
  number: '#00A000',
  boolean: '#09E',
  null: '#FFA0CB',
  undefined: '#DEB887',
  BigInt: '#E000A0',
  Date: "",
  type: "#808080",
  ellipsis: "#DDD",
  link: "#0366D6",
}

const colorMap = (theme: "light" | "dark" | "default" | Theme) => {
  if (theme === 'light' || theme === 'default') return lightTheme;
  if (theme === 'dark') return darkTheme;
  if (typeof theme === 'string') {
    console.warn('Invalid theme');
    return lightTheme;
  }
  return {
   ...theme
  };
}

export default colorMap;