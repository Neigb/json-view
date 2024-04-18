import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import typescript from "@rollup/plugin-typescript";

// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url));

const resolvePath = (str: string) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolvePath("packages/index.ts"),
      name: "json-view",
      // fileName: (format) => `json-view.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      plugins: [
        typescript({
          target: "es6", // 这里指定编译到的版本，
          rootDir: resolvePath("packages/"),
          declaration: true,
          declarationDir: resolvePath("dist/"),
          exclude: resolvePath("node_modules/**"),
          allowSyntheticDefaultImports: true,
        }),
      ],
      treeshake: true,
    },
    outDir: resolvePath("dist"),
  },
});
