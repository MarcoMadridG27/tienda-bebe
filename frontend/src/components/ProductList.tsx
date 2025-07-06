// src/components/ProductList.tsx
import React from 'react'
import ProductCard from './ProductCard'
import type { Product } from '../types/Product'

interface Props { products: Product[]; onAddToCart: (p:Product)=>void }

const ProductList: React.FC<Props> = ({ products, onAddToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
    {products.map(p => (
      <ProductCard key={p.producto_id} product={p} onAddToCart={onAddToCart} />
    ))}
  </div>
)

export default ProductList
