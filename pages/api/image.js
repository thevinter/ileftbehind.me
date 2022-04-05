async function GetImage(word) {
  const deepai = require("deepai");
  deepai.setApiKey(process.env.OPEN_AI);

  console.log(word.word);
  const r = await deepai.callStandardApi("text2img", {
    text: word.word,
  });
  console.log(r);
  return r;
}

export default async function handler(req, res) {
  const { query: word } = req;
  console.log("sss");
  const jsonData = await GetImage(word);
  res.status(200).json(jsonData);
}
