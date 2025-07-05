import React from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface Props {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<Props> = ({ products, onAddToCart }) => {
    if (!products || products.length === 0) {
        return (
            <div className="text-center text-gray-400 p-10" aria-live="polite">
                No se encontraron productos disponibles.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
            {products.map((p) => (
                <ProductCard key={p.producto_id} product={p} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductList;
