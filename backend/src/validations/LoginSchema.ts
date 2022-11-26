import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({
        required_error: "Todos os campos são obrigatórios.",
        invalid_type_error: "E-MAIL Inválido"
    }),
    senha: z.string({
        required_error: "Todos os campos são obrigatórios",
        invalid_type_error: "SENHA DO APP Inválida."
    })
});