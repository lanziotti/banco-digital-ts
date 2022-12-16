import { z } from 'zod';

export const transferSchema = z.object({
    numero_conta_destino: z.number({
        required_error: "Por favor, insira o NÚMERO DA CONTA DE DESTINO.",
        invalid_type_error: "NÚMERO DA CONTA DE DESTINO Inválido."
    }),
    valor: z.number({
        required_error: "Por favor, insira o VALOR da transferência.",
        invalid_type_error: "VALOR Inválido."
    }),
    senha: z.string({
        required_error: "Por favor, insira corretamente a sua SENHA DE TRANSAÇÃO.",
        invalid_type_error: "SENHA Inválida."
    })
    
});