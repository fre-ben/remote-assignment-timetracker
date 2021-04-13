import { NextApiRequest, NextApiResponse } from "next";
import { getTasks } from "../../server/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const users = await getTasks();
    res.status(200).json(users);
  }
};
