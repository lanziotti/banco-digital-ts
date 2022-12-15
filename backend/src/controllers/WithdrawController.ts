import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../helpers/api-errors';
import { accountRepository } from '../repositories/accountRepository';
import { withdrawRepository } from '../repositories/withdrawRepository';

export class WithdrawController {
    async create(req: Request, res: Response) {
        const { id } = req.user;
        const { valor, senha } = req.body;

        const userExists = await accountRepository.findOneBy({ id });
        
        if (!userExists) {
            throw new NotFoundError("Sua conta não foi encontrada. Por favor, faça o Login e tente novamente.");
        }

        if (valor <= 0) {
            throw new BadRequestError("Não é possível fazer um SAQUE com valores zerados ou negativos.");
        }

        if (valor > Number(userExists.saldo)) {
            throw new BadRequestError("Saldo Insuficiente.");
        }

        const correctPassword = await bcrypt.compare(senha, userExists.senha_transacao);

        if (!correctPassword) {
            throw new BadRequestError("SENHA inválida. Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO.");
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

        return res.status(201).json({ mensagem: "Saque realizado com sucesso!" });
    }
}