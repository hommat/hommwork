import React from "react";
import ColoredComponent from "../../classes/ColoredComponent";
import Wrapper from "./styles";

class Button extends ColoredComponent {
  render() {
    const ColoredWrapper = this.getColoredWrapper(Wrapper);
    return <ColoredWrapper>Colored comp</ColoredWrapper>;
  }
}

export default Button;
