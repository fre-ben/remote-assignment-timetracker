import { NextApiRequest, NextApiResponse } from "next";
import { getTasks, postTaskToDB, Task } from "../../server/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const users = await getTasks();
    res.status(200).json(users);
  }

  if (req.method === "POST") {
    const newTask: Task = req.body;

    await postTaskToDB(newTask);
    res.status(200).json(newTask);
  }
};
