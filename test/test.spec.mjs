/**
 * @author Kreisler Ramirez Sierra
 * @file This file contains the test for the `JsGoogleTranslateFree` function.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT NATIVE NODE MODULES
import { describe, it } from 'node:test'
import { strictEqual } from 'node:assert'

// » IMPORT MODULES
import JsGoogleTranslateFree from '../dist/index.esm.js'

// ━━ TEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe('JsGoogleTranslateFree', async () => {
  it('should return a string', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'buenos días'
    const result = await JsGoogleTranslateFree.translate({ to: target, text, from: source })
    strictEqual(typeof result, 'string')
  })
  it('should return a translation', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'buenos días'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    strictEqual(result, 'good morning')
  })
  it('should return a translation', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'no tengas un buen dia, ten un gran dia!'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    strictEqual(result, "Don't have a good day, have a great day!")
  })
  it('traslate whithout source language', async () => {
    const target = 'en'
    const text = 'Esto es un prueba de que el lenguaje de origen no es necesario.'
    const result = await JsGoogleTranslateFree.translate({ to: target, text })
    strictEqual(result, 'This is proof that the source language is not necessary.')
  })
})
