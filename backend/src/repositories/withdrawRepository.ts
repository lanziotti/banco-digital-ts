import { AppDataSource } from '../data-source';
import { Withdraw } from '../entities/Withdraw';

export const withdrawRepository = AppDataSource.getRepository(Withdraw);