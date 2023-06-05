const generateRandomInteger = (min, max) =>
    Math.floor(min + Math.random() * (max - min + 1));

const generateRandomFloat = (min, max) =>
    (Math.random() * (max - min) + min).toFixed(4);

export { generateRandomInteger, generateRandomFloat }