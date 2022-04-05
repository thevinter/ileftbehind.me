import clientPromise from "../../../lib/mongodb";

export async function AddVariable(user, key, value) {
  const client = await clientPromise;
  const db = client.db("ludum");
  const query = { token: { $eq: user } };
  const to_update = await db.collection("users").findOne(query);
  console.log("valu", value);
  to_update[key] = value;
  db.collection("users").replaceOne(query, to_update);
  return to_update;
}

export default async function handler(req, res) {
  const {
    query: { user, key, value },
  } = req;
  console.log(value);
  const jsonData = await AddVariable(user, key, value);
  res.status(200).json(jsonData);
}
