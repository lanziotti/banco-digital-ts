import express from 'express';
import routes from './routes/routes';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(routes);


export { app }