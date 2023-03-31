import { Request, Response } from 'express';
import { LoginService } from '../services/LoginService';

export class LoginController {
    async create(req: Request, res: Response) {
        const { email, senha } = req.body;

        try {
            const service = new LoginService();

            const result = await service.execute(
                {
                    email,
                    senha
                }
            );

            if (result instanceof Error) {
                return res.status(404).json({ mensagem: result.message });
            }

            const resultLogin = {
                usuario: result.usuario,
                token: result.token
            }

            return res.status(200).json(resultLogin);

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}