import { productMock } from '@/lib/productos';
import ProductCard from '@/components/ProductCard';

export default function NuevaColeccionPage() {
    // Aquí podrías filtrar por una propiedad 'coleccion: "2026"' o similares
    const productMockColeccion = productMock.filter(p => p.precio > 50000); // Ejemplo: productMock premium

    return (
        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <header className="mb-12 text-center">
                <h1 className="font-serif text-4xl text-vittas-brown italic mb-4">Temporada 2026</h1>
                <p className="text-sm text-vittas-brown/60 uppercase tracking-widest">Lo nuevo de Vittas</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {productMockColeccion.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
            </div>
        </main>
    );
}