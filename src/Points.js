const initialPoints = 0;

function pointReducer(pointsState, action) {
    switch (action.type) {
        case "reset":
            return initialPoints;
        case "addOne":
            return pointsState + 1;
        case "addTwo":
            return pointsState + 2;
        case "minusOne":
            return pointsState - 1;
        default:
            return pointsState;
    }
}

export {pointReducer};