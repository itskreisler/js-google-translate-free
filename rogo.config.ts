import { getConfig } from "rogo";
const name = "jsHelpers";
const options = {
  name,
};

export default [
  getConfig({ ...options, format: "esm" }),
  getConfig({ ...options, format: "cjs" }),
  getConfig({
    ...options,
    format: "iife",
    minify: true,
    sourcemap: true,
    targets: "defaults", // include ie11
  }),
];
