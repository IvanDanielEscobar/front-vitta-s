// src/app/categoria/[slug]/page.jsx

import { productMock } from '@/lib/productos'; 
import ProductCard from '@/components/ProductCard'; 

export default async function CategoriaPage({ params }) {
// En Next.js 15+ params es una Promise que debe ser resuelta
const { slug } = await params;
const productosFiltrados = slug === 'todas' 
    ? productMock 
    : productMock.filter(p => p.categoria.toLowerCase() === slug.toLowerCase());
const tituloPagina = slug.replace(/-/g, ' ');
return (
    <div className="max-w-7xl mx-auto px-6 py-16">
        <header className="mb-12 border-b border-vittas-beige pb-8">
            <h1 className="font-serif text-4xl text-vittas-brown capitalize italic">
                {tituloPagina}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] mt-2 opacity-60">
                Vittas • Selección {slug === 'todas' ? 'Completa' : 'Exclusiva'}
            </p>
        </header>

        {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {productosFiltrados.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
            </div>
        ) : (
            <div className="py-20 text-center font-serif opacity-40">
                No hay productos disponibles en esta categoría.
            </div>
        )}
    </div>
);
}