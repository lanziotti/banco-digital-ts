import { app } from '../src/app';
import request from 'supertest';
import { AppDataSource } from '../src/data-source';
import { accountData } from './faker/fakerAccount';

describe("Rota de depósito", () => {
    let token: string = '';

    beforeAll(async () => {
        await AppDataSource.initialize();

        await request(app).post("/conta").send(accountData);

        const login = await request(app).post("/login").send({
            email: accountData.email,
            senha: accountData.senha_app
        });

        token = login.body.token;
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('Depósito de um usuário não logado...', async () => {
        const { status, body } = await request(app).post("/deposito").send({
            valor: 1000,
            senha: accountData.senha_transacao
        });

        expect(status).toBe(401);
        expect(body).toEqual({ "mensagem": "Não autorizado. Por favor, efetue o login." });
    });

    it('Depósito de um usuário logado...', async () => {
        const { status, body } = await request(app).post("/deposito").send({
            valor: 1000,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(201);
        expect(body).toEqual({ "mensagem": "Depósito realizado com sucesso!" });
    });

    it('Depósito de um usuário logado sem passar o VALOR...', async () => {
        const { status, body } = await request(app).post("/deposito").send({
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "Por favor, insira o VALOR do depósito." }]);
    });

    it('Depósito de um usuário logado passando um VALOR inválido...', async () => {
        const { status, body } = await request(app).post("/deposito").send({
            valor: -1000,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "Não é possível fazer um DEPÓSITO com valores zerados ou negativos." });
    });

    it('Depósito de um usuário logado com passando a SENHA inválida...', async () => {
        const { status, body } = await request(app).post("/deposito").send({
            valor: 1000,
            senha: accountData.senha_app
        }).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "SENHA inválida. Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO." });
    });
});