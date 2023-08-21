import express, { Express } from "express";
import dotenv from "dotenv";
import { something } from "@/controller/something";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/", something);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
