import React, {useContext, useEffect, useState} from "react";
import {getPrediction} from "../helpers.js";
import {RoundContext} from "../Round";
import {GameContext} from "../App";
import SketchButton from "./SketchButton";

const Controls = React.forwardRef(() => {
    const {startRound, startExtraTime, seconds} = useContext(RoundContext);
    const {ref, model, labels, dispatch, currentRound, nextRound} = useContext(GameContext);
    let [prediction, setPrediction] = useState(""); // Sets default label to empty string.

    useEffect(() => {
        console.log(prediction);
    });

    function predictAndNextRound(pointReducerType="addOne") {
        getPrediction(ref, model).then(prediction => {
                setPrediction(labels[prediction[0]]);
                if (labels[prediction[0]] === labels[currentRound]) {
                    dispatch({type: pointReducerType});
                }
            }
        );
        nextRound();
        startRound();
    }

    return (
        <div>
            {seconds > 0 ? <div>
            {<SketchButton buttonText="Clear the canvas." onClickFunction={() => {
                const canvas = ref.current;
                const ctx = canvas.getContext("2d");
                ctx.fillRect(0, 0, canvas.height, canvas.width);
            }}  buttonId="clearCanvas" type="is-warning"/>}
            {<SketchButton buttonText="Submit early for an extra Point" onClickFunction={() => predictAndNextRound("addTwo")} buttonId="predictEarly"/>}
            {<SketchButton buttonText="+10s at cost of 1 Point" onClickFunction={() => {
                startExtraTime();
                dispatch({type: "minusOne"});
            }} buttonId="extraTime"/>}
            </div>
                : predictAndNextRound()}
        </div>
    );
});

export {Controls};
