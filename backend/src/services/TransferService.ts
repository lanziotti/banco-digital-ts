import bcrypt from 'bcrypt';
import { accountRepository } from '../repositories/accountRepository';
import { transferRepository } from '../repositories/transferRepository';

type TransferRequest = {
    numero_conta_destino: number,
    valor: number,
    senha: string
}

export class TransferService {
    async execute(
        id: number | undefined,
        {
            numero_conta_destino,
            valor,
            senha
        }: TransferRequest
    ) {
        const userExists = await accountRepository.findOneBy({ id });

        if (!userExists) {
            return new Error("Sua conta não foi encontrada. Por favor, faça o Login e tente novamente.");
        }

        const destinationAccount = await accountRepository.findOneBy({ id: numero_conta_destino });

        if (!destinationAccount) {
            return new Error("Essa conta de destino não existe. Por favor, verifique se o número da conta de destino está correta.");
        }

        if (destinationAccount.id === id) {
            return new Error("Não é possível fazer uma TRANSFERÊNCIA para a sua própria conta. Para isso, faça um DEPÓSITO.");
        }

        if (valor <= 0) {
            return new Error("Não é possível fazer uma TRANSFERÊNCIA com valores zerados ou negativos.");
        }

        if (valor > Number(userExists.saldo)) {
            return new Error("Saldo Insuficiente.");
        }

        const correctPassword = await bcrypt.compare(senha, userExists.senha_transacao);

        if (!correctPassword) {
            return new Error("SENHA inválida. Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO.");
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const newTransfer = transferRepository.create({
            valor,
            data: new Date(),
            senha: encryptedPassword,
            account_origin: id,
            account_destiny: numero_conta_destino
        });

        await transferRepository.save(newTransfer);

        const updatedBalanceUser = {
            ...userExists,
            saldo: Number(userExists.saldo) - valor
        }

        await accountRepository.save(updatedBalanceUser);

        const updatedBalanceDestiny = {
            ...destinationAccount,
            saldo: Number(destinationAccount.saldo) + valor
        }

        await accountRepository.save(updatedBalanceDestiny);
    }
}