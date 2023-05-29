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
    const result = await jsGoogleTranslateFree.translate(source, target, text)
    assert.strictEqual(typeof result, 'string')
  })
  it('should return a translation', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'buenos días'
    const result = await jsGoogleTranslateFree.translate(source, target, text)
    assert.strictEqual(result, 'good morning')
  })
  it('should return a translation', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'no tengas un buen dia, ten un gran dia!'
    const result = await jsGoogleTranslateFree.translate(source, target, text)
    assert.strictEqual(result, "Don't have a good day, have a great day!")
  })
})
