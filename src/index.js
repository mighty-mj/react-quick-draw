import React from "react";
import ReactDOM from "react-dom";
import "nes.css/css/nes.min.css";
import * as serviceWorker from "./serviceWorker";
import GameRouting from "./App";

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
