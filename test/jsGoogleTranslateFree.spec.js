/**
 * @author Kreisler Ramirez Sierra
 * @file This file contains the test for the `jsGoogleTranslateFree` function.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT NATIVE NODE MODULES
const { describe, it } = require('node:test')
const assert = require('node:assert')

// » IMPORT MODULES
const jsGoogleTranslateFree = require('..')

// ━━ TEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe('jsGoogleTranslateFree', async () => {
  it('should return a string', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'buenos días'
    const result = await jsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(typeof result, 'string')
  })
  it('should return a translation', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'buenos días'
    const result = await jsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'good morning')
  })
  it('should return a translation', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'no tengas un buen dia, ten un gran dia!'
    const result = await jsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, "Don't have a good day, have a great day!")
  })
  it('traslate whithout source language', async () => {
    const target = 'en'
    const text = 'Esto es un prueba de que el lenguaje de origen no es necesario.'
    const result = await jsGoogleTranslateFree.translate({ to: target, text })
    assert.strictEqual(result, 'This is proof that the source language is not necessary.')
  })
})
