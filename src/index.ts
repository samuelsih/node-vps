import express, { Express } from "express";
import dotenv from "dotenv";
import { something } from "@/controller/something";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT || 5000);

app.get("/", something);

app.listen(port, "0.0.0.0", () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
