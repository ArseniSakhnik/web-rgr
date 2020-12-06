import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import WordsService from "../../services/WordsService";
import CardTask from "../Models";
import {Link} from "react-router-dom";

export default function StartGame() {

    const wordsService = new WordsService()
    const [wordCount, setWordCount] = useState(5)
    const learnArray = []

    const handleChange = (e) => {
        setWordCount(e.target.value)
    }

    const createLearningCards = () => {
        wordsService.getAllWords()
            .then((response) => {
                response.forEach((item, index) => {
                    if (index < wordCount) {
                        learnArray.push(new CardTask(item.imgSrc, item.word, item.wordTranslation))
                        console.log(learnArray)
                    }
                })
            })
            .then(() => {
                localStorage.setItem('gameMassive', JSON.stringify(learnArray))
                window.location.reload()
            })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className={'select-words'}>
                        <p>Слов на изучение</p>
                        <select className="form-control" id="exampleFormControlSelect1" onChange={handleChange}
                                value={wordCount}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                    </div>
                </div>
                <Link to={'/change-words'} className={'btn btn-primary'}>Добавить/изменить слова</Link>
            </nav>
            <button className={'btn btn-primary'} onClick={createLearningCards}>Начать</button>
        </div>
    )
}