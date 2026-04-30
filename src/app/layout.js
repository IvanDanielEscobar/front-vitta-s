import './globals.css';
import Navbar from '@/components/Navbar';
import { Playfair_Display, Inter } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import CartToast from '@/components/CartToast';

// Configuración de fuentes
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair-display',
  weight: ['400', '600', '700'] 
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['300', '400', '600'] 
});

export const metadata = {
  title: 'VITTAS | Estilo Italiano en Río Cuarto',
  description: 'Indumentaria femenina elegante con la mejor calidad y estilo italiano.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <CartToast />
          <CartDrawer />
          <footer className="py-10 border-t border-vittas-beige text-center text-[10px] uppercase tracking-widest opacity-60">
            © 2026 VITTAS - Río Cuarto, Argentina.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}


