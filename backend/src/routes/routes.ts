import { Router } from 'express';
import { AccountController } from '../controllers/AccountController';
import { schemaValidation } from '../middlewares/schemaValidator';
import { accountSchema } from '../validations/AccountSchema';

const routes = Router();

routes.post('/conta',schemaValidation(accountSchema), new AccountController().create);

export default routes;