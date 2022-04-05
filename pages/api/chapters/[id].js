import clientPromise from "../../../lib/mongodb";

export async function GetChapter(id) {
  const client = await clientPromise;
  const db = client.db("ludum");
  const chapter = await db
    .collection("chapters")
    .find({ chapter: parseInt(id) })
    .limit(20)
    .toArray();
  return chapter;
}

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;
  const jsonData = await GetChapter(id);
  res.status(200).json(jsonData);
}
