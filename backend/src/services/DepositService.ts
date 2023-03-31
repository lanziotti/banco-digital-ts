import bcrypt from 'bcrypt';
import { accountRepository } from '../repositories/accountRepository';
import { depositRepository } from '../repositories/depositRepository';

type DepositRequest = {
    valor: number,
    senha: string
}

export class DepositService {
    async execute(
        id: number | undefined,
        {
            valor,
            senha
        }: DepositRequest
    ) {
        const userExists = await accountRepository.findOneBy({ id });

        if (!userExists) {
            return new Error("Sua conta não foi encontrada. Por favor, faça o Login e tente novamente.");
        }

        if (valor <= 0) {
            return new Error("Não é possível fazer um DEPÓSITO com valores zerados ou negativos.");
        }

        const correctPassword = await bcrypt.compare(senha, userExists.senha_transacao);

        if (!correctPassword) {
            return new Error("SENHA inválida. Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO.");
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const newDeposit = depositRepository.create({
            valor,
            data: new Date(),
            senha: encryptedPassword,
            account: userExists.id
        });

        await depositRepository.save(newDeposit);

        const updatedBalance = {
            ...userExists,
            saldo: Number(userExists.saldo) + valor
        }

        await accountRepository.save(updatedBalance);
    }
}