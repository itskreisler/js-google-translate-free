import { describe, it } from 'node:test'
import assert from 'node:assert'
import { JsGoogleTranslateFree } from '../src/index.ts'

describe('JsGoogleTranslateFree', async () => {
  it('should return a string', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'buenos días'
    const result = await JsGoogleTranslateFree.translate({ to: target, text, from: source })
    assert.strictEqual(typeof result, 'string')
  })
  it('Spanish → English', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'buenos días'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'good morning')
  })
  it('Spanish → English (sin source)', async () => {
    const target = 'en'
    const text = 'Esto es un prueba de que el lenguaje de origen no es necesario.'
    const result = await JsGoogleTranslateFree.translate({ to: target, text })
    assert.strictEqual(result, 'This is proof that the source language is not necessary.')
  })
  it('Spanish → English (frase larga)', async () => {
    const source = 'es'
    const target = 'en'
    const text = 'no tengas un buen dia, ten un gran dia!'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, "Don't have a good day, have a great day!")
  })
  it('English → Spanish', async () => {
    const source = 'en'
    const target = 'es'
    const text = 'good morning'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'buen día')
  })
  it('French → English', async () => {
    const source = 'fr'
    const target = 'en'
    const text = 'bonjour le monde'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'hello world')
  })
  it('German → English', async () => {
    const source = 'de'
    const target = 'en'
    const text = 'Guten Morgen'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'Good morning')
  })
  it('Italian → English', async () => {
    const source = 'it'
    const target = 'en'
    const text = 'come stai?'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'How are you?')
  })
  it('Japanese → English', async () => {
    const source = 'ja'
    const target = 'en'
    const text = 'こんにちは'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'Hello')
  })
  it('Portuguese → English', async () => {
    const source = 'pt'
    const target = 'en'
    const text = 'como vai você?'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'how are you doing?')
  })
  it('English → French', async () => {
    const source = 'en'
    const target = 'fr'
    const text = 'hello world'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'Bonjour le monde')
  })
  it('Chinese → English', async () => {
    const source = 'zh-CN'
    const target = 'en'
    const text = '你好'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'Hello')
  })
  it('Korean → English', async () => {
    const source = 'ko'
    const target = 'en'
    const text = '안녕하세요'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text })
    assert.strictEqual(result, 'hello')
  })
  it('Short story Spanish → English', async () => {
    const source = 'es'
    const target = 'en'
    const story = 'Había una vez un patito feo que vivía en una granja. Todos los animales se burlaban de él porque era diferente. Un día, el patito creció y se convirtió en un hermoso cisne.'
    const result = await JsGoogleTranslateFree.translate({ from: source, to: target, text: story })
    assert.ok(result.includes('ugly duckling'))
    assert.ok(result.includes('beautiful swan'))
  })
})
