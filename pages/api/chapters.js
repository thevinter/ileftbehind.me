import clientPromise from "../../lib/mongodb";

export async function GetChapters() {
  try {
    const client = await clientPromise;
    const db = client.db("ludum");
    const chapters = await db
      .collection("chapters")
      .find({})
      .limit(20)
      .toArray();
    return chapters;
  } catch (e) {
    console.log(e);
  }
}

export default async function handler(req, res) {
  console.log(process.env.MONGODB_URI);
  const jsonData = await GetChapters();
  res.status(200).json(jsonData);
}
