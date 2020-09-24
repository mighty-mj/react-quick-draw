import * as tf from "@tensorflow/tfjs";
import React, {useReducer} from "react";
import {RoundContext, useRounds} from "./Round";
import {pointReducer} from "./Points";
import NesContainer from "./component/NesContainer";
import {Canvas} from "./component/Canvas";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import SketchButton from "./component/SketchButton";
import TypedText from "./component/TypedText";

const model = tf.loadLayersModel(process.env.PUBLIC_URL + "/model/model.json");
const labels = require("./labels.json");
let ref = React.createRef();

export const GameContext = React.createContext({});

function GamePlay() {
    const [rounds, currentRound, nextRound, resetRounds] = useRounds(labels);
    const [points, dispatch] = useReducer(pointReducer, 0);

    let gameTitle = "Sketch! - Round " + (currentRound + 1) + " of " + rounds.length;
    const game = (
        <NesContainer title={gameTitle}>
            <RoundContext.Provider value={{ref, model, labels}}>
                <Canvas/>
                {rounds[currentRound]}
                <br/>
                <Link to="/">
                    {<SketchButton buttonText="Home" onClickFunction={() => resetRounds()} buttonId="home"/>}
                </Link>
            </RoundContext.Provider>
        </NesContainer>
    );

    const result = (
        <NesContainer title="Sketch!">

            <h2>You scored {points} points!</h2>
            <br/>
            <TypedText strings={["Want to challenge your drawing skills again?", "Lets try again!"]}/>
            {<SketchButton buttonText="Try Again!" onClickFunction={() => {
                resetRounds();
                dispatch({type: "reset"});
            }
            } type="is-primary"/>}
        </NesContainer>
    );

    return (
        <GameContext.Provider
            value={{points, dispatch, rounds, currentRound, nextRound, resetRounds, ref, model, labels}}>
            {currentRound > 9 ? result : game}
        </GameContext.Provider>
    )
}

function StartScreen() {
    return (
        <NesContainer title="Sketch!">
            <TypedText
                strings={["This game has been modeled-off Google's \"Quick, Draw!\" game, and uses a sampling from the \"Quick, Draw!\" dataset.<br/>" +
                "Brought to you by the EPFL Extension School."]}/>
            <br/>
            <Link to="/game">
                {<SketchButton buttonText="Lets start!" buttonId="gameScreen"/>}
            </Link>
        </NesContainer>
    )
}

function GameRouting() {
    return (
        <Router basename={'/react-quick-draw/'}>
            <Switch>
                <Route path="/game" component={GamePlay} />
                <Route path="/" component={StartScreen}/>
            </Switch>
        </Router>
    )
}

export default GameRouting;