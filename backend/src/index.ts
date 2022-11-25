import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes/routes';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(cors());

    app.use(express.json());

    app.use(routes);

    app.use(errorMiddleware);
    
    return app.listen(process.env.PORT);
})