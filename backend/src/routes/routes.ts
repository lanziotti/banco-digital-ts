import { Router } from 'express';
import { AccountController, DeleteAccountController, DetailAccountDataController, UpdateAccountController } from '../controllers/AccountController';
import { DepositController } from '../controllers/DepositController';
import { LoginController } from '../controllers/LoginController';
import { WithdrawController } from '../controllers/WithdrawController';
import { authenticationFilter } from '../middlewares/authentication';
import { schemaValidation } from '../middlewares/schemaValidator';
import { accountSchema } from '../validations/AccountSchema';
import { depositSchema } from '../validations/DepositSchema';
import { loginSchema } from '../validations/LoginSchema';
import { withdrawSchema } from '../validations/WithdrawSchema';

const routes = Router();

routes.post('/conta', schemaValidation(accountSchema), new AccountController().create);
routes.post('/login', schemaValidation(loginSchema), new LoginController().create);

routes.use(authenticationFilter);

routes.get('/conta', new DetailAccountDataController().read);
routes.put('/conta', schemaValidation(accountSchema), new UpdateAccountController().update);
routes.delete('/conta', new DeleteAccountController().delete);

routes.post('/deposito', schemaValidation(depositSchema), new DepositController().create);
routes.post('/saque', schemaValidation(withdrawSchema), new WithdrawController().create);

export default routes;