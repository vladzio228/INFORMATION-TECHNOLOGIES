import express, { Express, json, Request, Response } from 'express';
import dotenv from 'dotenv';
import { projectionRunner, run } from './testRunner.js';
import cors from 'cors';
import { baseRouter } from '@routes/route';

dotenv.config();

export const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(json());

app.use(baseRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  run();
  projectionRunner();
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
