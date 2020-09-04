import React from "react";

const NesContainer = ({children, title="",}) => {
    let titleClass = (title ? "with-title" : "");
    let classes = "nes-container".concat(" ", "is-dark", " ", "is-rounded", " ", titleClass);

    return (
      <div className={classes}>
		  {title ? <p className="title">{title}</p> : null}
          {children}
      </div>
    );
};

export default NesContainer;