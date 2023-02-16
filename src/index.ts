import express from "express";

import { connectDatabase } from "./config/data-source";
import { env } from "./config/env.const";

connectDatabase();

const app = express();

app.use(express.json());

app.listen(env.PORT, () => {
  console.log(`App running on port ${3000}`);
});
