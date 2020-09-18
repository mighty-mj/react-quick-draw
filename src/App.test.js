import React from 'react';
import {Canvas} from './component/Canvas';
import renderer from "react-test-renderer";

describe("Test the <Canvas /> component", () => {

  it("Canvas renders correctly", () => {
    const tree = renderer.create(<Canvas/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

