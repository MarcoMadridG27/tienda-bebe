import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
    'Embarazadas',
    'Alimentación y lactancia',
    'Descanso',
    'Paseo',
    'Estimulación',
    'Higiene',
    'Juguetes',
    'Colecciones y packs',
    'Ofertas',
];

const CategoryBar: React.FC = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`w-full z-50 transition-all duration-300 ${
                isSticky
                    ? 'fixed top-0 bg-mint text-text shadow-md py-2'
                    : 'bg-lavender text-text py-3'
            }`}
        >
            <div
                className={`flex items-center justify-between px-4 ${
                    isSticky ? 'max-w-full' : 'max-w-7xl mx-auto'
                }`}
            >
                {/* Logo visible cuando está sticky */}
                {isSticky && (
                    <Link to="/" className="text-xl font-bold font-serif whitespace-nowrap">
                        <span className="text-text">Nido</span>
                        <span className="text-pink">Bebé</span>
                    </Link>
                )}

                {/* Categorías scrollable */}
                <div className="flex-1 flex gap-5 overflow-x-auto scroll-smooth whitespace-nowrap text-sm font-semibold justify-center">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            to={`/categoria/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`px-3 py-1 rounded-md transition ${
                                cat === 'Ofertas'
                                    ? 'bg-pink text-white hover:bg-pink/80'
                                    : 'hover:bg-white hover:text-pink'
                            }`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                {/* Iconos sticky: carrito y búsqueda */}
                {isSticky && (
                    <div className="flex items-center gap-4 text-text text-lg ml-4">
                        <Link to="/carrito" className="relative">
                            🛒
                            <span className="absolute -top-2 -right-2 bg-pink text-white text-xs rounded-full px-1">
                                0
                            </span>
                        </Link>
                        <Link to="/buscar">🔍</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryBar;
