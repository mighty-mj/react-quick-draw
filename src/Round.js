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

    return [interval, seconds, () => setSeconds(20), () => setSeconds(seconds + 10)];
}

function Round() {
    const [timer, seconds, startRound, startExtraTime] = useTimer();
    const {labels, currentRound, points} = useContext(GameContext);

    useEffect(() => {
        return () => clearInterval(timer);
    });

    return (
        <div>
            <RoundContext.Provider value={{seconds, startRound, startExtraTime}}>
                <Controls/>
                <div className="nes-text">You have {seconds} seconds to draw a {labels[currentRound]}!</div>
                <div className="nes-text">You've scored {points} Points so far.</div>
            </RoundContext.Provider>
        </div>
    )
}

export {Round, useRounds, useTimer, RoundContext};