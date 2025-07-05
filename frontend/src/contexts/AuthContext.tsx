// contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// Tipado del contexto
interface AuthContextType {
    token: string | null;
    tenantId: string | null;
    login: (token: string, tenantId: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [tenantId, setTenantId] = useState<string | null>(localStorage.getItem('tenant_id'));

    const login = (newToken: string, newTenant: string) => {
        setToken(newToken);
        setTenantId(newTenant);
        localStorage.setItem('token', newToken);
        localStorage.setItem('tenant_id', newTenant);
    };

    const logout = () => {
        setToken(null);
        setTenantId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tenant_id');
    };

    return (
        <AuthContext.Provider value={{ token, tenantId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};
