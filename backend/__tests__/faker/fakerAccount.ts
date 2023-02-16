import { faker } from '@faker-js/faker';

const accountData = {
    nome: faker.name.fullName(),
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "Teste123",
    senha_transacao: "teste123"
}

const accountDataIncomplete = {
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "Teste123",
    senha_transacao: "teste123"
}

const accountDataNameInvalid = {
    nome: "JR",
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "Teste123",
    senha_transacao: "teste123"
}

const accountDataCpfInvalid = {
    nome: faker.name.fullName(),
    cpf: "0236558",
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "Teste123",
    senha_transacao: "teste123"
}

const accountDataCpfExists = {
    nome: faker.name.fullName(),
    cpf: "21489652307",
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "Teste123",
    senha_transacao: "teste123"
}

const accountDataPhoneInvalidMin = {
    nome: faker.name.fullName(),
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)##'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "Teste123",
    senha_transacao: "teste123"
}

const accountDataPhoneInvalidMax = {
    nome: faker.name.fullName(),
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-#######'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "Teste123",
    senha_transacao: "teste123"
}

const accountDataEmailInvalid = {
    nome: faker.name.fullName(),
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: faker.name.fullName(),
    senha_app: "Teste123",
    senha_transacao: "teste123"
}

const accountDataPasswordInvalidMin = {
    nome: faker.name.fullName(),
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "Test",
    senha_transacao: "teste123"
}

const accountDataPasswordInvalidRegex = {
    nome: faker.name.fullName(),
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "teste123",
    senha_transacao: "teste123"
}

const accountDataPasswordInvalidMinTransaction = {
    nome: faker.name.fullName(),
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "Teste123",
    senha_transacao: "teste1"
}

const accountDataPasswordInvalidNotNumber = {
    nome: faker.name.fullName(),
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: faker.helpers.unique(faker.internet.email),
    senha_app: "Teste123",
    senha_transacao: "testando"
}

const accountDataEmailExists = {
    nome: faker.name.fullName(),
    cpf: faker.random.numeric(11),
    data_nascimento: faker.date.birthdate(),
    telefone: faker.phone.number('(##)#####-####'),
    email: "silvio@email.com",
    senha_app: "Teste123",
    senha_transacao: "teste123"
}

export {
    accountData,
    accountDataIncomplete,
    accountDataNameInvalid,
    accountDataCpfInvalid,
    accountDataCpfExists,
    accountDataPhoneInvalidMax,
    accountDataEmailInvalid,
    accountDataPhoneInvalidMin,
    accountDataPasswordInvalidMin,
    accountDataPasswordInvalidRegex,
    accountDataPasswordInvalidMinTransaction,
    accountDataPasswordInvalidNotNumber,
    accountDataEmailExists
}