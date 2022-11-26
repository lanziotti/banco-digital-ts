import { Router } from 'express';
import { AccountController } from '../controllers/AccountController';
import { LoginController } from '../controllers/LoginController';
import { schemaValidation } from '../middlewares/schemaValidator';
import { accountSchema } from '../validations/AccountSchema';
import { loginSchema } from '../validations/LoginSchema';

const routes = Router();

routes.post('/conta', schemaValidation(accountSchema), new AccountController().create);
routes.post('/login', schemaValidation(loginSchema), new LoginController().create);

export default routes;