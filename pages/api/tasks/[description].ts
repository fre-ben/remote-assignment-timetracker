import { NextApiRequest, NextApiResponse } from "next";
import { getTasksByDescription } from "../../../server/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { description } = req.query;
    const tasks = await getTasksByDescription(description);
    res.status(200).json(tasks);
  }
};
