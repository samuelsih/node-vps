import { Request, Response } from "express";

export const something = (_: Request, res: Response) => res.send("Hello Root");
