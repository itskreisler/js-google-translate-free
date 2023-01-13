import axios from "axios";

class GoogleTranslate {
  /**
   * It takes a source language, a target language, and a text to translate, and returns a translation.
   *
   *
   * The function is asynchronous, so it returns a promise.
   *
   * The function uses the requestTranslation function to make a request to the Google Translate API.
   *
   * The function uses the getSentencesFromJSON function to clean the response from the Google
   * Translate API.
   *
   * The function returns the cleaned translation.
   * @param source - The language you want to translate from.
   * @param target - The language you want to translate to.
   * @param text - The text to be translated.
   * @returns The translation.
   */
  static async translate(source, target, text) {
    // Request translation
    const response = await GoogleTranslate.requestTranslation(
      source,
      target,
      text
    );

    // Clean translation
    const translation = GoogleTranslate.getSentencesFromJSON(response);

    return translation;
  }

  static async requestTranslation(source, target, text) {
    if (text.length >= 5000) {
      throw new Error("Maximum number of characters exceeded: 5000");
    }

    // Google translate URL
    const url = "https://translate.googleapis.com/translate_a/single?";

    const formData = new URLSearchParams({
      client: "gtx",
      dt: "t",
      sl: source,
      tl: target,
      q: text,
    }).toString();

    try {
      const response = await axios.get(url + formData, {
        responseType: "arraybuffer",
      });
      return response.data;
      //fs.writeFileSync("archivodescargado.text", respuesta.data);
    } catch (error) {
      throw error;
    }
  }

  static getSentencesFromJSON(json) {
    const sentencesArray = JSON.parse(json);
    let sentences = "";

    if (!sentencesArray || !sentencesArray[0]) {
      throw new Error(
        "Google detected unusual traffic from your computer network, try again later (2 - 48 hours)"
      );
    }

    sentencesArray[0].forEach((s) => {
      sentences += s[0] || "";
    });

    return sentences;
  }
}

module.exports = GoogleTranslate;
