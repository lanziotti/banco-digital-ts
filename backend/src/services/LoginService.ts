import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { accountRepository } from '../repositories/accountRepository';

type LoginRequest = {
    email: string,
    senha: string
}

type UserLogin = {
    usuario: {
        id: number,
        nome: string,
        email: string,
        cpf: string,
        data_nascimento: Date,
        telefone: string,
        saldo: number
    },
    token: string
}

export class LoginService {
    async execute(
        {
            email,
            senha
        }: LoginRequest
    ): Promise<UserLogin | Error> {
        
        const user = await accountRepository.findOneBy({ email });

        if (!user) {
            return new Error("EMAIL e/ou SENHA inválidos.");
        }

        const correctPassword = await bcrypt.compare(senha, user.senha_app);

        if (!correctPassword) {
            return new Error("EMAIL e/ou SENHA inválidos.");
        }

        const token = jwt.sign({ id: user.id }, process.env.HASH_JWT ?? '', { expiresIn: '8h' });

        const userLogin = {
            usuario: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                cpf: user.cpf,
                data_nascimento: user.data_nascimento,
                telefone: user.telefone,
                saldo: Number(user.saldo)
            },
            token
        }

        return userLogin;
    }
}