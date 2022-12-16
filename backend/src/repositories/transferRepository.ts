import { AppDataSource } from "../data-source";
import { Transfer } from "../entities/Transfer";

export const transferRepository = AppDataSource.getRepository(Transfer);