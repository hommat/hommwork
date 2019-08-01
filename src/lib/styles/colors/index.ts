import { darken, lighten } from "polished";

export type Colors = { [colorName: string]: string };

const colors: Colors = {
  aqua: "#7fdbff",
  blue: "#0074d9",
  navy: "#001f3f",
  teal: "#39cccc",
  green: "#2ecc40",
  olive: "#3d9970",
  lime: "#01ff70",
  yellow: "#ffdc00",
  orange: "#ff851b",
  red: "#ff4136",
  fuchsia: "#f012be",
  purple: "#b10dc9",
  maroon: "#85144b",
  white: "#ffffff",
  silver: "#dddddd",
  grey: "#aaaaaa",
  black: "#111111"
};

export const lightnessPercent: number[] = [0.05, 0.1, 0.15];

export const combineColorsWithShades = (colors: Colors): Colors => {
  const allColorsArray: Colors[] = [colors, ...createShadesOfColors(colors)];
  const combinedObject: Colors = allColorsArray.reduce((obj, shade): Colors => {
    return { ...obj, ...shade };
  }, {});

  return combinedObject;
};

export const createShadesOfColors = (colors: Colors): Colors[] => {
  const integersToLightnessLength: number[] = lightnessPercent.map(
    (x, i) => i + 1
  );
  const lightnessWithNegative: number[] = [
    ...integersToLightnessLength,
    ...integersToLightnessLength.map(x => -x)
  ];
  const shadesOfColors: Colors[] = lightnessWithNegative.map(lightness =>
    changeColorsLightness(colors, lightness)
  );

  return shadesOfColors;
};

export const changeColorsLightness = (colors: Colors, ligthness: number) => {
  if (Math.abs(ligthness) > lightnessPercent.length) {
    throw Error("Lightness level is out of range");
  }
  if (ligthness % 1 !== 0) {
    throw Error("Ligtness level can not be decimal number");
  }

  const newColors: Colors = {};
  const prefix: string =
    (ligthness > 0 ? "-dark-" : "-light-") + Math.abs(ligthness);

  Object.keys(colors).forEach(colorName => {
    let newColorValue: string;
    if (ligthness > 0) {
      newColorValue = darken(
        lightnessPercent[ligthness - 1],
        colors[colorName]
      );
    } else {
      newColorValue = lighten(
        lightnessPercent[-ligthness - 1],
        colors[colorName]
      );
    }
    newColors[colorName + prefix] = newColorValue;
  });

  return newColors;
};

export default combineColorsWithShades(colors);
