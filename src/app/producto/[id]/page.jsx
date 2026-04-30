'use client';
import { useState, use } from 'react';
import { productMock } from '@/lib/productos';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductoDetalle({ params }) {
    const { id } = use(params);
    const producto = productMock.find(p => p.id === parseInt(id));
    const [imagenActiva, setImagenActiva] = useState(producto?.imagenes[0]);
    const { addToCart } = useCart();
    const [ talleSeleccionado, setTalleSeleccionado ] = useState(null);


    if (!producto) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center font-serif text-vittas-brown">
                <h2 className="text-2xl opacity-50 italic">Prenda no encontrada</h2>
                <Link href="/categoria/todas" className="mt-4 text-xs uppercase tracking-widest border-b border-vittas-sand">
                    Volver al catálogo
                </Link>
            </div>
        );
    }

    // Filtramos para mostrar hasta 4 productos relacionados más pequeños
    const relacionados = productMock
        .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
        .slice(0, 4);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 animate-fade-in text-vittas-brown">
            {/* SECCIÓN PRINCIPAL (Sin cambios en tamaño) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-32">
                <div className="space-y-4">
                    <div className="relative aspect-[3/4] bg-vittas-beige overflow-hidden">
                        <Image
                            src={imagenActiva}
                            alt={producto.nombre}
                            fill
                            className="object-cover transition-opacity duration-500"
                            priority
                        />
                    </div>
                    {producto.imagenes.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {producto.imagenes.map((img, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setImagenActiva(img)}
                                    className={`relative aspect-square overflow-hidden border ${
                                        imagenActiva === img ? 'border-vittas-brown' : 'border-transparent'
                                    }`}
                                >
                                    <Image src={img} alt="Thumb" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-center">
                    <nav className="text-[10px] uppercase tracking-[0.3em] mb-8 opacity-50">
                        <Link href="/">Inicio</Link> /
                        <Link href={`/categoria/${producto.categoria.toLowerCase()}`} className="ml-2">
                            {producto.categoria}
                        </Link>
                    </nav>
                    <h1 className="font-serif text-5xl mb-2">{producto.nombre}</h1>
                    <p className="text-2xl mb-8 font-light italic">${producto.precio.toLocaleString('es-AR')}</p>
                    
                    <div className="border-y border-vittas-beige py-8 mb-8">
                        <p className="text-sm leading-relaxed opacity-80 mb-4">{producto.descripcion}</p>
                        <div className="space-y-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-vittas-brown">
                                {producto.es_talle_unico ? 'Talle Único • Exclusivo' : 'Seleccionar Talle'}
                            </p>

                            {!producto.es_talle_unico && (
                                <div className="flex flex-wrap gap-3">
                                    {producto.talles.map((talle) => (
                                        <button
                                            key={talle}
                                            onClick={() => setTalleSeleccionado(talle)}
                                            className={`
                                                min-w-[45px] h-[45px] px-3 text-[10px] border transition-all duration-300
                                                ${talleSeleccionado === talle 
                                                    ? 'bg-vittas-brown text-white border-vittas-brown' 
                                                    : 'bg-transparent text-vittas-brown border-vittas-beige hover:border-vittas-brown'}
                                            `}
                                        >
                                            {talle}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {producto.es_talle_unico && (
                                <div className="inline-block px-6 py-3 border border-vittas-brown text-vittas-brown text-[10px] uppercase tracking-widest bg-vittas-beige/30">
                                    U (Único)
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <button onClick={() => addToCart(producto)} className="w-full bg-vittas-brown text-white py-5 text-[10px] uppercase tracking-[0.3em] hover:bg-vittas-sand transition-all">
                            Añadir a la bolsa
                        </button>
                        <Link 
                            href={`https://wa.me/549358XXXXXXX?text=Consulta por: ${producto.nombre}`}
                            target="_blank"
                            className="w-full border border-vittas-brown flex items-center justify-center py-5 text-[10px] uppercase tracking-[0.3em] hover:bg-vittas-beige/10 transition-all"
                        >
                            WhatsApp
                        </Link>
                    </div>
                </div>
            </div>
            {/* SECCIÓN RELACIONADOS */}
            {relacionados.length > 0 && (
                <section className="border-t border-vittas-beige pt-16 mt-16">
                    <h3 className="font-serif text-xl mb-10 italic opacity-70">
                        También te puede gustar
                    </h3>
                        <div className="flex flex-wrap justify-start gap-8">
                        {relacionados.map((item) => (
                            <div key={item.id} className="w-[200px] flex-none"> 
                                <ProductCard producto={item} />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>  
    );        
}