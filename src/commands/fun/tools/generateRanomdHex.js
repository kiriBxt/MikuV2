function generateRandomHex() {
  let result = "";
  let characters = "ABCDEF123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  let randomChar = result.charAt(Math.floor(Math.random() * result.length));
  let newRes = result.replace(randomChar, "F");

  return "#" + newRes;
}
module.exports = generateRandomHex;
