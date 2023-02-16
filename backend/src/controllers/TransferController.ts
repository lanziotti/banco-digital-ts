import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { accountRepository } from '../repositories/accountRepository';
import { transferRepository } from '../repositories/transferRepository';

export class TransferController {
    async create(req: Request, res: Response) {
        const { id } = req.user;
        const { numero_conta_destino, valor, senha } = req.body;

        try {
            const userExists = await accountRepository.findOneBy({ id });

            if (!userExists) {
                return res.status(404).json({ mensagem: "Sua conta não foi encontrada. Por favor, faça o Login e tente novamente." });
            }

            const destinationAccount = await accountRepository.findOneBy({ id: numero_conta_destino });

            if (!destinationAccount) {
                return res.status(404).json({ mensagem: "Essa conta de destino não existe. Por favor, verifique se o número da conta de destino está correta." });
            }

            if (valor <= 0) {
                return res.status(404).json({ mensagem: "Não é possível fazer uma TRANSFERÊNCIA com valores zerados ou negativos." });
            }

            if (valor > Number(userExists.saldo)) {
                return res.status(404).json({ mensagem: "Saldo Insuficiente." });
            }

            const correctPassword = await bcrypt.compare(senha, userExists.senha_transacao);

            if (!correctPassword) {
                return res.status(404).json({ mensagem: "SENHA inválida. Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO." });
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

            return res.status(201).json({ mensagem: "Transferência efetuada com sucesso!" });

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}