// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetchTodos } from "..";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await fetchTodos();
    res.status(200).json(data);
  }
}
