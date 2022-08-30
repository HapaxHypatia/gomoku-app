import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())

app.use((req,res,next) =>{
  console.log('Time', Date.now())
  next()
})

app.use('/user/:id', (req, res, next) => {
  console.log('Request Type: ', req.method)
  next()
})

app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})

app.get('/', (req: Request, res: Response)=> {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});