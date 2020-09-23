import React, {useReducer} from 'react';
import {pointReducer} from "./Points";
import {mount} from "enzyme";

function TestPointReducerComponent() {
    const [points, dispatch] = useReducer(pointReducer, 0);

    return (<div>
        <button id="reset" onClick={() => dispatch({type: "reset"})} />
        <button id="addOne" onClick={() => dispatch({type: "addOne"})} />
        <button id="addTwo" onClick={() => dispatch({type: "addTwo"})} />
        <button id="minusOne" onClick={() => dispatch({type: "minusOne"})} />
        <div id="points">{points}</div>
    </div>);
}

describe("Test the Point handling with the reducer component", () => {

    const wrapper = mount(<TestPointReducerComponent />);

    it("initial points = 0", () => {
        expect(wrapper.find({id: "points"}).text(0));
    });

    it("add one point", () => {
        wrapper.find({id: "addOne"}).simulate("click");
        expect(wrapper.find({id: "points"}).text(1));
    });

    it("add two points", () => {
        wrapper.find({id: "addTwo"}).simulate("click");
        expect(wrapper.find({id: "points"}).text(3));
    });

    it("minus one point", () => {
        wrapper.find({id: "minusOne"}).simulate("click");
        expect(wrapper.find({id: "points"}).text(2));
    });

    it("reset points", () => {
        wrapper.find({id: "reset"}).simulate("click");
        expect(wrapper.find({id: "points"}).text(0));
    });
});
