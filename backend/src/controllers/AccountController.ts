import { Request, Response } from 'express';
import { accountRepository } from '../repositories/accountRepository';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../helpers/api-errors';

export class AccountController {
    async create(req: Request, res: Response) {
        const { nome, cpf, data_nascimento, telefone, email, senha_app, senha_transacao } = req.body;

        const account = await accountRepository.findOneBy({ cpf });

        if (account) {
            throw new BadRequestError("Já existe uma conta aberta com esse CPF.");
        }

        const encryptedPasswordApp = await bcrypt.hash(senha_app, 10);

        const encryptedPasswordTransactions = await bcrypt.hash(senha_transacao, 10);

        const newAccount = accountRepository.create({
            nome,
            saldo: 0,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha_app: encryptedPasswordApp,
            senha_transacao: encryptedPasswordTransactions
        });

        const accountData = await accountRepository.save(newAccount);

        const userData = {
            id: accountData.id,
            nome: accountData.nome,
            saldo: accountData.saldo,
            usuario: {
                cpf: accountData.cpf,
                data_nascimento: accountData.data_nascimento,
                telefone: accountData.telefone,
                email: accountData.email
            }
        }

        return res.status(201).json(userData);

    }
}

export class DetailAccountDataController {
    async read(req: Request, res: Response) {
        return res.status(200).json(req.user);
    }
}