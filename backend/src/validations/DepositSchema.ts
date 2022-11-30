import { z } from 'zod';

export const depositSchema = z.object({
    valor: z.number({
        required_error: "Por favor, insira o VALOR do depósito.",
        invalid_type_error: "VALOR Inválido."
    }),
    senha: z.string({
        required_error: "Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO.",
        invalid_type_error: "SENHA Inválida."
    })
    
});