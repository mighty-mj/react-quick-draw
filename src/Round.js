import React, {useState, useContext} from "react";

const RoundContext = React.createContext({});

function useRounds(labels) {
    let [currentRound, setCurrentRound] = useState(0);

    const rounds = Array.apply(null, {length: labels.length})
        .map((round, index) => <Round whatToDraw={labels[index]}/>);

    return [rounds, currentRound, () => setCurrentRound((currentRound+1)%labels.length), () => setCurrentRound(0)];
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
    return (
        <div>
            You have 20 seconds to draw a {whatToDraw}!
        </div>
    )
}

export {Round, useRounds, RoundContext};