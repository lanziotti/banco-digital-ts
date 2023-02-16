import { Request, Response } from 'express';
import { accountRepository } from '../repositories/accountRepository';
import { depositRepository } from '../repositories/depositRepository';
import { withdrawRepository } from '../repositories/withdrawRepository';
import { transferRepository } from '../repositories/transferRepository';

export class ExtractController {
    async read(req: Request, res: Response) {
        const { id } = req.user;

        try {
            const userExists = await accountRepository.findOneBy({ id });

            if (!userExists) {
                return res.status(404).json({ mensagem: "Sua conta não foi encontrada. Por favor, faça o Login e tente novamente." });
            }

            const allDeposits = await depositRepository.find({
                loadRelationIds: true,
                where: {
                    account: id
                }
            });

            const filterDeposits = allDeposits.filter((deposit) => deposit.account === id);

            let hidePasswordDeposits = [];

            for (const deposit of filterDeposits) {
                const currentDeposit = {
                    id: deposit.id,
                    valor: deposit.valor,
                    data: deposit.data,
                    numero_conta: deposit.account
                }

                hidePasswordDeposits.push(currentDeposit);
            }

            const allWithdraws = await withdrawRepository.find({
                loadRelationIds: true,
                where: {
                    account: id
                }
            });

            const filterWithdraws = allWithdraws.filter((withdraw) => withdraw.account === id);

            let hidePasswordWithdraws = [];

            for (const withdraw of filterWithdraws) {
                const currentWithdraw = {
                    id: withdraw.id,
                    valor: withdraw.valor,
                    data: withdraw.data,
                    numero_conta: withdraw.account
                }

                hidePasswordWithdraws.push(currentWithdraw);
            }

            const allTransfersOrigin = await transferRepository.find({
                loadRelationIds: true,
                where: {
                    account_origin: id
                }
            });

            const filterTransfersOrigin = allTransfersOrigin.filter((origin) => origin.account_origin === id);

            let hidePasswordTransferOrigin = [];

            for (const origin of filterTransfersOrigin) {
                const currentOrigin = {
                    id: origin.id,
                    valor: origin.valor,
                    data: origin.data,
                    numero_conta_origem: origin.account_origin,
                    numero_conta_destino: origin.account_destiny
                }

                hidePasswordTransferOrigin.push(currentOrigin);
            }

            const allTransfersDestiny = await transferRepository.find({
                loadRelationIds: true,
                where: {
                    account_destiny: id
                }
            });

            const filterTransfersDestiny = allTransfersDestiny.filter((destiny) => destiny.account_destiny === id);

            let hidePasswordTransferDestiny = [];

            for (const destiny of filterTransfersDestiny) {
                const currentDestiny = {
                    id: destiny.id,
                    valor: destiny.valor,
                    data: destiny.data,
                    numero_conta_origem: destiny.account_origin,
                    numero_conta_destino: destiny.account_destiny
                }

                hidePasswordTransferDestiny.push(currentDestiny);
            }

            const extract = {
                depositos: [...hidePasswordDeposits],
                saques: [...hidePasswordWithdraws],
                transferenciasEnviadas: [...hidePasswordTransferOrigin],
                transferenciasRecebidas: [...hidePasswordTransferDestiny]
            }

            return res.status(200).json(extract);

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}