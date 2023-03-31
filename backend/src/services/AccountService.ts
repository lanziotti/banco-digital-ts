import { Account } from "../entities/Account"
import { accountRepository } from "../repositories/accountRepository";
import bcrypt from 'bcrypt';
import { depositRepository } from "../repositories/depositRepository";
import { withdrawRepository } from "../repositories/withdrawRepository";
import { transferRepository } from "../repositories/transferRepository";

type AccountRequest = {
    nome: string,
    cpf: string,
    data_nascimento: string,
    telefone: string,
    email: string,
    senha_app: string,
    senha_transacao: string
}

export class CreateAccountService {
    async execute({
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha_app,
        senha_transacao
    }: AccountRequest): Promise<Account | Error> {
        const accountCpfExists = await accountRepository.findOneBy({ cpf });

        if (accountCpfExists) {
            return new Error("Já existe uma conta aberta com esse CPF.");
        }

        const accountEmailExists = await accountRepository.findOneBy({ email });

        if (accountEmailExists) {
            return new Error("Já existe uma conta aberta com esse E-MAIL.");
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

        return accountData;
    }
}

export class UpdateAccountService {
    async execute(
        id: number | undefined,
        {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha_app,
            senha_transacao
        }: AccountRequest): Promise<Account | Error> {
        const userExists = await accountRepository.findOneBy({ id });

        if (!userExists) {
            return new Error("Sua conta não foi encontrada. Por favor, faça o Login e tente novamente.");
        }

        const emailExists = await accountRepository.findOneBy({ email });

        if (emailExists && email !== userExists.email) {
            return new Error("Já existe outra conta com esse E-MAIL cadastrado. Por favor, insira outro e-mail.");
        }

        const cpfExists = await accountRepository.findOneBy({ cpf });

        if (cpfExists && cpf !== userExists.cpf) {
            return new Error("Já existe outra conta com esse CPF cadastrado. Por favor, insira outro CPF correto");
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

        const returnUpdateData = await accountRepository.save(updatedData);

        return returnUpdateData;
    }
}

export class DeleteAccountService {
    async execute(id: number | undefined) {
        const userExists = await accountRepository.findOneBy({ id });

        if (!userExists) {
            return new Error("Sua conta não foi encontrada. Por favor, faça o Login e tente novamente.");
        }

        if (Number(userExists.saldo) > 0) {
            return new Error("Não é possível excluir uma conta que ainda possua fundos.");
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
    }
}