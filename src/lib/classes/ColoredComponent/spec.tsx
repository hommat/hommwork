import React from "react";
import styled from "styled-components";
import renderer from "react-test-renderer";
import "jest-styled-components";

import { getRandomInt } from "../../utils/math/random";
import ColoredComponent, { Props as ColoredCompProps } from "./";
import {
  colors,
  PalleteColor,
  changeColorLightness,
  PalleteColorWithOptions,
  Lightness
} from "../../styles/colors";

type ColorProperty = "background" | "color";
type DefaultColors = { [key in ColorProperty]: PalleteColor };

const defaultColors: DefaultColors = {
  background: "yellow",
  color: "red"
};

const defaultHoverColors: DefaultColors = {
  background: "purple",
  color: "aqua"
};

class TestComponent extends ColoredComponent {
  render() {
    const Wrapper = styled.div`
      background: ${colors[defaultColors.background]};
      color: ${colors[defaultColors.color]};

      &:hover {
        background: ${colors[defaultHoverColors.background]};
        color: ${colors[defaultHoverColors.color]};
      }
    `;
    const ColoredWrapper = this.getColoredWrapper(Wrapper);
    return <ColoredWrapper>Example text</ColoredWrapper>;
  }
}

describe("ColoredComponent", () => {
  describe("props not passed", () => {
    it("should has default color styles", () => {
      const tree = createTree();
      testDefaultColors(tree);
    });
  });

  describe("props passed", () => {
    makeSeriesOfTests("without lightness options", false);
    makeSeriesOfTests("with lightness options", true);
  });
});

function makeSeriesOfTests(
  description: string,
  testColorAsColorWithOptions: boolean
) {
  describe(description, () => {
    let color: PalleteColor | PalleteColorWithOptions;

    beforeEach(() => {
      const colorKeys = Object.keys(colors) as PalleteColor[];
      const maxIndex: number = getRandomInt(0, colorKeys.length - 1);
      const colorIndex: number = Math.floor(Math.random() * maxIndex);
      color = colorKeys[colorIndex];

      if (testColorAsColorWithOptions) {
        const lightness = getRandomInt(-3, 3) as Lightness;
        color = { color, lightness };
      }
    });

    it("should override background", () => {
      const properties: ColorProperty[] = ["background"];
      const tree = createTree({ background: color });

      testColorOverrideAndDefaultColors(tree, color, properties);
    });

    it("should override color", () => {
      const properties: ColorProperty[] = ["color"];
      const tree = createTree({ color: color });

      testColorOverrideAndDefaultColors(tree, color, properties);
    });

    it("should override backgroud and color", () => {
      const properties: ColorProperty[] = ["background", "color"];
      const tree = createTree({ background: color, color: color });

      testColorOverrideAndDefaultColors(tree, color, properties);
    });

    it("should override background hover", () => {
      const properties: ColorProperty[] = ["background"];
      const tree = createTree({ backgroundHover: color });

      testColorOverrideAndDefaultColors(tree, color, properties, true);
    });

    it("should override color hover", () => {
      const properties: ColorProperty[] = ["color"];
      const tree = createTree({ colorHover: color });

      testColorOverrideAndDefaultColors(tree, color, properties, true);
    });

    it("should override backgroud hover and color hover", () => {
      const properties: ColorProperty[] = ["background", "color"];
      const tree = createTree({ backgroundHover: color, colorHover: color });

      testColorOverrideAndDefaultColors(tree, color, properties, true);
    });

    it("should override everything", () => {
      const properties: ColorProperty[] = ["background", "color"];
      const tree = createTree({
        background: color,
        color: color,
        backgroundHover: color,
        colorHover: color
      });

      testColorOverride(tree, color, properties);
      testColorOverride(tree, color, properties, true);
    });
  });
}

const createTree = (props: ColoredCompProps = {}) => {
  return renderer.create(<TestComponent {...props} />).toJSON();
};

const onHover = { modifier: ":hover" };

const testColorOverrideAndDefaultColors = (
  tree: renderer.ReactTestRendererJSON | null,
  colorProp: PalleteColor | PalleteColorWithOptions,
  properties: ColorProperty[],
  hover: boolean = false
) => {
  const defaultProps = hover ? [] : properties;
  const hoverProps = hover ? properties : [];

  testColorOverride(tree, colorProp, properties, hover);
  testDefaultColors(tree, defaultProps, hoverProps);
};

const testColorOverride = (
  tree: renderer.ReactTestRendererJSON | null,
  colorProp: PalleteColor | PalleteColorWithOptions,
  properties: ColorProperty[],
  hover: boolean = false
): void => {
  const color: string = colorPropToColor(colorProp);
  properties.forEach(property => {
    expect(tree).toHaveStyleRule(property, color, hover ? onHover : {});
  });
};

const colorPropToColor = (
  prop: PalleteColor | PalleteColorWithOptions
): string => {
  if (typeof prop === "string") return colors[prop];
  return changeColorLightness(prop.lightness, prop.color);
};

const testDefaultColors = (
  tree: renderer.ReactTestRendererJSON | null,
  propertiesToSkip: ColorProperty[] = [],
  hoverPropertiesToSkip: ColorProperty[] = []
) => {
  testDefaultProperties(tree, defaultColors, propertiesToSkip);
  testDefaultProperties(
    tree,
    defaultHoverColors,
    hoverPropertiesToSkip,
    onHover
  );
};

const testDefaultProperties = (
  tree: renderer.ReactTestRendererJSON | null,
  colorSet: DefaultColors,
  toSkip: ColorProperty[],
  options: jest.Options = {}
) => {
  let keys = Object.keys(colorSet) as ColorProperty[];
  keys
    .filter(prop => toSkip.indexOf(prop) === -1)
    .forEach(prop =>
      expect(tree).toHaveStyleRule(prop, colors[colorSet[prop]], options)
    );
};
