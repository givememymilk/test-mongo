// crud.js
const { MongoClient, ObjectId } = require("mongodb");

// Connection URL (change if needed)
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database and Collection name
const dbName = "mydatabase";
const collectionName = "users";

function create()
{

}

async function runCRUD() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const createResult = await collection.insertOne({
      name: "John Doe",
      age: 25,
      email: "john@example.com",
    });

    console.log("Inserted ID:", createResult.insertedId);

    const users = await collection.find({}).toArray();
    console.log("All Users:", users);

    const updateResult = await collection.updateOne(
      { _id: new ObjectId(createResult.insertedId) },
      { $set: { age: 30 } }
    );

    console.log("Updated Count:", updateResult.modifiedCount);
    
    const deleteResult = await collection.deleteOne({
      _id: new ObjectId(createResult.insertedId),
    });

    console.log("Deleted Count:", deleteResult.deletedCount);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

runCRUD();