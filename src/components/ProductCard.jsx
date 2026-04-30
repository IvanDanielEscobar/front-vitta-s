import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ producto }) {
    const imagenPrincipal = producto.imagenes?.[0] || "/next.svg";

return (
    <Link href={`/producto/${producto.id}`} className="group">
        <div className="relative aspect-[3/4] overflow-hidden bg-vittas-beige">
            <Image
                src={imagenPrincipal}
                alt={producto.nombre}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        <div className="mt-4">
            <h3 className="text-sm uppercase tracking-widest text-vittas-brown">{producto.nombre}</h3>
            <p className="text-sm font-medium mt-1">${producto.precio.toLocaleString('es-AR')}</p>
        </div>
    </Link>
);
}