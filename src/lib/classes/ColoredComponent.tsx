import React from "react";
import styled, { StyledComponent } from "styled-components";

type Props = {
  bg?: string;
  color?: string;
  bgHover?: string;
  colorHover?: string;
};

export default class ColoredComponent extends React.Component<Props, {}> {
  getColoredWrapper(
    wrapper: StyledComponent<any, any, {}, never>
  ): StyledComponent<any, any, {}, never> {
    const { bg, color, bgHover, colorHover } = this.props;

    const coloredWrapper = styled(wrapper)`
      ${bg && `background: lighten(${bg}, 15%)`} !important;
      ${color && `color: ${color}`} !important;

      &:hover {
        ${bgHover && `background: ${bgHover}`} !important;
        ${colorHover && `color: ${colorHover}`} !important;
      }
    `;
    return coloredWrapper;
  }
}
