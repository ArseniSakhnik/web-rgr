import React, {useEffect, useState, useMemo, useRef} from 'react'
import WordsService from "../../../../services/WordsService";

export default function Tasks({animationPlayer, wordTranslation, word, data, changeAnimationType}) {


    const wordsService = new WordsService()
    const [options, setOptions] = useState([])
    const [tasks, setTasks] = useState(() => (<div></div>))


    useEffect(() => {

        if (word != undefined && localStorage.getItem('currentCard') == null) {

            wordsService.getAllWords()
                .then((words) => {

                    const questions = []

                    let randomValues = []
                    while (randomValues.length < 4) {
                        let r = Math.floor(Math.random() * 4) + 1
                        if (randomValues.indexOf(r) === -1) {
                            randomValues.push(r)
                        }
                    }

                    let randomWordValues = []
                    while (randomWordValues.length < 3) {
                        let r = Math.floor(Math.random() * words.length)
                        if (randomWordValues.indexOf(words[r].word) === -1 && words[r].word != word) {
                            randomWordValues.push(words[r].word)
                        }
                    }


                    randomValues.forEach((item, index) => {
                        questions[item] = randomWordValues.pop()
                    })


                    questions.forEach((item, index) => {
                        if (item === undefined) {
                            questions[index] = word
                        }
                    })

                    setOptions(questions)
                    localStorage.setItem('currentCard', JSON.stringify(questions))
                })
        } else {
            setOptions(() => JSON.parse(localStorage.getItem('currentCard')))
        }
    }, [word])

    const checkAnswer = (id) => {
        const answer = false
        if (word === options[id] && animationPlayer) {
            changeAnimationType(false)
            animationPlayer(true)
        } else if (animationPlayer) {
            changeAnimationType(true)
            animationPlayer(false)
        }

    }

    useEffect(() => {
        if (options) {
            setTasks(task())
        }
    }, [options])

    const task = () => {


        return (
            <div className="row justify-content-center">
                <div className="col-12">
                    <button className="btn btn-task btn-primary "
                            onClick={() => checkAnswer(1)}>{options[1]}</button>
                </div>
                <div className="col-12">
                    <button className="btn btn-task btn-primary "
                            onClick={() => checkAnswer(2)}>{options[2]}</button>
                </div>
                <div className="col-12">
                    <button className="btn btn-task btn-primary"
                            onClick={() => checkAnswer(3)}>{options[3]}</button>
                </div>
                <div className="col-12">
                    <button className="btn btn-task btn-primary "
                            onClick={() => checkAnswer(4)}>{options[4]}</button>
                </div>
            </div>
        )

    }
    return (
        <div className="quest align-middle">
            {tasks}
        </div>
    )
}