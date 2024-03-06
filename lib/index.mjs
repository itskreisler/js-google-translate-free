import axios from 'axios'
/**
   * @typedef {Object} RequestTranslationParams
   * @property {String} from - The language you want to translate from.
   * @property {String} to - The language you want to translate to.
   * @property {String} text - The text to be translated.
   */

/**
 * @description The GoogleTranslate class is used to translate text using the Google Translate API.
 * @class GoogleTranslate
 *
 */

class GoogleTranslate {
  /**
   * @description The function is asynchronous, so it returns a promise. It takes a source language, a target language, and a text to translate, and returns a translation.
   * @param {RequestTranslationParams} options - The options to translate the text.
   * @returns The translation.
   */
  static async translate(options = { from: undefined, to: undefined, text: undefined }) {
    const { from, to, text } = options
    let source = from || 'auto'
    if (!to) {
      throw new ErrorStringToGoogleTranslate('The target language is required, for more information visit: https://github.com/itskreisler/js-google-translate-free#readme')
    }
    if (!text) {
      throw new ErrorStringTextGoogleTranslate('The text to be translated is required, for more information visit: https://github.com/itskreisler/js-google-translate-free#readme')
    }
    // Request translation
    const response = await GoogleTranslate.requestTranslation(
      source,
      to,
      text
    )

    // Clean translation
    const translation = GoogleTranslate.getSentencesFromJSON(response)

    return translation
  }

  /**
   * @description The function makes a request to the Google Translate API.
   * @param {String} source - The language you want to translate from.
   * @param {String} target - The language you want to translate to.
   * @param {String} text - The text to be translated.
   * @returns The translation.
   */
  static async requestTranslation(source, target, text) {
    if (text.length >= 5000) {
      throw new Error('Maximum number of characters exceeded: 5000')
    }

    // Google translate URL
    const url = 'https://translate.googleapis.com/translate_a/single?'

    const formData = new URLSearchParams({
      client: 'gtx',
      dt: 't',
      sl: source,
      tl: target,
      q: text
    }).toString()

    try {
      const response = await axios.get(url + formData, {
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
  static getSentencesFromJSON(json) {
    const sentencesArray = JSON.parse(json)
    let sentences = ''

    if (!sentencesArray || !sentencesArray[0]) {
      throw new Error(
        'Google detected unusual traffic from your computer network, try again later (2 - 48 hours)'
      )
    }

    sentencesArray[0].forEach((s) => {
      sentences += s[0] || ''
    })

    return sentences
  }
}

class ErrorStringFromGoogleTranslate extends Error {
  constructor(message) {
    super(message)
    this.name = 'ErrorStringFromGoogleTranslate'
  }
}
class ErrorStringToGoogleTranslate extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorStringToGoogleTranslate';
  }
}

class ErrorStringTextGoogleTranslate extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorStringTextGoogleTranslate';
  }
}


module.exports = GoogleTranslate