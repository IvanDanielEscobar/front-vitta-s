'use client';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartToast() {
    const { cart, setIsOpen } = useCart();
    const [show, setShow] = useState(false);
    const [lastItem, setLastItem] = useState(null);

    useEffect(() => {
        if (cart.length > 0) {
            setLastItem(cart[cart.length - 1]);
            setShow(true);
            
            const timer = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timer);
            }
    }, [cart]);
    
    if (!show || !lastItem) return null;

    return (
        <div className="fixed top-24 right-6 z-[110] animate-slide-in pointer-events-auto">
            <div className="bg-vittas-brown text-vittas-white p-4 shadow-xl border border-vittas-sand/20 min-w-[280px]">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Añadido a la bolsa</p>
                        <h4 className="font-serif italic text-sm">{lastItem.nombre}</h4>
                    </div>
                    <button 
                        onClick={() => { setIsOpen(true); setShow(false); }}
                        className="text-[9px] uppercase tracking-widest border-b border-vittas-sand pb-0.5 hover:text-vittas-sand transition-colors"
                    >
                        Ver bolsa
                    </button>
                </div>
            </div>
        </div>
);
}