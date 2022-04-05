import clientPromise from "../../../../lib/mongodb";

export async function GetChapterForUser(id) {
  const client = await clientPromise;
  const db = client.db("ludum");
  const user = await db.collection("users").findOne({ token: id });
  const correctChapter = getCorrectChapter(user);
  const chapter = await db
    .collection("chapters")
    .findOne({ chapter: parseInt(correctChapter) });
  console.log("chap", chapter);
  return chapter;
}

export default async function handler(req, res) {
  console.log(req.query);
  const jsonData = await GetChapterForUser(req.query.user);
  res.status(200).json(jsonData);
}

function getCorrectChapter(user) {
  const reg_date = new Date(parseInt(user.registered_at, 10));
  const today = new Date();
  const diff_hours = parseInt((today - reg_date) / (1000 * 60 * 60));

  return user.current_chapter;
}
