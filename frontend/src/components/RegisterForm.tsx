import React, { useState } from 'react';

interface RegisterFormProps {
    onSuccessTransition: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccessTransition }) => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [tenantId, setTenantId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!nombre || !correo || !contrasena || !tenantId) {
            setError('Por favor completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('https://3topw1rzbl.execute-api.us-east-1.amazonaws.com/dev/usuario/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tenant_id: tenantId,
                    user_id: correo,
                    password: contrasena,
                    nombre: nombre,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                onSuccessTransition();
            } else {
                setError(data.error || 'Error al registrarse');
            }
        } catch (err) {
            setError('Error del servidor');
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-xs">
            <h2 className="text-2xl font-bold mb-6 text-center text-pink">Registro</h2>
            <form onSubmit={handleSubmit}>
                {/* Tenant ID */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-text">ID de tienda (tenant)</label>
                    <input
                        type="text"
                        value={tenantId}
                        onChange={(e) => setTenantId(e.target.value)}
                        className="w-full px-4 py-2 border border-graylight rounded focus:outline-none focus:ring-2 focus:ring-pink"
                        placeholder="ej: tenant7"
                        required
                    />
                </div>

                {/* Nombre */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-text">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full px-4 py-2 border border-graylight rounded focus:outline-none focus:ring-2 focus:ring-pink"
                        placeholder="Tu nombre"
                        required
                    />
                </div>

                {/* Correo */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-text">Correo</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="w-full px-4 py-2 border border-graylight rounded focus:outline-none focus:ring-2 focus:ring-pink"
                        placeholder="correo@ejemplo.com"
                        required
                    />
                </div>

                {/* Contraseña */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1 text-text">Contraseña</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        className="w-full px-4 py-2 border border-graylight rounded focus:outline-none focus:ring-2 focus:ring-pink"
                        placeholder="********"
                        required
                    />
                </div>

                {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-pink text-white py-2 rounded hover:bg-mint transition"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
