import React from 'react';
import { Product } from '../types/Product';

interface Props {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
    const image = product.imageUrl && product.imageUrl.trim() !== ''
        ? product.imageUrl
        : '/placeholder.jpg'; // Imagen por defecto si no hay

    const disponibilidad = product.disponibilidad || 'Disponible';

    return (
        <div className="bg-base rounded-2xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center text-center border border-graylight hover:shadow-xl transition">

            {/* Imagen */}
            <img
                src={image}
                alt={product.nombre}
                onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }}
                className="w-40 h-40 object-contain mb-4"
            />

            {/* Nombre */}
            <h3 className="text-lg font-semibold text-text leading-snug mb-1">
                {product.nombre}
            </h3>

            {/* Categoría o tipo opcional */}
            {product.tipo && (
                <p className="text-xs text-gray-500 italic mb-1">{product.tipo}</p>
            )}

            {/* Descripción opcional */}
            {product.descripcion && (
                <p className="text-graylight text-sm mb-2">{product.descripcion}</p>
            )}

            {/* Edad y género sugeridos */}
            {(product.edad || product.genero) && (
                <p className="text-xs text-gray-400 mb-2">
                    {product.edad ? `Edad: ${product.edad}` : ''} {product.genero ? `| Género: ${product.genero}` : ''}
                </p>
            )}

            {/* Precio */}
            <p className="text-pink font-bold text-lg mb-3">
                S/. {product.precio.toFixed(2)}
            </p>

            {/* Botón o mensaje de disponibilidad */}
            {disponibilidad.toLowerCase() === 'disponible' ? (
                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-mint hover:bg-mint/90 text-white font-semibold py-2 rounded-lg transition"
                >
                    Añadir al carrito
                </button>
            ) : (
                <p className="text-red-500 text-sm font-semibold">No disponible</p>
            )}
        </div>
    );
};

export default ProductCard;
