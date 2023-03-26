import { MongoClient } from "mongodb";
const uri =
  "mongodb://mtnkbn:sA0RrefNSYRr6EmX@ac-bxizaqc-shard-00-00.2oaxjbu.mongodb.net:27017,ac-bxizaqc-shard-00-01.2oaxjbu.mongodb.net:27017,ac-bxizaqc-shard-00-02.2oaxjbu.mongodb.net:27017/?ssl=true&replicaSet=atlas-iouiki-shard-0&authSource=admin&retryWrites=true&w=majority";

async function handler(req, res) {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("users-collection");
  const collection = db.collection("users");
  const cursor = collection.find({ em: req.body.em });
  const result = await cursor.toArray();
  // res.json(result[0].em)

  if (result.length) {
    const checkMail = result[0].em;
    if (checkMail === req.body.em) {
      res.status(409).json({
        message: 409,
      });
    }
    return;
  } else {
    const body = req.body;
    await db.collection("users").insertOne(body);
    res.status(201).json({ message: "user submitted" });
  }

  client.close();
}

export default handler;
