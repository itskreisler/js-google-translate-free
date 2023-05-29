# JS Google Translate Free

Simple JS library for talking to Google's Translate API for free.

Eliminates IP request limitations

## Usage

Install package

```node
npm i @kreisler/js-google-translate-free
```

### Import module

```mjs
import jsGoogleTranslateFree from "@kreisler/js-google-translate-free";
```

or

### Import commonjs

```cjs
const jsGoogleTranslateFree = require("@kreisler/js-google-translate-free");
```

#### Example

```js
(async () => {
  try {
    const source = "es";
    const target = "en";
    const text = "buenos días";
    const translation = await jsGoogleTranslateFree.translate(source, target, text);
    console.log(translation); // Good morning
  } catch (error) {
    console.error(error);
  }
})();
```
