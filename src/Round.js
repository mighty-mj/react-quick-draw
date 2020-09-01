import React, {useState, useContext, useEffect} from "react";

const RoundContext = React.createContext({});

function useRounds(labels) {
    let [currentRound, setCurrentRound] = useState(0);

    const rounds = Array.apply(null, {length: labels.length})
        .map((round, index) => <Round whatToDraw={labels[index]}/>);

    return [rounds, currentRound, () => setCurrentRound((currentRound + 1) % labels.length), () => setCurrentRound(0)];
}

function Round({whatToDraw}) {
    return (
        <div>
            <RoundContext.Provider value={{whatToDraw}}>
                <Question/>
            </RoundContext.Provider>
        </div>
    )
}

function Question() {
    const {whatToDraw} = useContext(RoundContext);
    const [seconds, setSeconds] = useState(20);

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

export {Round, useRounds, RoundContext};