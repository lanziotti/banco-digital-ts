import { Router } from 'express';
import { CreateAccountController, DeleteAccountController, DetailAccountDataController, UpdateAccountController } from '../controllers/AccountController';
import { DepositController } from '../controllers/DepositController';
import { LoginController } from '../controllers/LoginController';
import { TransferController } from '../controllers/TransferController';
import { WithdrawController } from '../controllers/WithdrawController';
import { authenticationFilter } from '../middlewares/authentication';
import { schemaValidation } from '../middlewares/schemaValidator';
import { accountSchema } from '../validations/AccountSchema';
import { depositSchema } from '../validations/DepositSchema';
import { loginSchema } from '../validations/LoginSchema';
import { withdrawSchema } from '../validations/WithdrawSchema';
import { transferSchema } from '../validations/TransferSchema';
import { ExtractController } from '../controllers/ExtractController';

const routes = Router();

routes.post('/conta', schemaValidation(accountSchema), new CreateAccountController().create);
routes.post('/login', schemaValidation(loginSchema), new LoginController().create);

routes.use(authenticationFilter);

routes.get('/conta', new DetailAccountDataController().read);
routes.put('/conta', schemaValidation(accountSchema), new UpdateAccountController().update);
routes.delete('/conta', new DeleteAccountController().delete);

routes.post('/deposito', schemaValidation(depositSchema), new DepositController().create);
routes.post('/saque', schemaValidation(withdrawSchema), new WithdrawController().create);
routes.post('/transferencia', schemaValidation(transferSchema), new TransferController().create);
routes.get('/extrato', new ExtractController().read);

export default routes;