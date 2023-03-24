import api from "../services/api";
import { notifyError } from "./notifications";
import { getItem } from "./storage";

const token = getItem('token');

export async function loadBalance() {
    try {
        const responseBalance = await api.get('/conta', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (responseBalance.status > 204) {
            return notifyError(responseBalance.data);
        }

        const { saldo } = responseBalance.data;
        
        return saldo;

    } catch (error) {
        notifyError(error.response.data);
    }
}