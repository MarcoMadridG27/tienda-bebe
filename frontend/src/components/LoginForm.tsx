import React from 'react';

const LoginForm = () => {
    return (
        <div className="w-full max-w-xs">
            <h2 className="text-2xl font-bold mb-6 text-center text-pink">Iniciar Sesión</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-text">Correo</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-graylight rounded focus:outline-none focus:ring-2 focus:ring-pink"
                        placeholder="correo@ejemplo.com"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1 text-text">Contraseña</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border border-graylight rounded focus:outline-none focus:ring-2 focus:ring-pink"
                        placeholder="********"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-pink text-white py-2 rounded hover:bg-mint transition"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
