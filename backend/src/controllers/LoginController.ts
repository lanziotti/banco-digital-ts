import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { accountRepository } from '../repositories/accountRepository';
import { BadRequestError } from '../helpers/api-errors';

export class LoginController {
    async create(req: Request, res: Response) {
        const { email, senha } = req.body;

        const user = await accountRepository.findOneBy({ email });

        if (!user) {
            throw new BadRequestError("EMAIL e/ou SENHA inválidos.");
        }

        const correctPassword = await bcrypt.compare(senha, user.senha_app);

        if (!correctPassword) {
            throw new BadRequestError("EMAIL e/ou SENHA inválidos.");
        }

        const token = jwt.sign({ id: user.id }, process.env.HASH_JWT ?? '', { expiresIn: '8h' });

        return res.status(200).json({
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
        });
    }
}