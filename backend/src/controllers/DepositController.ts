import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { accountRepository } from "../repositories/accountRepository";
import { depositRepository } from '../repositories/depositRepository';

export class DepositController {
    async create(req: Request, res: Response) {
        const { id } = req.user;
        const { valor, senha } = req.body;

        try {
            const userExists = await accountRepository.findOneBy({ id });

            if (!userExists) {
                return res.status(404).json({ mensagem: "Sua conta não foi encontrada. Por favor, faça o Login e tente novamente." });
            }

            if (valor <= 0) {
                return res.status(404).json({ mensagem: "Não é possível fazer um DEPÓSITO com valores zerados ou negativos." });
            }

            const correctPassword = await bcrypt.compare(senha, userExists.senha_transacao);

            if (!correctPassword) {
                return res.status(404).json({ mensagem: "SENHA inválida. Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO." });
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

            return res.status(201).json({ mensagem: "Depósito realizado com sucesso!" });

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}