import { app } from '../src/app';
import request from 'supertest';
import { accountData, accountDataCpfExists, accountDataCpfInvalid, accountDataEmailInvalid, accountDataIncomplete, accountDataNameInvalid, accountDataPasswordInvalidMin, accountDataPasswordInvalidMinTransaction, accountDataPasswordInvalidNotNumber, accountDataPasswordInvalidRegex, accountDataPhoneInvalidMax, accountDataPhoneInvalidMin } from './faker/fakerAccount';
import { AppDataSource } from '../src/data-source';

describe("Rota de cadastro de uma conta", () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('Cadastro de uma conta com o body correto...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountData);

        expect(status).toBe(201);
        expect(body).toHaveProperty('id');
    });

    it('Cadastro de uma conta com o body incompleto...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataIncomplete);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "Todos os campos são obrigatórios." }]);
    });

    it('Cadastro de uma conta com o campo NOME inválido...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataNameInvalid);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "O NOME precisa ter, no mínimo, 3 caracteres." }]);
    });

    it('Cadastro de uma conta com o campo CPF inválido...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataCpfInvalid);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "CPF Inválido. Digite apenas os números." }]);
    });

    it('Cadastro de uma conta com o campo CPF já existente no banco de dados...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataCpfExists);
        
        expect(status).toBe(400);
        expect(body).toEqual({ "mensagem": "Já existe uma conta aberta com esse CPF." });
    });

    it('Cadastro de uma conta com o campo TELEFONE inválido (inferior ao limite mínimo de caracteres)...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataPhoneInvalidMin);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "TELEFONE Inválido. Por favor, verifique se você inseriu todos os números corretamente" }]);
    });

    it('Cadastro de uma conta com o campo TELEFONE inválido (superou o limite máximo de caracteres)...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataPhoneInvalidMax);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "TELEFONE Inválido. Por favor, verifique se inseriu carcteres a mais do que o necessário" }]);
    });

    it('Cadastro de uma conta com o campo E-MAIL inválido...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataEmailInvalid);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "E-MAIL com formato Inválido." }]);
    });

    it('Cadastro de uma conta com o campo SENHA_APP inválido (inferior ao limite mínimo de caracteres)...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataPasswordInvalidMin);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "A SENHA DO APP precisa ter, no mínimo, 6 caracteres." }]);
    });

    it('Cadastro de uma conta com o campo SENHA_APP inválido (não há nenhum carctere maiúsculo)...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataPasswordInvalidRegex);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "A SENHA DO APP precisa ter pelo menos uma LETRA MAIÚSCULA." }]);
    });

    it('Cadastro de uma conta com o campo SENHA_TRANSACAO inválido (inferior ao limite mínimo de caracteres)...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataPasswordInvalidMinTransaction);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "A SENHA DA CONTA precisa ter, no mínimo, 8 caracteres." }]);
    });

    it('Cadastro de uma conta com o campo SENHA_TRANSACAO inválido (não há nenhum número)...', async () => {
        const { status, body } = await request(app).post("/conta").send(accountDataPasswordInvalidNotNumber);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "A SENHA DA CONTA precisa ter pelo menos um NÚMERO." }]);
    });
});