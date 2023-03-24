import { createContext, useState } from 'react';

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
    const defaultFormRegister = {
        name: '',
        cpf: '',
        date_of_birth: '',
        telephone: '',
        email: '',
        password_app: '',
        password_transaction: ''
    }

    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [formRegister, setFormRegister] = useState({ ...defaultFormRegister });
    const [showPasswordApp, setShowPasswordApp] = useState(false);
    const [showPasswordTransaction, setShowPasswordTransaction] = useState(false);
    const [email, setEmail] = useState('');
    const [passwordApp, setPasswordApp] = useState('');
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [openModalAccountData, setOpenModalAccountData] = useState(false);
    const [openModalDeposit, setOpenModalDeposit] = useState(false);
    const [showPasswordDeposit, setShowPasswordDeposit] = useState(false);
    const [valueDeposit, setValueDeposit] = useState('');
    const [passwordDeposit, setPasswordDeposit] = useState('');
    const [balance, setBalance] = useState('');

    return (
        <GlobalContext.Provider value={{
            openModalLogin,
            setOpenModalLogin,
            formRegister,
            setFormRegister,
            defaultFormRegister,
            showPasswordApp,
            setShowPasswordApp,
            showPasswordTransaction,
            setShowPasswordTransaction,
            email,
            setEmail,
            passwordApp,
            setPasswordApp,
            showPasswordLogin,
            setShowPasswordLogin,
            openModalAccountData,
            setOpenModalAccountData,
            openModalDeposit,
            setOpenModalDeposit,
            showPasswordDeposit,
            setShowPasswordDeposit,
            valueDeposit,
            setValueDeposit,
            passwordDeposit,
            setPasswordDeposit,
            balance,
            setBalance
        }}>
            {children}
        </GlobalContext.Provider>
    );
}