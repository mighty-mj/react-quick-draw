import React, {useContext, useEffect, useState} from "react";
import {getPrediction} from "./helpers.js";
import {RoundContext} from "./Round";
import {GameContext} from "./index";
import SketchButton from "./component/SketchButton";

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

const Canvas = React.forwardRef(() => {
    const {ref} = useContext(RoundContext);
    let mouseDown = false;
    let lastX;
    let lastY;

    function drawLine(canvas, x, y, lastX, lastY) {
        let context = canvas.getContext("2d");

        context.strokeStyle = "#000000";
        context.lineWidth = 12;
        context.lineJoin = "round";

        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.closePath();
        context.stroke();

        return [x, y];
    }

    const handleMouseup = () => {
        mouseDown = false;
        [lastX, lastY] = [undefined, undefined];
    };

    const handleMousemove = e => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (mouseDown) {
            [lastX, lastY] = drawLine(e.target, x, y, lastX, lastY);
        }
    };

    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext("2d");

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.height, canvas.width);
    });

    return (
        <canvas
            height={300}
            width={300}
            ref={ref}
            onMouseDown={() => (mouseDown = true)}
            onMouseUp={handleMouseup}
            onMouseMove={e => handleMousemove(e)}
        />
    );
});

export {Canvas, Controls};
