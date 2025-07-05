import { API_BASE } from './api';

export const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/usuario/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return res.json();
};

export const signup = async (user: any) => {
    const res = await fetch(`${API_BASE}/usuario/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return res.json();
};

export const validarToken = async (token: string) => {
    const res = await fetch(`${API_BASE}/usuario/validar`, {
        method: 'POST',
        headers: { 'Authorization': token }
    });
    return res.json();
};
