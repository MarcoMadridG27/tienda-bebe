import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "../types/Product";

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (producto_id: string) => void;
    clearCart: () => void;
    updateQuantity: (producto_id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const tenantId = localStorage.getItem("tenant_id");
    const STORAGE_KEY = `cart_${tenantId}`;
    const [cart, setCart] = useState<CartItem[]>([]);

    // Cargar carrito al iniciar
    useEffect(() => {
        if (tenantId) {
            const storedCart = localStorage.getItem(STORAGE_KEY);
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        }
    }, [tenantId]);

    // Guardar en localStorage cada vez que cambia el carrito
    useEffect(() => {
        if (tenantId) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        }
    }, [cart, tenantId]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.producto_id === product.producto_id);
            if (existing) {
                return prev.map((item) =>
                    item.producto_id === product.producto_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (producto_id: string) => {
        setCart((prev) => prev.filter((item) => item.producto_id !== producto_id));
    };

    const updateQuantity = (producto_id: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.producto_id === producto_id
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};
