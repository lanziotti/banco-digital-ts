import 'express-async-errors';
import { AppDataSource } from './data-source';
import { app } from './app';

AppDataSource.initialize().then(() => {
    
    
    return app.listen(process.env.PORT);
})