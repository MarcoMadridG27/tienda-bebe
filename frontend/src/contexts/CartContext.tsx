import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { Product } from '../types/Product'

interface CartContextType {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (producto_id: string) => void
  clearCart: () => void
}

// Creamos un contexto con valores por defecto que incluyen un array vacío.
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
})

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const addToCart = (product: Product) =>
    setCartItems(prev => [...prev, product])

  const removeFromCart = (producto_id: string) =>
    setCartItems(prev =>
      prev.filter(item => item.producto_id !== producto_id)
    )

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  return useContext(CartContext)
}
