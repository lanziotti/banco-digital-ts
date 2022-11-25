import { Request, Response } from 'express';
import { accountRepository } from '../repositories/accountRepository';
import bcrypt from 'bcrypt';

export class AccountController {
    async create(req: Request, res: Response) {
        const { nome, cpf, data_nascimento, telefone, email, senha_app, senha_transacao } = req.body;

        try {
            const account = await accountRepository.findOneBy({ cpf });

            if (account) {
                return res.status(404).json({mensagem: "Já existe uma conta aberta com esse CPF."});
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

        } catch (error) {
            console.log(error)
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}