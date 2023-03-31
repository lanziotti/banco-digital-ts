import { app } from '../src/app';
import request from 'supertest';
import { AppDataSource } from '../src/data-source';
import { accountData, accountDataIncomplete, accountDataNameInvalid, accountDataCpfInvalid, accountDataPhoneInvalidMin, accountDataCpfExists, accountDataPhoneInvalidMax, accountDataEmailInvalid, accountDataPasswordInvalidMin, accountDataPasswordInvalidRegex, accountDataPasswordInvalidMinTransaction, accountDataPasswordInvalidNotNumber, accountDataEmailExists } from './faker/fakerAccount';

describe("Rota de detalhamento dos dados de uma conta", () => {
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

    it('Detalhamento dos dados da conta do usuário logado...', async () => {
        const { status, body } = await request(app).get("/conta").set("Authorization", `Bearer ${token}`);

        expect(status).toBe(200);
        expect(body).toHaveProperty('id');
    });

    it('Detalhamento dos dados da conta de um usuário não logado...', async () => {
        const { status, body } = await request(app).get("/conta");

        expect(status).toBe(401);
        expect(body).toEqual({ "mensagem": "Não autorizado. Por favor, efetue o login." });
    });
});

describe("Rota de edição dos dados de uma conta", () => {
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

    it('Edição dos dados da conta de um usuário não logado...', async () => {
        const { status, body } = await request(app).put("/conta");

        expect(status).toBe(401);
        expect(body).toEqual({ "mensagem": "Não autorizado. Por favor, efetue o login." });
    });

    it('Edição dos dados da conta de um usuário logado...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountData).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(200);
        expect(body).toEqual({ "mensagem": "Dados da conta atualizados com sucesso!" });
    });

    it('Edição dos dados da conta de um usuário com o body incompleto...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataIncomplete).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "Todos os campos são obrigatórios." }]);
    });

    it('Edição dos dados da conta de um usuário com o NOME inválido...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataNameInvalid).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "O NOME precisa ter, no mínimo, 3 caracteres." }]);
    });

    it('Edição dos dados da conta de um usuário com o CPF inválido...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataCpfInvalid).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "CPF Inválido. Digite apenas os números." }]);
    });

    it('Edição dos dados de uma conta com o campo CPF já existente no banco de dados...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataCpfExists).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "Já existe outra conta com esse CPF cadastrado. Por favor, insira outro CPF correto" });
    });

    it('Edição dos dados de uma conta com o campo TELEFONE inválido (inferior ao limite mínimo de caracteres)...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataPhoneInvalidMin).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "TELEFONE Inválido. Por favor, verifique se você inseriu todos os números corretamente" }]);
    });

    it('Edição dos dados de uma conta com o campo TELEFONE inválido (superou o limite máximo de caracteres)...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataPhoneInvalidMax).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "TELEFONE Inválido. Por favor, verifique se inseriu carcteres a mais do que o necessário" }]);
    });

    it('Edição dos dados de uma conta com o campo E-MAIL inválido...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataEmailInvalid).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "E-MAIL com formato Inválido." }]);
    });

    it('Edição dos dados de uma conta com o campo E-MAIL já existente no banco de dados...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataEmailExists).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(404);
        expect(body).toEqual({ "mensagem": "Já existe outra conta com esse E-MAIL cadastrado. Por favor, insira outro e-mail." });
    });

    it('Edição dos dados de uma conta com o campo SENHA_APP inválido (inferior ao limite mínimo de caracteres)...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataPasswordInvalidMin).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "A SENHA DO APP precisa ter, no mínimo, 6 caracteres." }]);
    });

    it('Edição dos dados de uma conta com o campo SENHA_APP inválido (não há nenhum carctere maiúsculo)...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataPasswordInvalidRegex).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "A SENHA DO APP precisa ter pelo menos uma LETRA MAIÚSCULA." }]);
    });

    it('Edição dos dados de uma conta com o campo SENHA_TRANSACAO inválido (inferior ao limite mínimo de caracteres)...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataPasswordInvalidMinTransaction).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "A SENHA DA CONTA precisa ter, no mínimo, 8 caracteres." }]);
    });

    it('Edição dos dados de uma conta com o campo SENHA_TRANSACAO inválido (não há nenhum número)...', async () => {
        const { status, body } = await request(app).put("/conta").send(accountDataPasswordInvalidNotNumber).set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual([{ "mensagem": "A SENHA DA CONTA precisa ter pelo menos um NÚMERO." }]);
    });
});

describe("Rota de exclusão de uma conta", () => {
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

    it('Exclusão de uma conta com o usuário não logado...', async () => {
        const { status, body } = await request(app).delete("/conta");

        expect(status).toBe(401);
        expect(body).toEqual({ "mensagem": "Não autorizado. Por favor, efetue o login." });
    });

    it('Exclusão de uma conta com o usuário logado...', async () => {
        const { status, body } = await request(app).delete("/conta").set("Authorization", `Bearer ${token}`);

        expect(status).toBe(200);
        expect(body).toEqual({ "mensagem": "Conta excluida com sucesso!" });
    });

    it('Exclusão de uma conta que ainda possua fundos...', async () => {
        await request(app).post("/conta").send(accountData);

        const login = await request(app).post("/login").send({
            email: accountData.email,
            senha: accountData.senha_app
        });

        token = login.body.token;

        await request(app).post("/deposito").send({
            valor: 1000,
            senha: accountData.senha_transacao
        }).set("Authorization", `Bearer ${token}`);

        const { status, body } = await request(app).delete("/conta").set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toEqual({ "mensagem": "Não é possível excluir uma conta que ainda possua fundos." });
    });
});