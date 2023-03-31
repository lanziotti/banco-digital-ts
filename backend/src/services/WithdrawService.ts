import bcrypt from 'bcrypt';
import { accountRepository } from '../repositories/accountRepository';
import { withdrawRepository } from '../repositories/withdrawRepository';

type WithdrawRequest = {
    valor: number,
    senha: string
}

export class WithdrawService {
    async execute(
        id: number | undefined,
        {
            valor,
            senha
        }: WithdrawRequest
    ) {
        const userExists = await accountRepository.findOneBy({ id });

            if (!userExists) {
                return new Error("Sua conta não foi encontrada. Por favor, faça o Login e tente novamente.");
            }

            if (valor <= 0) {
                return new Error("Não é possível fazer um SAQUE com valores zerados ou negativos.");
            }

            if (valor > Number(userExists.saldo)) {
                return new Error("Saldo Insuficiente.");
            }

            const correctPassword = await bcrypt.compare(senha, userExists.senha_transacao);

            if (!correctPassword) {
                return new Error("SENHA inválida. Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO.");
            }

            const encryptedPassword = await bcrypt.hash(senha, 10);

            const newWithdraw = withdrawRepository.create({
                valor,
                data: new Date(),
                senha: encryptedPassword,
                account: userExists.id
            });

            await withdrawRepository.save(newWithdraw);

            const updatedBalance = {
                ...userExists,
                saldo: Number(userExists.saldo) - valor
            }

            await accountRepository.save(updatedBalance);
     }
}