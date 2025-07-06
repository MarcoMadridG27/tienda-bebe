import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';

const RegisterForm: React.FC = () => {
  const tenantId = import.meta.env.VITE_TENANT_ID || 'tenant3';
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { token, tenant_id } = await signUp(
        tenantId,
        userId,
        password
      );
      localStorage.setItem('token', token);
      localStorage.setItem('tenant_id', tenant_id);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al registrarte');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Registro</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Usuario</span>
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Contraseña</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Contraseña"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
