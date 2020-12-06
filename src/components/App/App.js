import React from 'react'
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import ChangeWords from "../ChangeWords";
import LearnWords from "../LearnWords";
import StartGame from "../StartGame";
import GameProvider from "../GameProvider";
import FinalPage from "../FinalPage";


function App() {
    return (
        <GameProvider>
            <Router>
                <div className="App">
                    <Route exact strict path={'/'}>
                        <Redirect to={'/learn-words'}/>
                    </Route>
                    <Route path={'/learn-words'}>
                        {localStorage.getItem('gameMassive') == null ? <StartGame/> : <LearnWords/>}
                    </Route>
                    <Route path={'/change-words'}>
                        <ChangeWords/>
                    </Route>
                    <Route path={'/final-page'}>
                        <FinalPage/>
                    </Route>
                </div>
            </Router>
        </GameProvider>
    );
}

export default App;
