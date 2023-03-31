import { Request, Response } from 'express';
import { ExtractService } from '../services/ExtractService';

export class ExtractController {
    async read(req: Request, res: Response) {
        const { id } = req.user;

        try {
            const service = new ExtractService();

            const result = await service.execute(id);

            if (result instanceof Error) {
                return res.status(404).json({ mensagem: result.message });
            }

            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}