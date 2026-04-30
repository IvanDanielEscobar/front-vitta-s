'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';




export default function Navbar() {
    const { setIsOpen, cart } = useCart()
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const [ isSearchOpen, setIsSearchOpen ] = useState(false);
    const [ searchQuery, setSearchQuery ] = useState("");

    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            router.push(`/categoria/prendas?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
            setIsSearchOpen(false);
        }};

return (
    <nav className="border-b border-vittas-beige bg-vittas-nav backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
          {/* Menu Izquierda (Desktop) */}
                <div className="hidden md:flex space-x-8 text-vittas-brown">
                    <Link href="/categoria/nueva-coleccion" className="text-s hover:scale-105 duration-400 uppercase tracking-[0.2em] hover:text-vittas-sand transition-colors font-sans">
                        Colección
                    </Link>
                    <Link href="/categoria/prendas" className="text-s hover:scale-105 duration-400 uppercase tracking-[0.2em] hover:text-vittas-sand transition-colors font-sans">
                        Prendas
                    </Link>
                </div>
                {/* Logo Central */}
                <div className="flex flex-col items-center text-center">
                    <Link href="/" className="font-serif text-4xl tracking-tighter text-vittas-brown">
                        VITTAS
                    </Link>
                    <p className="text-[12px] text-vittas-brown uppercase tracking-[0.3em] -mt-1 hidden md:block">Estilo Italiano</p>
                </div>
                {/* Iconos Derecha */}
                <div className="flex items-center space-x-5 text-vittas-brown">
                    <div className="relative flex items-center">
                        {/* Botón de Lupa */}
                        <button 
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="hover:text-vittas-sand transition-all hover:scale-110 z-50" 
                            aria-label="Abrir buscador"
                        >
                            <span className="sr-only">Buscar</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Input Deslizable (Aparece al hacer clic) */}
                        <div className={`
                            absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out flex items-center
                            ${isSearchOpen ? 'w-64 opacity-100 pr-10' : 'w-0 opacity-0 pointer-events-none'}
                        `}>
                            <form onSubmit={handleSearch} className="w-full">
                                <input 
                                    type="text"
                                    placeholder="Buscar en Vittas..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-b border-vittas-brown/30 py-1 text-[10px] uppercase tracking-widest focus:outline-none focus:border-vittas-brown text-vittas-brown placeholder:text-vittas-brown/40"
                                />
                            </form>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsOpen(true)} 
                        className="hover:text-vittas-sand transition-colors hover:scale-110 relative flex items-center"
                        aria-label="Abrir bolsa de compras"
                    >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="1.2" 
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                        />
                    </svg>

                    {/* Badge dinámico: solo se muestra si hay items */}
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-vittas-sand text-[8px] text-white rounded-full w-3 h-3 flex items-center justify-center font-sans animate-fade-in">
                            {totalItems}
                        </span>
                    )}
                </button>
                </div>
            </div>
        </div>
    </nav>
    );
}