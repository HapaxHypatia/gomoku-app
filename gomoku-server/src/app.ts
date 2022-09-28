import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'
import mongoose from "mongoose";
import connectDB from "./util/connectDB";
import gameHandler from "./game/game.handler"
import authHandler from "./auth/auth.handler"
import historyHandler from "./history/history.handler";
import cors from 'cors';

dotenv.config();
connectDB();

const app: Express = express();
app.set('port', process.env.PORT || 3000);

app.use(cors())
app.use(express.json())
app.use('/api/history', historyHandler)
app.use('/api/game', gameHandler)
app.use('/api/auth', authHandler)

app.get('/', async (req: Request, res: Response) => {
  return res.send("server reached")
})

mongoose.connection.once('connected', ()=> {
  console.log('Connected to MongoDB.')
  app.listen(app.get('port'), () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${app.get('port')}`);
});

})

