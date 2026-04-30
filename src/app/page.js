import Link from 'next/link';
import Image from 'next/image';
import { productMock } from '@/lib/productos';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  // Filtramos para mostrar variedad en la Home
  const vestidosDestacados = productMock.filter(p => p.categoria === "Vestidos").slice(0, 4);
  const calzadoNovedades = productMock.filter(p => p.categoria === "Calzado").slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      
      {/*  HERO SECTION */}
      <section className="relative h-[85vh] w-full flex items-center justify-center bg-vittas-beige overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000" 
          alt="Vittas Colección Femenina 2026"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="relative z-10 text-center px-6">
          <span className="text-[10px] uppercase tracking-[0.6em] text-vittas-brown mb-4 block animate-fade-in">
            Estilo Italiano • Río Cuarto
          </span>
          <h1 className="font-serif text-6xl md:text-8xl text-vittas-brown mb-8 italic leading-tight">
            La esencia <br /> de ser mujer
          </h1>
          <Link 
            href="/categoria/todas" 
            className="inline-block bg-vittas-brown text-vittas-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-vittas-sand hover:scale-103 transition-all duration-500 shadow-lg"
          >
            Toda la Colección
          </Link>
        </div>
      </section>

      {/* MARQUEE DE BENEFICIOS (Cinta infinita) */}
      <div className="relative w-full bg-vittas-brown text-vittas-white py-3 overflow-hidden border-y border-vittas-sand/20">

        {/* El contenedor 'flex' con 'w-max' asegura que el ancho sea la suma de los 4 divs */}
        <div className="flex w-max animate-marquee-infinite uppercase text-[9px] tracking-[0.4em] whitespace-nowrap">

          <div className="px-4">
            Envíos a todo el país • Showroom en Río Cuarto • Atención Personalizada • Cuotas sin interés •
          </div>

          <div className="px-4">
            Envíos a todo el país • Showroom en Río Cuarto • Atención Personalizada • Cuotas sin interés •
          </div>

          <div className="px-4">
            Envíos a todo el país • Showroom en Río Cuarto • Atención Personalizada • Cuotas sin interés •
          </div>
        </div>
      </div>
            {/* MARQUEE DE BENEFICIOS (Cinta infinita reversa) */}
      <div className="relative w-full bg-vittas-brown text-vittas-white py-3 overflow-hidden border-y border-vittas-sand/20">

        {/* El contenedor 'flex' con 'w-max' asegura que el ancho sea la suma de los 4 divs */}
        <div className="flex w-max animate-marquee-infinite-reverse uppercase text-[9px] tracking-[0.4em] whitespace-nowrap">

          <div className="px-4">
            Envíos a todo el país • Showroom en Río Cuarto • Atención Personalizada • Cuotas sin interés •
          </div>

          <div className="px-4">
            Envíos a todo el país • Showroom en Río Cuarto • Atención Personalizada • Cuotas sin interés •
          </div>

          <div className="px-4">
            Envíos a todo el país • Showroom en Río Cuarto • Atención Personalizada • Cuotas sin interés •
          </div>
        </div>
      </div>

      {/*  SECCIÓN: VESTIDOS & ELEGANCIA */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-vittas-brown italic">Vestidos que cuentan historias</h2>
          <p className="text-[10px] uppercase tracking-widest opacity-60 mt-4">Ediciones limitadas para momentos especiales</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"> {/* Añadido margen inferior */}
          {vestidosDestacados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
        
        {/* Enlace Redirigido y Estilizado */}
        <div className="flex justify-center">
          <Link 
            href="/categoria/vestidos" 
            className="group flex flex-col items-center space-y-2"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-vittas-brown font-bold group-hover:text-vittas-sand transition-colors">
              Explorar Colección Completa
            </span>
            {/* Línea animada minimalista */}
            <div className="h-[1px] w-12 bg-vittas-brown/30 group-hover:w-24 group-hover:bg-vittas-sand transition-all duration-500" />
          </Link>
        </div>
      </section>
      
      {/*  BANNER: CALZADO URBAN CHIC */}
      <section className="grid grid-cols-1 md:grid-cols-2 bg-vittas-beige h-auto md:h-[600px]">
        <div className="relative h-80 md:h-full">
          <Image 
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000" 
            alt="Calzado Vittas"
            fill
            className="object-cover"
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>
        <div className="flex flex-col justify-center p-12 md:p-24 space-y-6">
          <h3 className="font-serif text-4xl text-vittas-brown italic">Urban Comfort</h3>
          <p className="text-sm font-light leading-relaxed opacity-80 italic">
            Nuestra línea de calzado combina la comodidad necesaria para el ritmo de la ciudad con el diseño premium que nos caracteriza. Zapatillas pensadas para completar tu look Vittas.
          </p>
              
          <div className="grid grid-cols-2 gap-4 pt-4 mb-4">
              {calzadoNovedades.slice(0, 2).map(p => (
                  <Link key={p.id} href={`/producto/${p.id}`} className="group">
                      <div className="relative aspect-square overflow-hidden mb-2">
                          <Image src={p.imagenes[0]} alt={p.nombre} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <p className="text-[9px] uppercase tracking-widest">{p.nombre}</p>
                  </Link>
              ))}
          </div>
            
          {/* Enlace a la categoría de Calzado */}
          <div className="pt-4">
            <Link 
              href="/categoria/calzado" 
              className="group inline-flex items-center space-x-4"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-vittas-brown group-hover:text-vittas-sand transition-colors">
                Ver todo el calzado
              </span>
              <div className="relative overflow-hidden w-8 h-[1px] bg-vittas-brown/30">
                <div className="absolute inset-0 bg-vittas-brown translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/*  SECCIÓN: EXPLORAR CATEGORÍAS */}
      <section className="py-24 px-6 max-w-7xl mt-40 mx-auto w-full">
        <div className="text-center mb-16 space-y-2">
            <h2 className="font-serif text-4xl text-vittas-brown italic">Explora nuestras líneas</h2>
            <div className="w-12 h-[1px] bg-vittas-brown/20 mx-auto" />
        </div>
                  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Categoría: Blusas */}
          <Link href="/categoria/blusas" className="group relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-vittas-beige shadow-sm">
            <Image 
              src="/images/blusas.png"
              fill 
              alt="Blusas Femeninas Vittas" 
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-all duration-[1.5s] group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-vittas-brown/10 group-hover:bg-vittas-brown/40 transition-all duration-500 flex flex-col items-center justify-center">
              <span className="text-white text-[10px] uppercase tracking-[0.6em] border border-white/40 px-10 py-4 backdrop-blur-[2px] transition-all duration-500 group-hover:tracking-[0.8em] group-hover:border-white">
                Blusas
              </span>
              <span className="text-white text-[8px] uppercase tracking-widest mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                Ver Colección
              </span>
            </div>
          </Link>
                  
          {/* Categoría: Pantalones */}
          <Link href="/categoria/pantalones" className="group relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-vittas-beige shadow-sm">
            <Image 
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800"  
              fill 
              alt="Pantalones y Jeans" 
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-all duration-[1.5s] group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-vittas-brown/10 group-hover:bg-vittas-brown/40 transition-all duration-500 flex flex-col items-center justify-center">
              <span className="text-white text-[10px] uppercase tracking-[0.6em] border border-white/40 px-10 py-4 backdrop-blur-[2px] transition-all duration-500 group-hover:tracking-[0.8em] group-hover:border-white">
                Pantalones
              </span>
              <span className="text-white text-[8px] uppercase tracking-widest mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                Explorar Estilos
              </span>
            </div>
          </Link>
                  
          {/* Categoría: Calzado */}
          <Link href="/categoria/calzado" className="group relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-vittas-beige shadow-sm">
            <Image 
              src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800" 
              fill 
              alt="Calzado Femenino" 
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-all duration-[1.5s] group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-vittas-brown/10 group-hover:bg-vittas-brown/40 transition-all duration-500 flex flex-col items-center justify-center">
              <span className="text-white text-[10px] uppercase tracking-[0.6em] border border-white/40 px-10 py-4 backdrop-blur-[2px] transition-all duration-500 group-hover:tracking-[0.8em] group-hover:border-white">
                Calzado
              </span>
              <span className="text-white text-[8px] uppercase tracking-widest mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                Descubrir Pasos
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}