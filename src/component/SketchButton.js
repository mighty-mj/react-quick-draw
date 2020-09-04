import React from "react";

const SketchButton = ({buttonText, onClickFunction, type=""}) => {
    let buttonClass = "nes-btn"

    return (
      <button type="button" className={buttonClass.concat(" ", type)} onClick={onClickFunction}>
          {buttonText}
      </button>
    );
};

export default SketchButton;