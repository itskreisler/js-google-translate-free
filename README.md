## JS GoogleTranslate free

Simple JS library for talking to Google's Translate API for free.

Eliminates IP request limitations

### Usage

Install package

```node
npm i @kreisler/js-google-translate-free
```

#### Import module

```js
import GoogleTranslate from "@kreisler/js-google-translate-free";
```
or
```js
const GoogleTranslate = require("@kreisler/js-google-translate-free");
```

#### Example

```js
try {
  const source = "es";
  const target = "en";
  const text = "buenos días";
  const translation = await GoogleTranslate.translate(source, target, text);
  console.log(translation); // Good morning
} catch (error) {
  console.error(error);
}
```
