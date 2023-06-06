const generateRandomInteger = (min, max) =>
  Math.floor(min + Math.random() * (max - min + 1));

const generateRandomFloat = (min, max) =>
  (Math.random() * (max - min) + min).toFixed(4);

const makeId = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export { generateRandomInteger, generateRandomFloat, makeId };
