import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { accountRepository } from '../repositories/accountRepository';

type JwtPayload = {
    id: number
}

export const authenticationFilter = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            return res.status(401).json({ mensagem: "Não autorizado. Por favor, efetue o login." });
        }

        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, process.env.HASH_JWT ?? '') as JwtPayload;

        const user = await accountRepository.findOneBy({ id });

        if (!user) {
            return res.status(401).json({ mensagem: "Não autorizado. Por favor, efetue o login." });
        }

        const userData = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            cpf: user.cpf,
            data_nascimento: user.data_nascimento,
            telefone: user.telefone,
            saldo: user.saldo
        }

        req.user = userData;

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Não autorizado. Por favor, efetue o login." });
    }
}