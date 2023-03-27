import { format } from "date-fns";

export function formatToDate(date) {
    const generatedDate = new Date(`${date}T12:00`);
    
    return format(generatedDate, 'dd/MM/yyyy');
}

export function formatToMoney(value) {
    return value.toLocaleString('pt-br',
        { style: 'currency', currency: 'BRL' }
    );
}