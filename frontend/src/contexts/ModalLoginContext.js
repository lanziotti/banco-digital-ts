import { createContext, useState } from 'react';

export const ModalLoginContext = createContext();

export function ModalLoginContextProvider({ children }) {
    const [openModalLogin, setOpenModalLogin] = useState(false);

    return (
        <ModalLoginContext.Provider value={{ openModalLogin, setOpenModalLogin }}>
            {children}
        </ModalLoginContext.Provider>
    );
}