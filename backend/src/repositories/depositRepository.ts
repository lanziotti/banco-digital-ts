import { AppDataSource } from "../data-source";
import { Deposit } from '../entities/Deposit';

export const depositRepository = AppDataSource.getRepository(Deposit);