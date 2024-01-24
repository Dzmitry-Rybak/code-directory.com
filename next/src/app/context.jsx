"use client"
import { createContext, useContext, useState } from 'react';

// Used to wrap the root level of the application and provide context values to all nested components.
const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [burgerToggle, setBurgerToggle] = useState(false);
    
    const onToggleBurger = () => {
        setBurgerToggle(state => !state);
    }

    return (
        <AppStateContext.Provider value={{ burgerToggle, onToggleBurger }}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    return useContext(AppStateContext); // useContext extracts values from the context.
};
