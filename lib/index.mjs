import axios from 'axios'

/**
 * @description The GoogleTranslate class is used to translate text using the Google Translate API.
 * @class GoogleTranslate
 *
 */

class GoogleTranslate {
  /**
   * @description The function is asynchronous, so it returns a promise. It takes a source language, a target language, and a text to translate, and returns a translation.
   * @param {String} source - The language you want to translate from.
   * @param {String} target - The language you want to translate to.
   * @param {String} text - The text to be translated.
   * @returns The translation.
   */
  static async translate (source, target, text) {
    // Request translation
    const response = await GoogleTranslate.requestTranslation(
      source,
      target,
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
  static async requestTranslation (source, target, text) {
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
  static getSentencesFromJSON (json) {
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

module.exports = GoogleTranslate
