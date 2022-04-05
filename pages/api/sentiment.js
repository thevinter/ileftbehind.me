const key = "2d37031232f9926dd9548ae0c075d1e8";

import clientPromise from "../../lib/mongodb";

export async function GetSentiment(word) {
  console.log(word.word);
  const result = await fetch(
    `https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&model=general&txt=${word.word.replace(
      " ",
      "%20"
    )}&egp=y`,
    { method: "POST" }
  );
  console.log(
    `https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&model=general&txt=${word.word.replace(
      " ",
      "%20"
    )}&egp=y`
  );
  const json = await result.json();
  console.log(json);
  return json;
}

export default async function handler(req, res) {
  const { query: word } = req;
  const jsonData = await GetSentiment(word);
  res.status(200).json(jsonData);
}
