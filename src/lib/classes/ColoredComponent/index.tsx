import React from "react";
import styled, { StyledComponent } from "styled-components";
import {
  PalleteColor,
  PalleteColorWithOptions,
  changeColorLightness,
  colors
} from "../../styles/colors";

export type ColorProp = PalleteColor | PalleteColorWithOptions;

export type Props = {
  background?: ColorProp;
  color?: ColorProp;
  backgroundHover?: ColorProp;
  colorHover?: ColorProp;
};

type Wrapper = StyledComponent<any, any, {}, never>;

export default class ColoredComponent extends React.Component<Props, {}> {
  private propToColor(prop: ColorProp): string {
    if (typeof prop === "string") return colors[prop];
    return changeColorLightness(prop.lightness, prop.color);
  }
  getColoredWrapper(wrapper: Wrapper): Wrapper {
    const { props, propToColor } = this;
    const { background, color, backgroundHover, colorHover } = props;

    const coloredWrapper = styled(wrapper)`
      ${background && `background: ${propToColor(background)};`}
      ${color && `color: ${propToColor(color)};`} 

      &:hover {
        ${backgroundHover && `background: ${propToColor(backgroundHover)};`}
        ${colorHover && `color: ${propToColor(colorHover)};`}
      }
    `;
    return coloredWrapper;
  }
}
