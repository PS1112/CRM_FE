import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const navigate = useNavigate();
    const value = useMemo(() => ({ navigate }), [navigate]);
    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    return useContext(NavigationContext);
};
