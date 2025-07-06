import { API_BASE } from './api';

export interface AuthResponse {
  token: string;
  tenant_id: string;
  user_id: string;
}

export async function signUp(
  tenant_id: string,
  user_id: string,
  password: string
): Promise<AuthResponse> {
  const resp = await fetch(`${API_BASE}/usuario/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tenant_id, user_id, password }),
  });
  if (!resp.ok) throw new Error(`Sign-up failed (${resp.status})`);
  return (await resp.json()) as AuthResponse;
}

export async function login(
  tenant_id: string,
  user_id: string,
  password: string
): Promise<AuthResponse> {
  const resp = await fetch(`${API_BASE}/usuario/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tenant_id, user_id, password }),
  });
  if (!resp.ok) throw new Error(`Login failed (${resp.status})`);
  return (await resp.json()) as AuthResponse;
}

export const validarToken = async (token: string) => {
    const res = await fetch(`${API_BASE}/usuario/validar`, {
        method: 'POST',
        headers: { 'Authorization': token }
    });
    return res.json();
};
