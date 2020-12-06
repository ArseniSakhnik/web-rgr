import React, {useState, useEffect, useRef} from 'react'
import Chart from 'chart.js'
import {Link} from "react-router-dom";

export default function FinalPage() {

    const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('answers')))

    useEffect(() => {
        setAnswers(JSON.parse(localStorage.getItem('answers')))
    }, [])

    useEffect(() => {
        if (answers) {
            const ctxP = document.getElementById("pieChart").getContext('2d');
            const myPieChart = new Chart(ctxP, {
                type: 'pie',
                data: {
                    labels: ["Правильные ответы", "Неправильные ответы"],
                    datasets: [{
                        data: [answers.rightAnswer, answers.wrongAnswer],
                        backgroundColor: ["#F7464A", "#46BFBD"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }

    }, [answers])


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

    return (<div>
        {navBar()}
        <div className={'container'}>
            <div>Правильных ответов: {answers.rightAnswer}</div>
            <div>Неправильных ответов: {answers.wrongAnswer}</div>
            <div>Процент правильных:
                ответов {(answers.rightAnswer / (answers.rightAnswer + answers.wrongAnswer) * 100).toFixed(3)} %
            </div>
            <canvas id="pieChart"></canvas>
        </div>
    </div>)
}