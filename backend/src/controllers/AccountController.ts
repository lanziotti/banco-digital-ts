import { Request, Response } from 'express';
import { accountRepository } from '../repositories/accountRepository';
import bcrypt from 'bcrypt';
import { BadRequestError, NotFoundError } from '../helpers/api-errors';

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

export class UpdateAccountController {
    async update(req: Request, res: Response) {
        const { id } = req.user;
        const { nome, email, data_nascimento, cpf, telefone, senha_app, senha_transacao } = req.body;

        const userExists = await accountRepository.findOneBy({ id });

        if (!userExists) {
            throw new NotFoundError("Sua conta não foi encontrada. Por favor, faça o Login e tente novamente.");
        }

        const emailExists = await accountRepository.findOneBy({ email });

        if (emailExists && email !== userExists.email) {
            throw new NotFoundError("Já existe outra conta com esse E-MAIL cadastrado. Por favor, insira outro e-mail.");
        }

        const cpfExists = await accountRepository.findOneBy({ cpf });

        if (cpfExists && cpf !== userExists.cpf) {
            throw new NotFoundError("Já existe outra conta com esse CPF cadastrado. Por favor, insira outro CPF correto");
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
    }
}

export class DeleteAccountController {
    async delete(req: Request, res: Response) {
        const { id } = req.user;

        const userExists = await accountRepository.findOneBy({ id });
        
        if (!userExists) {
            throw new NotFoundError("Sua conta não foi encontrada. Por favor, faça o Login e tente novamente.");
        }

        if (Number(userExists.saldo) > 0) {
            throw new BadRequestError("Não é possível excluir uma conta que ainda possua fundos.");
        }

        await accountRepository.delete(userExists);

        res.status(200).json({ mensagem: "Conta excluida com sucesso!" });
    }
}