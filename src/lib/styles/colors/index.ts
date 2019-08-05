import { darken, lighten } from "polished";

const colorPallete = <const>[
  "aqua",
  "blue",
  "navy",
  "teal",
  "green",
  "olive",
  "lime",
  "yellow",
  "orange",
  "red",
  "fuchsia",
  "purple",
  "maroon",
  "white",
  "silver",
  "grey",
  "black"
];

export const lightnessPercent: number[] = [0.05, 0.1, 0.15];
const lightnessOptions = <const>[-3, -2, -1, 1, 2, 3];
export type Lightness = typeof lightnessOptions[number];

export type PalleteColor = typeof colorPallete[number];
export type PalleteColorWithOptions = {
  color: PalleteColor;
  lightness: Lightness;
};
export type Pallete = { [key in typeof colorPallete[number]]: string };

export const colors: Pallete = {
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

export const changeColorLightness = (
  ligthness: number,
  color: PalleteColor
): string => {
  if (Math.abs(ligthness) > lightnessPercent.length) {
    throw Error("Lightness level is out of range");
  }

  if (ligthness % 1 !== 0) {
    throw Error("Ligtness level can not be decimal number");
  }

  if (ligthness > 0) {
    return darken(lightnessPercent[ligthness - 1], colors[color]);
  }

  return lighten(lightnessPercent[-ligthness - 1], colors[color]);
};
