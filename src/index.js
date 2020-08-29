import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {Canvas, Controls} from "./App";
import * as serviceWorker from "./serviceWorker";
import * as tf from "@tensorflow/tfjs";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

const model = tf.loadModel("./model/model.json");
const labels = require("./labels.json");
let ref = React.createRef();

function Game() {
    return (
        <div>
            <Canvas ref={ref}/>
            <Controls theCanvas={ref} model={model} labels={labels}/>
            <Link to="/"><button>Home</button></Link>
        </div>
    )
}

function StartScreen() {
    return (
        <div>
            <h2>Sketch!</h2>
            This game has been modeld-off Google's "Quick, Draw!" game, and uses a sampling from the "Quick, Draw!"
            dataset.<br />
            Brought to you by the EPFL Extension School.
            <br />
            <Link to="/game"><button>Game Screen</button></Link>
        </div>
    )
}

function GameRouting() {
    return (
        <Router>
            <Switch>
                <Route path="/game">
                    <Game/>
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
