import React, {useContext, useReducer} from "react";
import ReactDOM from "react-dom";
import "nes.css/css/nes.min.css";
import {Canvas} from "./App";
import * as serviceWorker from "./serviceWorker";
import * as tf from "@tensorflow/tfjs";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {useRounds, RoundContext} from "./Round";
import {pointReducer} from "./Points";
import SketchButton from "./component/SketchButton";

const model = tf.loadLayersModel(process.env.PUBLIC_URL + "/model/model.json");
const labels = require("./labels.json");
let ref = React.createRef();

export const GameContext = React.createContext({});

function GamePlay() {
    const [rounds, currentRound, nextRound, resetRounds] = useRounds(labels);
    const [points, dispatch] = useReducer(pointReducer, 0);

    const game = (
        <div className="nes-container is-dark with-title is-rounded">
            <RoundContext.Provider value={{ref, model, labels}}>
                <RoundSummary/>
                <Canvas />
                {rounds[currentRound]}
                <br/>
                <Link to="/">
                    {<SketchButton buttonText="Home" onClickFunction={() => resetRounds()}/>}
                </Link>
            </RoundContext.Provider>
        </div>
    );

    const result = (
        <div>
            <h2>You scored {points} points!</h2>
            <br/>
            Want to challenge your drawing skills again? {<SketchButton buttonText="Try Again!" onClickFunction={() => {
            resetRounds();
            dispatch({type: "reset"});
            }
        } type="is-primary"/>}
        </div>
    );

    return (
        <GameContext.Provider value={{points, dispatch, rounds, currentRound, nextRound, resetRounds, ref, model, labels}}>
            {currentRound > 9 ? result : game}
        </GameContext.Provider>
    )
}

function StartScreen() {
    return (
        <div>
            <h2>Sketch!</h2>
            This game has been modeled-off Google's "Quick, Draw!" game, and uses a sampling from the "Quick, Draw!"
            dataset.<br/>
            Brought to you by the EPFL Extension School.
            <br/>
            <Link to="/game">
                {<SketchButton buttonText="Game Screen"/>}
            </Link>
        </div>
    )
}

function RoundSummary() {
    const {currentRound, rounds} = useContext(GameContext);
    return (
            <p className="title">Sketch! - Round {currentRound + 1} of {rounds.length}</p>
    )
}

function GameRouting() {
    return (
        <Router>
            <Switch>
                <Route path="/game">
                    <GamePlay/>
                </Route>
                <Route path="/">
                    <StartScreen/>
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <div>
        <GameRouting/>
    </div>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
