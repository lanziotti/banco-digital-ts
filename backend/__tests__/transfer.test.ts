import { app } from '../src/app';
import request from 'supertest';
import { AppDataSource } from '../src/data-source';
import { accountData } from './faker/fakerAccount';

describe("Rota de transferência bancária", () => {
    let token: string = '';

    beforeAll(async () => {
        await AppDataSource.initialize();

        await request(app).post("/conta").send(accountData);

        const login = await request(app).post("/login").send({
            email: accountData.email,
            senha: accountData.senha_app
        });

        token = login.body.token;

        await request(app).post("/deposito").send({
            valor: 20000,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('Transferência bancária de uma conta de um usuário não logado...', async () => {
        const { status, body } = await request(app).post("/transferencia").send({
            numero_conta_destino: 5,
            valor: 500,
            senha: accountData.senha_transacao
        });

        expect(status).toBe(401);
        expect(body).toEqual({ "mensagem": "Não autorizado. Por favor, efetue o login." });
    });

    it('Transferência bancária de uma conta de um usuário logado...', async () => {
        const { status, body } = await request(app).post("/transferencia").send({
            numero_conta_destino: 5,
            valor: 500,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(201);
        expect(body).toEqual({ "mensagem": "Transferência efetuada com sucesso!" });
    });

    it('Tranferência bancária de uma conta de um usuário logado para outra conta inexistente...', async () => {
        const { status, body } = await request(app).post("/transferencia").send({
            numero_conta_destino: 1000,
            valor: 500,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "Essa conta de destino não existe. Por favor, verifique se o número da conta de destino está correta." });
    });

    it('Transferência bancária de uma conta de um usuário logado com VALOR inválido...', async () => {
        const { status, body } = await request(app).post("/transferencia").send({
            numero_conta_destino: 5,
            valor: -500,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "Não é possível fazer uma TRANSFERÊNCIA com valores zerados ou negativos." });
    });

    it('Transferência bancária de uma conta de um usuário logado com SALDO insuficiente...', async () => {
        const { status, body } = await request(app).post("/transferencia").send({
            numero_conta_destino: 5,
            valor: 500000,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "Saldo Insuficiente." });
    });

    it('Transferência bancária de uma conta de um usuário logado com a SENHA inválida...', async () => {
        const { status, body } = await request(app).post("/transferencia").send({
            numero_conta_destino: 5,
            valor: 500,
            senha: accountData.senha_app
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "SENHA inválida. Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO." });
    });
});