import { Request, Response } from 'express';
import { accountRepository } from '../repositories/accountRepository';
import { depositRepository } from '../repositories/depositRepository';
import { withdrawRepository } from '../repositories/withdrawRepository';
import { transferRepository } from '../repositories/transferRepository';
import { CreateAccountService, DeleteAccountService, UpdateAccountService } from '../services/AccountService';

export class CreateAccountController {
    async create(req: Request, res: Response) {
        const {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha_app,
            senha_transacao
        } = req.body;

        try {
            const service = new CreateAccountService();

            const result = await service.execute({
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha_app,
                senha_transacao
            });

            if (result instanceof Error) {
                return res.status(400).json({ mensagem: result.message });
            }

            const userData = {
                id: result.id,
                nome: result.nome,
                saldo: result.saldo,
                usuario: {
                    cpf: result.cpf,
                    data_nascimento: result.data_nascimento,
                    telefone: result.telefone,
                    email: result.email
                }
            }

            return res.status(201).json(userData);

        } catch (error) {
            console.log(error)
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}

export class DetailAccountDataController {
    async read(req: Request, res: Response) {
        return res.status(200).json(req.user);
    }
}

export class UpdateAccountController {
    async update(req: Request, res: Response) {
        const { id } = req.user;
        const { nome, email, data_nascimento, cpf, telefone, senha_app, senha_transacao } = req.body;

        try {
            const service = new UpdateAccountService();

            const result = await service.execute(
                id,
                {
                    nome,
                    cpf,
                    data_nascimento,
                    telefone,
                    email,
                    senha_app,
                    senha_transacao
                });

            if (result instanceof Error) {
                return res.status(404).json({ mensagem: result.message });
            }

            return res.status(200).json({ mensagem: "Dados da conta atualizados com sucesso!" });

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}

export class DeleteAccountController {
    async delete(req: Request, res: Response) {
        const { id } = req.user;

        try {
            const service = new DeleteAccountService();

            const result = await service.execute(id);

            if (result instanceof Error) {
                if (result.message === "Sua conta não foi encontrada. Por favor, faça o Login e tente novamente.") {
                    return res.status(404).json({ mensagem: result.message });
                } else {
                    return res.status(400).json({ mensagem: result.message });
                }
            }

            res.status(200).json({ mensagem: "Conta excluida com sucesso!" });

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}