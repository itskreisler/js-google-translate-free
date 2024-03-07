# JS Google Translate Free + Typescript 🚀

Simple JS library for talking to Google's Translate API for free.

Eliminates IP request limitations

## List of supported languages

[https://cloud.google.com/translate/docs/languages](https://cloud.google.com/translate/docs/languages)

## Usage

Install package

```node
npm i @kreisler/js-google-translate-free
```

### Import module

```mjs
import JsGoogleTranslateFree from "@kreisler/js-google-translate-free";
```

or

### Import commonjs

```cjs
const JsGoogleTranslateFree = require("@kreisler/js-google-translate-free");
```

#### Example #1

```js
(async () => {
  try {
    const from = "es";
    const to = "en";
    const text = "buenos días";
    const translation = await JsGoogleTranslateFree.translate({ from, to, text });
    console.log(translation); // Good morning
  } catch (error) {
    console.error(error);
  }
})();
```

#### Example #2

```js
(async () => {
  try {
    // const from = "en"; optional default is "auto"
    const to = "es";
    const text = "Good morning";
    const translation = await JsGoogleTranslateFree.translate({ to, text });
    console.log(translation); // Buenos días
  } catch (error) {
    console.error(error);
  }
})();
```
