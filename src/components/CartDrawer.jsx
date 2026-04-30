'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
    const { cart, isOpen, setIsOpen, removeFromCart, cartTotal } = useCart();
    const router = useRouter();

    const irAlCheckout = () => {
        router.push('/checkout');
    };


return (
        <div className={`fixed inset-0 z-[100] ${isOpen ? 'visible' : 'invisible'} transition-all duration-300`}>
            {/* Overlay */}
            <div 
                className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsOpen(false)}
            />
            {/* Panel Lateral */}
            <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                
                {/* Header */}
                <div className="p-6 flex justify-between items-center border-b border-vittas-beige">
                    <div className="flex flex-col">
                        <h2 className="text-xl italic text-vittas-brown font-serif">Tu Bolsa</h2>
                        <span className="text-[8px] uppercase tracking-widest opacity-60">Vittas Indumentaria</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
                        Cerrar
                    </button>
                </div>

                {/* Lista de Productos */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
                            <p className="text-center italic">No hay prendas seleccionadas</p>
                            <div className="w-8 h-[1px] bg-vittas-brown" />
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center group">
                                <div className="relative w-20 h-24 bg-vittas-beige overflow-hidden">
                                    <Image 
                                        src={item.imagenes[0]} 
                                        alt={item.nombre} 
                                        fill 
                                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                        sizes="80px" 
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[10px] uppercase tracking-widest text-vittas-brown font-bold">{item.nombre}</h3>
                                    <p className="text-[10px] opacity-60 mt-1">${item.precio.toLocaleString('es-AR')}</p>
                                    <button 
                                        onClick={() => removeFromCart(item.id)} 
                                        className="text-[9px] uppercase tracking-tighter text-red-800 mt-3 opacity-40 hover:opacity-100 transition-opacity underline underline-offset-4"
                                    >
                                        Quitar de la bolsa
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer del Carrito */}
                {cart.length > 0 && (
                    <div className="p-8 border-t border-vittas-beige bg-vittas-beige/5">
                        <div className="flex justify-between items-end mb-8">
                            <div className="flex flex-col">
                                <span className="text-[9px] uppercase tracking-[0.2em] opacity-60">Subtotal</span>
                                <span className="text-[9px] text-vittas-brown italic">Impuestos incluidos</span>
                            </div>
                            <span className="text-xl font-serif text-vittas-brown">${cartTotal.toLocaleString('es-AR')}</span>
                        </div>
                        
                        <button 
                            onClick={irAlCheckout}
                            className="w-full bg-vittas-brown text-white py-5 text-[10px] uppercase tracking-[0.3em] hover:bg-vittas-sand transition-all duration-300 shadow-sm active:scale-[0.98]"
                        >
                            Iniciar Compra
                        </button>
                        
                        <p className="text-center text-[8px] uppercase tracking-widest opacity-40 mt-4">
                            Envío gratis en compras superiores a $150.000
                        </p>
                    </div>
                )}
            </div>
        </div>
    ); 
}