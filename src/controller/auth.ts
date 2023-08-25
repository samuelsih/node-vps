import { insertUserSchema } from "@/schema/user";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    const result = await insertUserSchema.parseAsync(req.body);
    res.send(result);
};
