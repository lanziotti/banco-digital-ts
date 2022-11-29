import { Router } from 'express';
import { AccountController, DeleteAccountController, DetailAccountDataController, UpdateAccountController } from '../controllers/AccountController';
import { LoginController } from '../controllers/LoginController';
import { authenticationFilter } from '../middlewares/authentication';
import { schemaValidation } from '../middlewares/schemaValidator';
import { accountSchema } from '../validations/AccountSchema';
import { loginSchema } from '../validations/LoginSchema';

const routes = Router();

routes.post('/conta', schemaValidation(accountSchema), new AccountController().create);
routes.post('/login', schemaValidation(loginSchema), new LoginController().create);

routes.use(authenticationFilter);

routes.get('/conta', new DetailAccountDataController().read);
routes.put('/conta', schemaValidation(accountSchema), new UpdateAccountController().update);
routes.delete('/conta', new DeleteAccountController().delete);

export default routes;