import React, {useState, useContext, useEffect} from "react";
import {GameContext} from "./index";
import {Controls} from "./App";

const RoundContext = React.createContext({});

function useRounds(labels) {
    let [currentRound, setCurrentRound] = useState(0);

    const rounds = Array.apply(null, {length: labels.length})
        .map((round, index) => <Round/>);

    return [rounds, currentRound, () => setCurrentRound(currentRound + 1), () => setCurrentRound(0)];
}

function useTimer() {
    const [seconds, setSeconds] = useState(20);

    const interval = setInterval(() => {
        if (seconds === 0) {
            clearInterval();
        } else {
            setSeconds(seconds - 1);
        }
    }, 1000);

    return [interval, seconds, () => setSeconds(20), () => setSeconds(10)];
}

function Round() {
    const [timer, seconds, startRound, startExtraTime] = useTimer();

    useEffect(() => {
        return () => clearInterval(timer);
    });

    return (
        <div>
            <RoundContext.Provider value={{seconds, startRound, startExtraTime}}>
                <Controls/>
                <Question/>
                <GameState/>
            </RoundContext.Provider>
        </div>
    )
}

function Question() {
    const {seconds, startExtraTime} = useContext(RoundContext);
    const {dispatch, currentRound, labels} = useContext(GameContext);

    return (
        <div>
            {seconds > 0 ? <div>You have {seconds} seconds to draw a {labels[currentRound]}!</div> :
                <div>Time's up! <button onClick={() => {
                    startExtraTime();
                    dispatch({type: "minusOne"})
                }}>More Time?</button></div>}
        </div>
    )
}

function GameState() {
    let {currentRound, points} = useContext(GameContext);

    return (
        <div>
            You've scored {points} out of {currentRound}.
        </div>
    )
}

export {Round, useRounds, useTimer, RoundContext};