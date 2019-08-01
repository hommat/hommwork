import { lighten, darken } from "polished";
import {
  Colors,
  lightnessPercent,
  changeColorsLightness,
  createShadesOfColors,
  combineColorsWithShades
} from "./";

describe("Color functions", () => {
  let colors: Colors = {
    red: "#ff0000",
    green: "#00ff00"
  };

  const shadesOfColors: Colors[] = [
    {
      "red-dark-1": darken(lightnessPercent[0], colors.red),
      "green-dark-1": darken(lightnessPercent[0], colors.green)
    },
    {
      "red-dark-2": darken(lightnessPercent[1], colors.red),
      "green-dark-2": darken(lightnessPercent[1], colors.green)
    },
    {
      "red-dark-3": darken(lightnessPercent[2], colors.red),
      "green-dark-3": darken(lightnessPercent[2], colors.green)
    },
    {
      "red-light-1": lighten(lightnessPercent[0], colors.red),
      "green-light-1": lighten(lightnessPercent[0], colors.green)
    },
    {
      "red-light-2": lighten(lightnessPercent[1], colors.red),
      "green-light-2": lighten(lightnessPercent[1], colors.green)
    },
    {
      "red-light-3": lighten(lightnessPercent[2], colors.red),
      "green-light-3": lighten(lightnessPercent[2], colors.green)
    }
  ];

  describe("combineColorsWithShades", () => {
    it("should combine colors with colors shades", () => {
      const withShades: Colors = [colors, ...shadesOfColors].reduce((r, s) => {
        return { ...r, ...s };
      }, {});
      expect(combineColorsWithShades(colors)).toEqual(withShades);
    });
  });

  describe("createShadesOfColors", () => {
    it("should create shades of colors", () => {});
    expect(createShadesOfColors(colors)).toEqual(shadesOfColors);
  });

  describe("changeColorsLightness", () => {
    it("should throw error when lighness level is out of range", () => {
      const errMess: string = "Lightness level is out of range";
      expect(() => changeColorsLightness(colors, 4)).toThrowError(errMess);
      expect(() => changeColorsLightness(colors, -4)).toThrowError(errMess);
    });

    it("should throw error when lighness level is positive decimal", () => {
      const errMess: string = "Ligtness level can not be decimal number";
      expect(() => changeColorsLightness(colors, 2.3)).toThrowError(errMess);
      expect(() => changeColorsLightness(colors, -2.3)).toThrowError(errMess);
    });

    it("should make colors lighten", () => {
      const lightenColors: Colors = shadesOfColors[4];
      expect(changeColorsLightness(colors, -2)).toEqual(lightenColors);
    });

    it("should make colors darken", () => {
      const darkenColors: Colors = shadesOfColors[2];
      expect(changeColorsLightness(colors, 3)).toEqual(darkenColors);
    });
  });
});
