import { Request, Response } from "express";

export const something = (req: Request, res: Response) =>
  res.send("from something");
