import express, { NextFunction, Request, Response } from 'express';
import todoRoutes from './routes/todos';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World');
});

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message,
    });
});

app.listen(3000, console.log.bind(null, 'Listening to port 3000'));
