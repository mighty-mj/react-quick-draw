import React from 'react';
import {Canvas} from './component/Canvas';
import GameRouting from './App'
import renderer from "react-test-renderer";
import {mount} from "enzyme";

describe("Test the <Canvas /> component", () => {

  it("Canvas renders correctly", () => {
    const tree = renderer.create(<Canvas/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe("Tests the <GameRouting /> component", () => {
  let wrapper = null;
  let startScreen = null;
  let router = null;
  let gameScreenButton = null;

  it("GamePlay renders correctly", () => {
    wrapper = mount(<GameRouting />);
  });

  it("App has StartScreen", () => {
    startScreen = wrapper.find("StartScreen");
    expect(startScreen).toBeTruthy();
  });

  it("App has Routing", () => {
    router = wrapper.find("Router");
    expect(router).toBeTruthy();
  });

  it("StartGame Button is present", () => {
    gameScreenButton = startScreen.find({id: "gameScreen"})
    expect(gameScreenButton).toBeTruthy();
  });

});

