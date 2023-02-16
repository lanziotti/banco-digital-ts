import { app } from '../src/app';
import request from 'supertest';
import { accountData } from './faker/fakerAccount';
import { AppDataSource } from '../src/data-source';

describe("Rota de login de um usuário", () => {
    beforeAll(async () => {
        await AppDataSource.initialize();

        await request(app).post("/conta").send(accountData);
    });

    afterAll(async () => {
        await AppDataSource.destroy()
    });

    it('Login do usuário com o body correto...', async () => {
        const { status, body } = await request(app).post("/login").send({
            email: accountData.email,
            senha: accountData.senha_app
        });

        expect(status).toBe(200);
        expect(body).toHaveProperty('token');
    });

    it('Login do usuário com o body incompleto...', async () => {
        const { status, body } = await request(app).post("/login").send({
            email: accountData.email
        });

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "Todos os campos são obrigatórios" }]);
    });

    it('Login do usuário com o e-mail do body no formato inválido...', async () => {
        const { status, body } = await request(app).post("/login").send({
            email: 'cs@emailcom',
            senha: 'Carlos123'
        });

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "EMAIL e/ou SENHA inválidos." });
    });

    it('Login do usuário com o e-mail do body não cadastrado no sistema...', async () => {
        const { status, body } = await request(app).post("/login").send({
            email: 'cs@email.com',
            senha: 'Carlos123'
        });

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "EMAIL e/ou SENHA inválidos." });
    });

    it('Login do usuário com a senha do body inválida...', async () => {
        const { status, body } = await request(app).post("/login").send({
            email: 'cs@email.com',
            senha: 'carlos1234'
        });

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "EMAIL e/ou SENHA inválidos." });
    });
});