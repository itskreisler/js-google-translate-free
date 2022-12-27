import { minify } from "minify";
import tryToCatch from "try-to-catch";
import fs from "fs";
const options = {
  html: {
    removeAttributeQuotes: false,
    removeOptionalTags: false,
  },
};

const [error, data] = await tryToCatch(minify, "./index.js", options);

if (error) console.error(error.message);
fs.writeFileSync("index.min.js", data);
//console.log(data);
