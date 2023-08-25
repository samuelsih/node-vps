import { Request, Response } from "express";

type HandlerFn = (req: Request, res: Response) => Promise<void>

const withErrorHandling = (handler: HandlerFn) => {
    return async (req: Request, res: Response) => {
        try {
            await handler(req, res);
        } catch (error) {
            res.status(500).send('Server Error.');
        }
    };
};

export default withErrorHandling;
