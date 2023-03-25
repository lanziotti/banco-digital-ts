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

    const defaultFormUpdate = {
        id: 0,
        nome: '',
        cpf: '',
        email: '',
        data_nascimento: '',
        telefone: '',
        saldo: ''
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
    const [openModalWithdraw, setOpenModalWithdraw] = useState(false);
    const [showPasswordWithdraw, setShowPasswordWithdraw] = useState(false);
    const [valueWithdraw, setValueWithdraw] = useState('');
    const [passwordWithdraw, setPasswordWithdraw] = useState('');
    const [openModalTransfer, setOpenModalTransfer] = useState(false);
    const [showPasswordTransfer, setShowPasswordTransfer] = useState(false);
    const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
    const [valueTransfer, setValueTransfer] = useState('');
    const [passwordTransfer, setPasswordTransfer] = useState('');
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [showPasswordUpdateApp, setShowPasswordUpdateApp] = useState(false);
    const [showPasswordUpdateTransaction, setShowPasswordUpdateTransaction] = useState(false);
    const [formUpdate, setFormUpdate] = useState({ ...defaultFormRegister });
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [emailData, setEmailData] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [telephone, setTelephone] = useState('');
    const [openModalDeleteAccount, setOpenModalDeleteAccount] = useState(false);

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
            setBalance,
            openModalWithdraw,
            setOpenModalWithdraw,
            showPasswordWithdraw,
            setShowPasswordWithdraw,
            valueWithdraw,
            setValueWithdraw,
            passwordWithdraw,
            setPasswordWithdraw,
            openModalTransfer,
            setOpenModalTransfer,
            showPasswordTransfer,
            setShowPasswordTransfer,
            destinationAccountNumber,
            setDestinationAccountNumber,
            valueTransfer,
            setValueTransfer,
            passwordTransfer,
            setPasswordTransfer,
            openModalUpdate,
            setOpenModalUpdate,
            showPasswordUpdateApp,
            setShowPasswordUpdateApp,
            showPasswordUpdateTransaction,
            setShowPasswordUpdateTransaction,
            defaultFormUpdate,
            formUpdate,
            setFormUpdate,
            id,
            setId,
            name,
            setName,
            cpf,
            setCpf,
            emailData,
            setEmailData,
            dateOfBirth,
            setDateOfBirth,
            telephone,
            setTelephone,
            openModalDeleteAccount,
            setOpenModalDeleteAccount
        }}>
            {children}
        </GlobalContext.Provider>
    );
}