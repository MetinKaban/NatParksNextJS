import { MongoClient } from "mongodb";

async function handler(req, res) {
  const uri =
    "mongodb://mtnkbn:sA0RrefNSYRr6EmX@ac-bxizaqc-shard-00-00.2oaxjbu.mongodb.net:27017,ac-bxizaqc-shard-00-01.2oaxjbu.mongodb.net:27017,ac-bxizaqc-shard-00-02.2oaxjbu.mongodb.net:27017/?ssl=true&replicaSet=atlas-iouiki-shard-0&authSource=admin&retryWrites=true&w=majority";

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('users-collection');

  if (req.method === "POST") {
    const body = req.body;
    await db.collection("users").insertOne({ body });
    res.status(200).json({ message: "submitted" });
  }

  client.close();
}

export default handler;
