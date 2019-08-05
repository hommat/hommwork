import { lighten, darken } from "polished";
import {
  lightnessPercent,
  changeColorLightness,
  PalleteColor,
  colors
} from "./";

describe("Color functions", () => {
  describe("changeColorLightness", () => {
    const color: PalleteColor = "red";
    it("should throw error when lighness level is out of range", () => {
      const errMess: string = "Lightness level is out of range";
      expect(() => changeColorLightness(6, color)).toThrowError(errMess);
      expect(() => changeColorLightness(-7, color)).toThrowError(errMess);
    });

    it("should throw error when lighness level is decimal", () => {
      const errMess: string = "Ligtness level can not be decimal number";
      expect(() => changeColorLightness(2.3, color)).toThrowError(errMess);
      expect(() => changeColorLightness(-2.3, color)).toThrowError(errMess);
    });

    it("should make color lighten", () => {
      const lightenColor: string = lighten(lightnessPercent[1], colors[color]);
      expect(changeColorLightness(-2, color)).toBe(lightenColor);
    });

    it("should make color darken", () => {
      const darkenColor: string = darken(lightnessPercent[2], colors[color]);
      expect(changeColorLightness(3, color)).toBe(darkenColor);
    });
  });
});
