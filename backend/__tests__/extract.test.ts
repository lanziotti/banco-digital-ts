import { app } from '../src/app';
import request from 'supertest';
import { AppDataSource } from '../src/data-source';
import { accountData } from './faker/fakerAccount';

describe("Rota de extrato bancário", () => {
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

    it('Extrato bancário de uma conta de um usuário não logado...', async () => {
        const {status, body} = await request(app).get("/extrato");

        expect(status).toBe(401);
        expect(body).toEqual({ "mensagem": "Não autorizado. Por favor, efetue o login." });
    });

    it('Extrato bancário de uma conta de um usuário logado...', async () => {
        const {status, body} = await request(app).get("/extrato").set("Authorization", `Bearer ${token}`);

        expect(status).toBe(200);
        expect(body).toHaveProperty('depositos');
    });
});