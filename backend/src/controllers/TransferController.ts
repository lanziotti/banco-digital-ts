import { Request, Response } from 'express';
import { TransferService } from '../services/TransferService';

export class TransferController {
    async create(req: Request, res: Response) {
        const { id } = req.user;
        const { numero_conta_destino, valor, senha } = req.body;

        try {
            const service = new TransferService();

            const result = await service.execute(
                id,
                {
                    numero_conta_destino,
                    valor,
                    senha
                }
            );

            if (result instanceof Error) {
                return res.status(404).json({ mensagem: result.message });
            }

            return res.status(201).json({ mensagem: "Transferência efetuada com sucesso!" });

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}