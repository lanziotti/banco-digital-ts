import { createContext, useState } from 'react';

export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
  const [openModalLogin, setOpenModalLogin] = useState(false);

    return (
        <GlobalContext.Provider
        value={{
            openModalLogin,
            setOpenModalLogin
        }}
        >
            {children}
        </GlobalContext.Provider>
    );
}