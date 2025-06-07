import React, { useState } from 'react';

interface RegisterFormProps {
    onSuccessTransition: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccessTransition }) => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const camposValidos = nombre && correo && contrasena;
        if (camposValidos) {
            onSuccessTransition();
        } else {
            alert('Por favor completa todos los campos.');
        }
    };

    return (
        <div className="w-full max-w-xs">
            <h2 className="text-2xl font-bold mb-6 text-center text-pink">Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-text">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full px-4 py-2 border border-graylight rounded focus:outline-none focus:ring-2 focus:ring-pink"
                        placeholder="Tu nombre"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-text">Correo</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="w-full px-4 py-2 border border-graylight rounded focus:outline-none focus:ring-2 focus:ring-pink"
                        placeholder="correo@ejemplo.com"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1 text-text">Contraseña</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        className="w-full px-4 py-2 border border-graylight rounded focus:outline-none focus:ring-2 focus:ring-pink"
                        placeholder="********"
                    />
                </div>
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
