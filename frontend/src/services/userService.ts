const API_BASE = import.meta.env.VITE_API_BASE;

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/usuario/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al iniciar sesión');
    return data;
};

export const signup = async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE}/usuario/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al registrarse');
    return data;
};

export const validarToken = async (token: string) => {
    const response = await fetch(`${API_BASE}/usuario/validar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Token inválido');
    return data;
};
