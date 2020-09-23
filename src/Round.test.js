import React from 'react';
import renderer from "react-test-renderer";
import {mount} from "enzyme";
import {Round} from './Round';
import {Controls} from "./component/Controls";
import {GameContext} from "./App";

describe("<Round />", () => {

    //prepare some constants for testing
    const labels = require("./labels.json");
    const currentRound = 0;
    const nextRound = jest.fn();
    const roundComponent =
        <GameContext.Provider value={{labels, currentRound, nextRound}}>
          <Round/>
        </GameContext.Provider>;
    const wrapper = mount(roundComponent);

    it("renders correctly", () => {
        const tree = renderer.create(roundComponent).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders: Controls", () => {
        expect(wrapper.contains(<Controls/>)).toEqual(true);
    });

    it("renders all the buttons within Controls", () => {
        expect(wrapper.contains({id: "clearCanvas"})).toEqual(true);
        expect(wrapper.contains({id: "predictEarly"})).toEqual(true);
        expect(wrapper.contains({id: "extraTime"})).toEqual(true);
    });
});