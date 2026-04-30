import { productMock } from '@/lib/productos'; // Asegúrate de que la ruta a tu data sea correcta
import ProductCard from '@/components/ProductCard';
import { Suspense } from 'react';

async function ListaProductos({searchParams}) {
    const params = await searchParams;

    const query = params?.search?.toLowerCase() || "";
    const productosFiltrados = productMock.filter( p =>
        p.nombre.toLowerCase().includes(query) ||
        p.categoria.toLowerCase().includes(query) ||
        p.descripcion.toLowerCase().includes(query)
    );
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                ))
            ) : (
                <div className="col-span-full text-center py-20">
                    <p className="text-vittas-brown/60 uppercase tracking-widest text-[10px]">
                        No se encontraron prendas para "{query}"
                    </p>
                </div>
            )}
        </div>
    );
}

export default function PrendasPage({ searchParams }) {
    return (
        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <header className="mb-12 text-center">
                <h1 className="font-serif text-4xl text-vittas-brown italic mb-4">
                    Catálogo Vittas
                </h1>
            </header>

            <Suspense fallback={<p className="text-center">Cargando colección...</p>}>
                <ListaProductos searchParams={searchParams} />
            </Suspense>
        </main>
    );
}