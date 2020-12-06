export default class CardTask {

    static counter = 1

    constructor(imgSrc, word, wordTranslation) {
        this.imgSrc = imgSrc
        this.word = word
        this.wordTranslation = wordTranslation
        this.isComplete = false
    }

}