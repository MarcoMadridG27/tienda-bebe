import React from 'react';
import { Product } from '../types/Product';

interface Props {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
    return (
        <div className="bg-base rounded-2xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center text-center border border-graylight hover:shadow-xl transition">
            {/* Imagen del producto */}
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-40 h-40 object-contain mb-4"
            />

            {/* Marca fija o futura propiedad */}
            <p className="text-mint text-sm font-medium mb-1">Medela</p>

            {/* Nombre del producto */}
            <h3 className="text-lg font-semibold text-text leading-snug mb-1">
                {product.name}
            </h3>

            {/* Descripción opcional */}
            {product.description && (
                <p className="text-graylight text-sm mb-3">{product.description}</p>
            )}

            {/* Precio con estilo destacado */}
            <p className="text-pink font-bold text-lg mb-4">
                S/. {product.price.toFixed(2)}
            </p>

            {/* Botón de añadir al carrito */}
            <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-mint hover:bg-mint/90 text-white font-semibold py-2 rounded-lg transition"
            >
                Añadir al carrito
            </button>
        </div>
    );
};

export default ProductCard;
