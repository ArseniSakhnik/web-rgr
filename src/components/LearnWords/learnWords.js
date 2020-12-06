import React, {useState, useEffect} from 'react';
import {hinge, wobble} from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import './learnwords.css'
import Card from "./Card/card";
import {useGame} from "../GameProvider/gameProvider";
import FinalPage from "../FinalPage";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";


export default function LearnWords() {

    const [animationPlay, setAnimationPlay] = useState(false)
    const [data, setData] = useState([])
    const [currentCard, setCurrentCard] = useState({})
    const [animationType, setAnimationType] = useState(false)
    const [numberOfCard, setNumberOfCard] = useState(0)


    useEffect(() => {
        setData(() => JSON.parse(localStorage.getItem('gameMassive')))
        if (localStorage.getItem('answers') == null) {
            localStorage.setItem('answers', JSON.stringify({
                rightAnswer: 0,
                wrongAnswer: 0
            }))
        }
    }, [])


    useEffect(() => {
        console.log(data)
        console.log(currentCard)
    })

    useEffect(() => {

        for (let i = 0; i < data.length; i++) {
            if (!data[i].isComplete) {
                setCurrentCard(data[i])
                setNumberOfCard(i)
                break;
            }
        }
        localStorage.removeItem('currentCard')
        localStorage.setItem('gameMassive', JSON.stringify(data))

    }, [data])

    const changeAnimationType = (value) => {
        setAnimationType(value)
    }

    const styles = {
        hinge: {
            animation: 'x 3s',
            animationName: Radium.keyframes(hinge, 'hinge')
        },

        wobble: {
            animation: 'x 3s',
            animationName: Radium.keyframes(wobble, 'wobble')
        }
    }

    const animationCreator = (children) => {
        return (
            <StyleRoot>
                <div className={'test'} style={animationType === false ? styles.hinge : styles.wobble}>
                    {children}
                </div>
            </StyleRoot>
        )
    }


    const goAnimation = (rightAnswer) => {
        setAnimationPlay(prevState => !prevState)
        setTimeout(() => {
            setAnimationPlay(prevState => !prevState)
            if (rightAnswer === true) {
                const items = [...data]
                const item = data[numberOfCard]
                item.isComplete = true
                items[item.id - 1] = item
                setData(items)
                const answers = JSON.parse(localStorage.getItem('answers'))
                answers.rightAnswer++
                localStorage.setItem('answers', JSON.stringify(answers))
            } else {
                const answers = JSON.parse(localStorage.getItem('answers'))
                answers.wrongAnswer++
                localStorage.setItem('answers', JSON.stringify(answers))
            }
        }, 3000)
    }

    const endGame = () => {
        localStorage.removeItem('gameMassive')
        localStorage.removeItem('currentCard')
        localStorage.removeItem('answers')
        window.location.reload()
    }

    const navBar = () => {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <button className={'btn'} onClick={endGame}>End</button>
                <Link to={'/change-words'} className={'btn btn-primary'}>Добавить/изменить слова</Link>
            </nav>
        )
    }

    if (data[data?.length - 1]?.isComplete == true) {
        return <FinalPage/>
    }


    if (animationPlay) {
        return (
            <div>
                {navBar()}
                {animationCreator(<Card animationPlayer={goAnimation} imgSrc={currentCard.imgSrc}
                                        wordTranslation={currentCard.wordTranslation}
                                        word={currentCard.word}
                                        changeAnimationType={changeAnimationType}/>)}
            </div>
        )
    } else {
        return (
            <div>
                {navBar()}
                {<Card animationPlayer={goAnimation} imgSrc={currentCard.imgSrc}
                       wordTranslation={currentCard.wordTranslation}
                       word={currentCard.word}
                       changeAnimationType={changeAnimationType}/>}
            </div>
        )
    }


}
