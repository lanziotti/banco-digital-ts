import { format } from "date-fns";

export function formatToDate(date) {
    const generatedDate = new Date(date);

    return format(generatedDate, 'dd/MM/yyyy');
}

export function formatToMoney(value) {
    return value.toLocaleString('pt-br',
        { style: 'currency', currency: 'BRL' }
    );
}