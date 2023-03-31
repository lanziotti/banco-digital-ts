import { Request, Response } from "express";
import { DepositService } from "../services/DepositService";

export class DepositController {
    async create(req: Request, res: Response) {
        const { id } = req.user;
        const { valor, senha } = req.body;

        try {
            const service = new DepositService();

            const result = await service.execute(
                id,
                {
                    valor,
                    senha
                }
            );

            if (result instanceof Error) {
                return res.status(404).json({ mensagem: result.message });
            }

            return res.status(201).json({ mensagem: "Depósito realizado com sucesso!" });

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}