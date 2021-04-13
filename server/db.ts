import { Db, MongoClient, ObjectID } from "mongodb";

let client: MongoClient = null;
let db: Db = null;

const url = process.env.MONGODB_URL;

export type Task = {
  id?: ObjectID;
  description: string;
  elapsedTime: string;
  date: string;
  time: string;
};

export async function connectDB(url: string, dbName: string) {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

export async function getTasks(): Promise<Task[]> {
  await connectDB(url, "timetracker");

  const tasks = await db.collection("tasks").find({}).toArray();

  return tasks;
}

export async function postTaskToDB(newTask: Task) {
  await connectDB(url, "timetracker");

  const taskCollection = db.collection("tasks");
  return taskCollection.insertOne(newTask);
}

export async function getTasksByDescription(description): Promise<Task[]> {
  await connectDB(url, "timetracker");

  const tasks = await db
    .collection("tasks")
    .find({ description: new RegExp(description, "i") })
    .toArray();

  return tasks;
}
