import { defineConfig } from 'tsup'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * Author: ${pkg.author}
 * Homepage: ${pkg.homepage || null}
 * Released under the ${pkg.license} License.
 */`

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    outDir: 'dist',
    dts: true,
    sourcemap: false,
    clean: true,
    banner: { js: banner },
  },
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    outDir: 'dist',
    globalName: 'JsGoogleTranslateFree',
    minify: true,
    sourcemap: true,
    target: 'es2015',
    dts: false,
    clean: false,
    banner: { js: banner },
  },
])
