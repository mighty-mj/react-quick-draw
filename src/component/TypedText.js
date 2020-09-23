import React from "react";
import Typed from "typed.js";

class TypedText extends React.Component {
    componentDidMount() {
        const {strings} = this.props;

        const options = {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 50
        };

        this.typed = new Typed(this.typedText, options);
    }

    // destroy it (avoid memory leaks)
    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <div className="wrap">
                <span style={{whiteSpace: 'pre'}} ref={(typedText) => {
                    this.typedText = typedText;
                }}/>
            </div>
        );
    }
}

export default TypedText;