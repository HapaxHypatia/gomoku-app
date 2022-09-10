import express, { Express, Request, Response } from 'express';
import gameHandler from "./game/game.handler"
import authHandler from "./auth/auth.handler"

const app: Express = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json())
app.use('/api/games', gameHandler)
app.use('/api/auth', authHandler)

app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})

app.get('/', (req: Request, res: Response)=> {
  res.send('Hello world')
})

app.get('/games', (req: Request, res: Response)=> {
  res.send('games')
})

app.listen(app.get('port'), () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${app.get('port')}`);
});

