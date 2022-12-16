import { Account } from '../entities/Account';
import { Deposit } from '../entities/Deposit';
import { Withdraw } from '../entities/Withdraw';
import { Transfer } from '../entities/Transfer';

declare global {
    namespace Express {
        export interface Request {
            user: Partial<Account>
            deposit: Partial<Deposit>
            withdraw: Partial<Withdraw>
            transfer: Partial<Transfer>
        }
    }
}