import express, { Request, Response } from "express";
import cors from "cors";

import { connectDatabase } from "./config/data-source";
import { env } from "./config/env-schema";
import { errorHandler } from "./middlewares/error-handler";

import userRoutes from "./routes/user.routes";

connectDatabase();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hi, from express-typeorm:)");
});

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`App running on port ${3000}`);
});
