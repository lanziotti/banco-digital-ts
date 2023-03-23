import { Request, Response } from 'express';
import { accountRepository } from '../repositories/accountRepository';
import { depositRepository } from '../repositories/depositRepository';
import { withdrawRepository } from '../repositories/withdrawRepository';
import { transferRepository } from '../repositories/transferRepository';
import bcrypt from 'bcrypt';

export class AccountController {
    async create(req: Request, res: Response) {
        const { nome, cpf, data_nascimento, telefone, email, senha_app, senha_transacao } = req.body;

        try {
            const accountCpfExists = await accountRepository.findOneBy({ cpf });

            if (accountCpfExists) {
                return res.status(400).json({ mensagem: "Já existe uma conta aberta com esse CPF." });
            }

            const accountEmailExists = await accountRepository.findOneBy({ email });

            if (accountEmailExists) {
                return res.status(400).json({ mensagem: "Já existe uma conta aberta com esse E-MAIL." });
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
            const userExists = await accountRepository.findOneBy({ id });

            if (!userExists) {
                return res.status(404).json({ mensagem: "Sua conta não foi encontrada. Por favor, faça o Login e tente novamente." });
            }

            const emailExists = await accountRepository.findOneBy({ email });

            if (emailExists && email !== userExists.email) {
                return res.status(404).json({ mensagem: "Já existe outra conta com esse E-MAIL cadastrado. Por favor, insira outro e-mail." });
            }

            const cpfExists = await accountRepository.findOneBy({ cpf });

            if (cpfExists && cpf !== userExists.cpf) {
                return res.status(404).json({ mensagem: "Já existe outra conta com esse CPF cadastrado. Por favor, insira outro CPF correto" });
            }

            const encryptedPasswordApp = await bcrypt.hash(senha_app, 10);

            const encryptedPasswordTransactions = await bcrypt.hash(senha_transacao, 10);

            const updatedData = {
                id: id ? id : userExists.id,
                nome: nome ? nome : userExists.nome,
                email: email ? email : userExists.email,
                cpf: cpf ? cpf : userExists.cpf,
                data_nascimento: data_nascimento ? data_nascimento : userExists.data_nascimento,
                telefone: telefone ? telefone : userExists.telefone,
                senha_app: senha_app ? encryptedPasswordApp : userExists.senha_app,
                senha_transacao: senha_transacao ? encryptedPasswordTransactions : userExists.senha_transacao,
                saldo: userExists.saldo
            }

            await accountRepository.save(updatedData);

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
            const userExists = await accountRepository.findOneBy({ id });

            if (!userExists) {
                return res.status(404).json({ mensagem: "Sua conta não foi encontrada. Por favor, faça o Login e tente novamente." });
            }

            if (Number(userExists.saldo) > 0) {
                return res.status(400).json({ mensagem: "Não é possível excluir uma conta que ainda possua fundos." });
            }

            const allDeposits = await depositRepository.find({
                loadRelationIds: true,
                where: {
                    account: id
                }
            });

            const filterDeposits = allDeposits.filter((deposit) => deposit.account === id);

            const allWithdraws = await withdrawRepository.find({
                loadRelationIds: true,
                where: {
                    account: id
                }
            });

            const filterWithdraws = allWithdraws.filter((withdraw) => withdraw.account === id);

            const allTransfers = await transferRepository.find({
                loadRelationIds: true,
                where: {
                    account_origin: id,
                    account_destiny: id
                }
            });

            const filterTransfers = allTransfers.filter((transfer) => {
                return transfer.account_origin === id || transfer.account_destiny === id;
            });

            for (const deposit of filterDeposits) {
                await depositRepository.delete(deposit);
            }

            for (const withdraw of filterWithdraws) {
                await withdrawRepository.delete(withdraw);
            }

            for (const transfer of filterTransfers) {
                await transferRepository.delete(transfer);
            }

            await accountRepository.delete(userExists);

            res.status(200).json({ mensagem: "Conta excluida com sucesso!" });

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}