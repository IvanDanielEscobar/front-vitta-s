'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // Cargar carrito al iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem('vittas-cart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    // Guardar cambios
    useEffect(() => {
        localStorage.setItem('vittas-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (producto) => {
        setCart((prev) => {
            const exists = prev.find(item => item.id === producto.id);
            if (exists) return prev; // Evitamos duplicados si es talle único
            return [...prev, { ...producto, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((acc, item) => acc + item.precio, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isOpen, setIsOpen, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

// Esta es la línea clave que permite usar el carrito en otros archivos
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};
