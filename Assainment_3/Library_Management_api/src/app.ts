import express, { Application, Request, Response } from 'express';
import { booksRoutes } from './app/controllers/Books.contoller';
import { borrowRouter } from './app/controllers/aggregation.controller';

const app: Application = express();

app.use(express.json());
app.use('/books',booksRoutes);
app.use('/borrow',borrowRouter);
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management');
});


export default app;

// mvc - model  , controller