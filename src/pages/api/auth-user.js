import { MongoClient } from "mongodb";

const uri =
  "mongodb://mtnkbn:sA0RrefNSYRr6EmX@ac-bxizaqc-shard-00-00.2oaxjbu.mongodb.net:27017,ac-bxizaqc-shard-00-01.2oaxjbu.mongodb.net:27017,ac-bxizaqc-shard-00-02.2oaxjbu.mongodb.net:27017/?ssl=true&replicaSet=atlas-iouiki-shard-0&authSource=admin&retryWrites=true&w=majority";

const collectionName = "users";

async function handler(req, res) {
  const query = {
    body: { email: req.body.email, password: req.body.password },
  };
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const collection = client.db("users-collection").collection(collectionName);
  const cursor = collection.find(query);
  const result = await cursor.toArray();

  if (result.length) {
    res.status(200).json({ message: "user found", result });
  } else {
    res.status(300).json({ message: "user not found", result });
  }

  client.close();
}

export default handler;
