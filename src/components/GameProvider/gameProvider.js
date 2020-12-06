import React, {useReducer, useContext} from 'react'

const ADD_RIGHT_ANSWER = 'ADD_RIGHT_ANSWER'
const ADD_WRONG_ANSWER = 'ADD_WRONG_ANSWER'
const SELECT_RIGHT_ANSWERS = 'SELECT_RIGHT_ANSWERS'
const SELECT_WRONG_ANSWERS = 'SELECT_WRONG_ANSWERS'

const GameContext = React.createContext()

export const useGame = () => {
    return useContext(GameContext)
}

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_RIGHT_ANSWER:
            return {
                ...state,
                rightAnswer: action.rightAnswer++
            }
        case ADD_WRONG_ANSWER:
            return {
                ...state,
                wrongAnswer: action.wrongAnswer--
            }
        case SELECT_RIGHT_ANSWERS:
            return state.rightAnswer
        case SELECT_WRONG_ANSWERS:
            return state.wrongAnswer
        default:
            return state
    }
}

export default function GameProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {
        rightAnswer: 0,
        wrongAnswer: 0
    })

    return (<GameContext.Provider value={{
        rightAnswer: state.rightAnswer,
        wrongAnswer: state.wrongAnswer,
        addRightAnswer: () => {dispatch({
            type: ADD_RIGHT_ANSWER
        })},
        addWrongAnswer: () => dispatch({
            type: ADD_WRONG_ANSWER
        })
    }}>
        {children}
    </GameContext.Provider>)
}