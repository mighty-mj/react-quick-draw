import React from "react";

const SketchButton = ({buttonText, onClickFunction, buttonId, type=""}) => {
    let buttonClass = "nes-btn"

    return (
      <button type="button" id={buttonId} className={buttonClass.concat(" ", type)} onClick={onClickFunction}>
          {buttonText}
      </button>
    );
};

export default SketchButton;