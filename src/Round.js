import React, {useState, useContext, useEffect} from "react";
import {GameContext} from "./index";

const RoundContext = React.createContext({});

function useRounds(labels) {
    let [currentRound, setCurrentRound] = useState(0);

    const rounds = Array.apply(null, {length: labels.length})
        .map((round, index) => <Round whatToDraw={labels[index]}/>);

    return [rounds, currentRound, () => setCurrentRound(currentRound + 1), () => setCurrentRound(0)];
}

function Round({whatToDraw}) {
    return (
        <div>
            <RoundContext.Provider value={{whatToDraw}}>
                <Question/>
                <GameState/>
            </RoundContext.Provider>
        </div>
    )
}

function Question() {
    const {whatToDraw} = useContext(RoundContext);
    const [seconds, setSeconds] = useState(20);

    //FIXME this should be attached to the round e.g. nextRound & resetRounds should restart the timer
    useEffect(() => {
        setTimeout(() => {
            if (seconds === 0) {
                clearTimeout();
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);
    });

    return (
        <div>
            {seconds > 0 ? <div>You have {seconds} seconds to draw a {whatToDraw}!</div> : <div>Time's up!</div>}
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

export {Round, useRounds, RoundContext};