import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthSlider = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleToggle = () => {
        if (isTransitioning) return; // evita spam de clics
        setIsTransitioning(true);

        // Espera que el slider se expanda
        setTimeout(() => {
            setShowRegister((prev) => !prev);
        }, 350); // mitad del tiempo total

        // Espera que el slider vuelva a su lugar
        setTimeout(() => {
            setIsTransitioning(false);
        }, 700); // igual que la duración de la animación (700ms)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="relative w-[768px] h-[500px] bg-white shadow-2xl rounded-xl overflow-hidden">

                {/* FORMULARIOS */}
                <div
                    className={`absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-700 ease-in-out z-10 ${
                        showRegister ? '-translate-x-1/2' : ''
                    }`}
                >
                    {/* LOGIN */}
                    <div className="w-1/2 h-full flex items-center justify-end pr-10 bg-white">
                        <LoginForm />
                    </div>

                    {/* REGISTER */}
                    <div className="w-1/2 h-full flex items-center justify-end bg-white">
                        <div className="w-full max-w-sm mr-auto ml-10">
                            <RegisterForm onSuccessTransition={() => {}} />
                        </div>
                    </div>
                </div>

                {/* ANIMACIÓN DE EXPANSIÓN */}
                <div
                    className={`absolute top-0 h-full z-20 transition-all duration-700 ease-in-out
        ${isTransitioning ? 'w-full rounded-none' : 'w-1/2'}
        ${
                        showRegister
                            ? 'left-1/2 rounded-tl-full rounded-bl-full'
                            : 'left-0 rounded-tr-full rounded-br-full'
                    }
        bg-gradient-to-br from-mint to-pink
        flex flex-col items-center justify-center text-text text-center px-10`}
                >


                    <h2 className="text-3xl font-bold mb-4">
                        {showRegister ? 'Welcome Back!' : 'Hello, Welcome!'}
                    </h2>
                    <p className="mb-6">
                        {showRegister ? 'Already have an account?' : "Don't have an account?"}
                    </p>
                    <button
                        onClick={handleToggle}
                        className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition pointer-events-auto"
                    >
                        {showRegister ? 'Login' : 'Register'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthSlider;
