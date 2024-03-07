/* eslint-disable @typescript-eslint/space-before-function-paren */
// @ts-check
/**
 * @module JsGoogleTranslateFree
 * @description The JsGoogleTranslateFree class is used to translate text using the Google Translate API.
 * @class JsGoogleTranslateFree
 * @example
 * import JsGoogleTranslateFree from "@kreisler/js-google-translate-free"
 * (async () => {
 * try {
 * const from = "es";
 * const to = "en";
 * const text = "buenos días";
 * const translation = await JsGoogleTranslateFree.translate({ from, to, text });
 * console.log(translation); // Good morning
 * } catch (error) {
 * console.error(error);
 * }
 * })();
 */
import axios, { type AxiosResponse } from 'axios'
/**
 * @description The default language is the language from which the text will be translated.
 */
export const FROM_DEFAULT_LANG: string = 'auto' as const
/**
 * @description The ALL_LANGUAJES object contains all the languages supported by the Google Translate API.
 */
export const ALL_LANGUAJES = { auto: 'auto', af: 'af', sq: 'sq', am: 'am', ar: 'ar', hy: 'hy', as: 'as', ay: 'ay', az: 'az', bm: 'bm', eu: 'eu', be: 'be', bn: 'bn', bho: 'bho', bs: 'bs', bg: 'bg', ca: 'ca', ceb: 'ceb', 'zh-CN': 'zh-CN', zh: 'zh', 'zh-TW': 'zh-TW', co: 'co', hr: 'hr', cs: 'cs', da: 'da', dv: 'dv', doi: 'doi', nl: 'nl', en: 'en', eo: 'eo', et: 'et', ee: 'ee', fil: 'fil', fi: 'fi', fr: 'fr', fy: 'fy', gl: 'gl', ka: 'ka', de: 'de', el: 'el', gn: 'gn', gu: 'gu', ht: 'ht', ha: 'ha', haw: 'haw', he: 'he', iw: 'iw', hi: 'hi', hmn: 'hmn', hu: 'hu', is: 'is', ig: 'ig', ilo: 'ilo', id: 'id', ga: 'ga', it: 'it', ja: 'ja', jv: 'jv', jw: 'jw', kn: 'kn', kk: 'kk', km: 'km', rw: 'rw', gom: 'gom', ko: 'ko', kri: 'kri', ku: 'ku', ckb: 'ckb', ky: 'ky', lo: 'lo', la: 'la', lv: 'lv', ln: 'ln', lt: 'lt', lg: 'lg', lb: 'lb', mk: 'mk', mai: 'mai', mg: 'mg', ms: 'ms', ml: 'ml', mt: 'mt', mi: 'mi', mr: 'mr', 'mni-Mtei': 'mni-Mtei', lus: 'lus', mn: 'mn', my: 'my', ne: 'ne', no: 'no', ny: 'ny', or: 'or', om: 'om', ps: 'ps', fa: 'fa', pl: 'pl', pt: 'pt', pa: 'pa', qu: 'qu', ro: 'ro', ru: 'ru', sm: 'sm', sa: 'sa', gd: 'gd', nso: 'nso', sr: 'sr', st: 'st', sn: 'sn', sd: 'sd', si: 'si', sk: 'sk', sl: 'sl', so: 'so', es: 'es', su: 'su', sw: 'sw', sv: 'sv', tl: 'tl', tg: 'tg', ta: 'ta', tt: 'tt', te: 'te', th: 'th', ti: 'ti', ts: 'ts', tr: 'tr', tk: 'tk', ak: 'ak', uk: 'uk', ur: 'ur', ug: 'ug', uz: 'uz', vi: 'vi', cy: 'cy', xh: 'xh', yi: 'yi', yo: 'yo', zu: 'zu' } as const
export type LanguagesCodigoISO639Str = keyof typeof ALL_LANGUAJES
export type LanguagesCodigoISO639Obj = typeof ALL_LANGUAJES
export type LanguagesCodigoISO639WhitoutAuto = keyof Pick<LanguagesCodigoISO639Obj, Exclude<keyof LanguagesCodigoISO639Obj, 'auto'>>
export interface RequestTranslationParams {
  from?: LanguagesCodigoISO639Str
  to: LanguagesCodigoISO639WhitoutAuto
  text: string
}
export type T = any
/**
 * @typedef {Object} RequestTranslationParams
 * @property {String} [from] - The language you want to translate from.
 * @property {String} to - The language you want to translate to.
 * @property {String} text - The text to be translated.
 */

/**
 * @description The JsGoogleTranslateFree class is used to translate text using the Google Translate API.
 * @class JsGoogleTranslateFree
 *
 */

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class JsGoogleTranslateFree {
  /**
   * @description The function is asynchronous, so it returns a promise. It takes a source language, a target language, and a text to translate, and returns a translation.
   * @param {RequestTranslationParams} options - The options to translate the text.
   * @returns The translation.
   */
  static async translate(options: RequestTranslationParams): Promise<string> {
    const { from, to, text } = options
    const source: string = typeof from !== 'undefined' ? from : FROM_DEFAULT_LANG
    if (typeof to === 'undefined' || to === null) {
      throw new ErrorStringToJsGoogleTranslateFree('The target language is required, for more information visit: https://github.com/itskreisler/js-google-translate-free#readme')
    }
    if (typeof text === 'undefined' || text === null) {
      throw new ErrorStringTextJsGoogleTranslateFree('The text to be translated is required, for more information visit: https://github.com/itskreisler/js-google-translate-free#readme')
    }
    // Request translation
    const response = await JsGoogleTranslateFree.#requestTranslation(
      source,
      to,
      text
    )

    // Clean translation
    const translation = JsGoogleTranslateFree.#getSentencesFromJSON(response)

    return translation
  }

  /**
   * @description The function makes a request to the Google Translate API.
   * @param {String} source - The language you want to translate from.
   * @param {String} target - The language you want to translate to.
   * @param {String} text - The text to be translated.
   * @returns The translation.
   */
  static async #requestTranslation(source: string, target: string, text: string): Promise<string> {
    if (text.length >= 5000) {
      throw new Error('Maximum number of characters exceeded: 5000')
    }

    // Google translate URL
    const url = 'https://translate.googleapis.com/translate_a/single?'

    // Request parameters
    const params: Record<string, string> =
    {
      client: 'gtx',
      dt: 't',
      sl: source,
      tl: target,
      q: text
    }

    const formData: string = new URLSearchParams(params).toString()

    try {
      const response: AxiosResponse = await axios.get(url + formData, {
        responseType: 'arraybuffer'
      })
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * @description The getSentencesFromJSON function to clean the response from the Google Translate API.
   * @param {String} json - The response from the Google Translate API.
   * @returns The function returns the cleaned translation.
   */
  static #getSentencesFromJSON(json: string): string {
    const jsonparse = (txt: string): T => JSON.parse(txt)

    let sentencesArray: T[]
    try {
      sentencesArray = jsonparse(json)
    } catch (error) {
      const text: string = new TextDecoder().decode(json as unknown as AllowSharedBufferSource)
      sentencesArray = jsonparse(text)
    }
    let sentences: string = ''

    if (sentencesArray === null || sentencesArray[0] === null || [sentencesArray, sentencesArray[0]].some((item) => typeof item === 'undefined')) {
      throw new Error(
        'Google detected unusual traffic from your computer network, try again later (2 - 48 hours)'
      )
    }

    sentencesArray[0].forEach((chunck: T[]) => {
      if (typeof chunck[0] !== 'undefined') {
        sentences += String(chunck[0])
      }
    })

    return sentences
  }
}

class ErrorStringToJsGoogleTranslateFree extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'ErrorStringToJsGoogleTranslateFree'
  }
}

class ErrorStringTextJsGoogleTranslateFree extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'ErrorStringTextJsGoogleTranslateFree'
  }
}
export default JsGoogleTranslateFree
export { JsGoogleTranslateFree }
try {
  module.exports = JsGoogleTranslateFree
} catch (error) {

}
