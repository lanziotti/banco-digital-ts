import { Account } from '../entities/Account';
import { Deposit } from '../entities/Deposit';

declare global {
    namespace Express {
        export interface Request {
            user: Partial<Account>
            deposit: Partial<Deposit>
        }
    }
}