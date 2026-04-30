"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext'; // Asegúrate de que la ruta sea correcta

export default function CheckoutPage() {
    const { cart, cartTotal } = useCart();
    const [step, setStep] = useState(1);
    const [datos, setDatos] = useState({
        nombre: '', apellido: '', email: '', 
        telefono: '', direccion: '', cp: '',
        metodoEntrega: 'envio',
        metodoPago: 'transferencia'
    });


    const [datosPago, setDatosPago] = useState({
        alias: "VITTAS.BOUTIQUE.RC",
        cbu: "0170000000000000000000",
        titular: "Vittas Indumentaria S.A."
    });

    const finalizarCompra = () => {
    if (datos.metodoPago === 'tarjeta') {
        // Redirección a Pagos360 u otra pasarela externa
        window.location.href = "https://link.pagos360.com/vittas-checkout";
    } else {
        enviarPedidoWhatsApp();
    }
};

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const enviarPedidoWhatsApp = () => {
        const detalleProductos = cart.map(item => 
            `- ${item.nombre} x${item.quantity}: $${(item.precio * item.quantity).toLocaleString('es-AR')}`
        ).join('%0A');
    
        let mensajeBase = `Hola *Vittas*! Mi nombre es ${datos.nombre} ${datos.apellido}.%0A%0A` +
            `*Detalle del Pedido:*%0A${detalleProductos}%0A%0A` +
            `*Total:* $${cartTotal.toLocaleString('es-AR')}%0A` +
            `*Metodo de Pago:* ${datos.metodoPago.toUpperCase()}%0A`;
    
        if (datos.metodoPago === 'transferencia') {
            mensajeBase += `%0A*Datos para Transferencia:*%0AAlias: ${datosPago.alias}%0ATitular: ${datosPago.titular}%0A%0A_Adjunto comprobante a continuación..._`;
        }
    
        const whatsappUrl = `https://wa.me/5493586000456?text=${mensajeBase}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-vittas-brown">
            <header className="mb-12 text-center">
                <h1 className="font-serif text-3xl italic">Finalizar Compra</h1>
                <div className="flex justify-center space-x-4 mt-6">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`h-[2px] w-12 transition-colors ${step >= s ? 'bg-vittas-brown' : 'bg-vittas-beige'}`} />
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* FORMULARIO POR PASOS */}
                <section>
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="uppercase tracking-widest text-xs font-bold mb-8">1. Datos Personales</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} className="border-b border-vittas-beige py-2 text-xs focus:outline-none focus:border-vittas-brown bg-transparent" />
                                <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} className="border-b border-vittas-beige py-2 text-xs focus:outline-none focus:border-vittas-brown bg-transparent" />
                            </div>
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border-b border-vittas-beige py-2 text-xs focus:outline-none focus:border-vittas-brown bg-transparent" />
                            <input type="tel" name="telefono" placeholder="Teléfono" onChange={handleChange} className="w-full border-b border-vittas-beige py-2 text-xs focus:outline-none focus:border-vittas-brown bg-transparent" />
                            <div className="grid grid-cols-3 gap-4">
                                <input type="text" name="direccion" placeholder="Dirección" className="col-span-2 border-b border-vittas-beige py-2 text-xs focus:outline-none focus:border-vittas-brown bg-transparent" />
                                <input type="text" name="cp" placeholder="CP" className="border-b border-vittas-beige py-2 text-xs focus:outline-none focus:border-vittas-brown bg-transparent" />
                            </div>
                            <button onClick={() => setStep(2)} className="w-full bg-vittas-brown text-white py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-vittas-sand transition-colors">Continuar</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="uppercase tracking-widest text-xs font-bold mb-8">2. Opción de Entrega</h2>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3 cursor-pointer p-4 border border-vittas-beige">
                                    <input type="radio" name="metodoEntrega" value="envio" checked={datos.metodoEntrega === 'envio'} onChange={handleChange} />
                                    <span className="text-xs uppercase tracking-widest">Envío a domicilio</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer p-4 border border-vittas-beige">
                                    <input type="radio" name="metodoEntrega" value="retiro" checked={datos.metodoEntrega === 'retiro'} onChange={handleChange} />
                                    <span className="text-xs uppercase tracking-widest">Retiro en sucursal (Río Cuarto)</span>
                                </label>
                            </div>
                            <div className="flex space-x-4">
                                <button onClick={() => setStep(1)} className="w-1/3 border border-vittas-brown py-4 text-[10px] uppercase tracking-widest">Volver</button>
                                <button onClick={() => setStep(3)} className="w-2/3 bg-vittas-brown text-white py-4 text-[10px] uppercase tracking-widest">Siguiente</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="uppercase tracking-widest text-xs font-bold mb-8">3. Método de Pago</h2>
                                    
                        <div className="space-y-4">
                            <select 
                                name="metodoPago" 
                                value={datos.metodoPago}
                                onChange={handleChange} 
                                className="w-full border text-vittas-white border-vittas-beige p-4 text-[10px] uppercase tracking-widest bg-transparent focus:outline-none focus:border-vittas-brown"
                            >
                                <option className='bg-vittas-brown' value="transferencia">Transferencia (CBU/Alias)</option>
                                <option className='bg-vittas-brown' value="efectivo">Efectivo (Solo en local)</option>
                                <option className='bg-vittas-brown' value="tarjeta">Tarjeta de Crédito/Débito (Pagos360)</option>
                            </select>
                                    
                            {/* Cuadro informativo de Transferencia */}
                            {datos.metodoPago === 'transferencia' && (
                                <div className="bg-vittas-beige/20 text-vittas-white p-6 border border-dashed border-vittas-brown/30 space-y-2">
                                    <p className="text-[9px] uppercase tracking-widest font-bold">Datos de la cuenta:</p>
                                    <p className="text-[10px]">Alias: <span className="font-mono">{datosPago.alias}</span></p>
                                    <p className="text-[10px]">CBU: <span className="font-mono">{datosPago.cbu}</span></p>
                                    <p className="text-[10px] opacity-60 italic">Envíanos el comprobante por WhatsApp al finalizar.</p>
                                </div>
                            )}
                
                            {/* Aviso para Tarjetas */}
                            {datos.metodoPago === 'tarjeta' && (
                                <div className="p-4 border border-vittas-beige">
                                    <p className="text-[10px] opacity-70 italic text-center">
                                        Serás redirigido a la plataforma segura de Pagos360 para completar tu transacción.
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        <button 
                            onClick={finalizarCompra} 
                            className="w-full bg-vittas-brown text-white py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-vittas-sand transition-all mt-4"
                        >
                            {datos.metodoPago === 'tarjeta' ? 'Pagar con Tarjeta' : 'Confirmar Pedido'}
                        </button>
                    </div>
                )}
                </section>

                {/* RESUMEN DEL PEDIDO */}
                <aside className="bg-vittas-beige/30 text-vittas-white p-8 h-fit">
                    <h2 className="uppercase tracking-widest text-xs font-bold mb-6">Tu Pedido</h2>
                    <div className="space-y-4 mb-8">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between text-xs">
                                <span>{item.nombre} x{item.quantity}</span>
                                <span>$ {(item.precio * item.quantity).toLocaleString('es-AR')}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-vittas-brown/20 pt-4 flex justify-between font-bold">
                        <span className="text-xs uppercase">Total</span>
                        <span>$ {cartTotal.toLocaleString('es-AR')}</span>
                    </div>
                </aside>
            </div>
        </main>
    );
}