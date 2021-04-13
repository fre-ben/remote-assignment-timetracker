import { NextApiRequest, NextApiResponse } from "next";
import { getTasks, postTask } from "../../server/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const users = await getTasks();
    res.status(200).json(users);
  }

  if (req.method === "POST") {
    const newTask = req.body;

    await postTask(newTask);
    res.status(200).json(newTask);
  }
};
