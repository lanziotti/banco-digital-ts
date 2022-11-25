import { z } from 'zod';

export const accountSchema = z.object({
    nome: z.string({
        required_error: "Todos os campos são obrigatórios.",
        invalid_type_error: "NOME Inválido."
    })
    .min(3, "O NOME precisa ter, no mínimo, 3 caracteres."),
    cpf: z.string({
        required_error: "Todos os campos são obrigatórios.",
        invalid_type_error: "CPF Inválido."
    })
    .min(11, "CPF Inválido.")
    .max(11, "CPF Inválido."),
    data_nascimento: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date({
        required_error: "Todos os campos são obrigatórios."
      })),
    telefone: z.string({
        required_error: "Todos os campos são obrigatórios.",
        invalid_type_error: "TELEFONE Inválido."
    })
    .min(10, "TELEFONE Inválido. Por favor, verifique se você inseriu todos os números corretamente")
    .max(14, "TELEFONE Inválido. Por favor, verifique se inseriu carcteres a mais do que o necessário"),
    email: z.string({
        required_error: "Todos os campos são obrigatórios.",
        invalid_type_error: "E-MAIL Inválido"
    })
    .email({message: "E-MAIL com formato Inválido."}),
    senha_app: z.string({
        required_error: "Todos os campos são obrigatórios",
        invalid_type_error: "SENHA DO APP Inválida."
    })
    .min(6, "A SENHA DO APP precisa ter, no mínimo, 6 caracteres.")
    .regex(/^(?=.*?[A-Z]).*$/, "A SENHA DO APP precisa ter pelo menos uma LETRA MAIÚSCULA."),
    senha_transacao: z.string({
        required_error: "Todos os campos são obrigatórios.",
        invalid_type_error: "SENHA DA CONTA Inválida."
    })
    .min(8, "A SENHA DA CONTA precisa ter, no mínimo, 8 caracteres.")
    .regex(/^(?=.*?[0-9]).*$/, "A SENHA DA CONTA precisa ter pelo menos um NÚMERO.")
});