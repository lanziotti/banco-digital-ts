import { app } from '../src/app';
import request from 'supertest';
import { AppDataSource } from '../src/data-source';
import { accountData } from './faker/fakerAccount';

describe("Rota de saque", () => {
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
            valor: 2000,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('Saque em uma conta de um usuário não logado...', async () => {
        const { status, body } = await request(app).post("/saque").send({
            valor: 1000,
            senha: accountData.senha_transacao
        });

        expect(status).toBe(401);
        expect(body).toEqual({ "mensagem": "Não autorizado. Por favor, efetue o login." });
    });

    it('Saque em uma conta de um usuário logado...', async () => {
        const { status, body } = await request(app).post("/saque").send({
            valor: 1000,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(201);
        expect(body).toEqual({ "mensagem": "Saque realizado com sucesso!" });
    });

    it('Saque em uma conta de um usuário logado com o VALOR inválido...', async () => {
        const { status, body } = await request(app).post("/saque").send({
            valor: -1000,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "Não é possível fazer um SAQUE com valores zerados ou negativos." });
    });

    it('Saque em uma conta de um usuário logado com SALDO insuficiente...', async () => {
        const { status, body } = await request(app).post("/saque").send({
            valor: 11000,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "Saldo Insuficiente." });
    });

    it('Saque em uma conta de um usuário logado com a SENHA inválida...', async () => {
        const { status, body } = await request(app).post("/saque").send({
            valor: 500,
            senha: accountData.senha_app
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "SENHA inválida. Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO." });
    });
});