"use client"
import { createContext, useContext, useState } from 'react';

// Used to wrap the root level of the application and provide context values to all nested components.
const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [burgerToggle, setBurgerToggle] = useState(false);
    
    const [isCodeAdded, setIsCodeAdded] = useState(false);
    
    const onToggleBurger = () => {
        setBurgerToggle(state => !state);
    }

    const onCodeAdded = (state) => {
        setIsCodeAdded(state);
    }

    return (
        <AppStateContext.Provider value={{ burgerToggle, onToggleBurger, onCodeAdded, isCodeAdded }}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    return useContext(AppStateContext); // useContext extracts values from the context.
};
