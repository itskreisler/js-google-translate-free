import { getConfig } from "rogo";
const name = "JsGoogleTranslateFree";
const options = {
  name,
};

export default [
  //getConfig({ ...options, format: "umd" }),
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
