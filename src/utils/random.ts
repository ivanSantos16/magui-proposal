/**
 * Generates a random number between min and max (inclusive)
 */
export const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Generates a random integer between min and max (inclusive)
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(random(min, max + 1));
};

/**
 * Generates random HSL color values for flames
 */
export const randomFlameColor = () => {
  return {
    hue: randomInt(10, 40),
    saturation: 100,
    lightness: randomInt(50, 75)
  };
};
