import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaPhone } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-base w-full text-sm text-text mt-20">
            {/* Newsletter */}
            <div className="text-center py-8 px-4">
                <h2 className="text-xl font-semibold text-pink">Suscríbete a nuestro Newsletter</h2>
                <p className="text-sm text-graylight mb-4">Sé el primero en enterarte de novedades y ofertas especiales.</p>
                <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Escribe tu correo electrónico"
                        className="flex-1 px-4 py-2 rounded border border-graylight focus:outline-none"
                    />
                    <button className="bg-pink text-white px-4 py-2 rounded hover:bg-pink/90 transition">
                        Unirme
                    </button>
                </div>
            </div>

            {/* Secciones en grid */}
            <div className="w-full bg-base px-8 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-auto max-w-screen-xl">
                    {/* Acerca de */}
                    <div>
                        <h3 className="text-mint font-bold mb-2">ACERCA DE</h3>
                        <p className="text-sm">
                            En NidoBebé buscamos el bienestar de mamás y bebés, ofreciendo productos seguros, prácticos y amorosos para su cuidado diario.
                        </p>
                        <div className="flex gap-3 mt-4 text-xl text-gray-500">
                            <FaFacebookF className="hover:text-blue-500" />
                            <FaInstagram className="hover:text-pink" />
                            <FaYoutube className="hover:text-red-500" />
                            <FaTiktok className="hover:text-black" />
                        </div>
                    </div>

                    {/* Nosotros */}
                    <div>
                        <h3 className="text-mint font-bold mb-2">NOSOTROS</h3>
                        <ul className="space-y-1">
                            <li>Sobre nosotros</li>
                            <li>Mi cuenta</li>
                            <li>Mis pedidos</li>
                            <li>Novedades</li>
                            <li>Lo más vendido</li>
                            <li>Ubica nuestras tiendas</li>
                        </ul>
                    </div>

                    {/* Políticas */}
                    <div>
                        <h3 className="text-mint font-bold mb-2">POLÍTICAS</h3>
                        <ul className="space-y-1">
                            <li>Políticas de privacidad</li>
                            <li>Términos y Condiciones</li>
                            <li>Política de Devoluciones</li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h3 className="text-mint font-bold mb-2">DATOS DE CONTACTO</h3>
                        <p className="flex items-center gap-2 text-pink font-medium">
                            <FaPhone /> (+51) 953 376 448
                        </p>
                        <p className="mt-1 text-sm">Ubica nuestras tiendas</p>
                    </div>
                </div>
            </div>

            {/* Línea inferior */}
            <div className="bg-mint text-white text-xs text-center py-3 w-full">
                Copyright © {new Date().getFullYear()} <span className="font-bold">NidoBebé</span> | Todos los derechos reservados | Desarrollado por <span className="font-semibold">NidoBebé Team</span>
            </div>
        </footer>
    );
};

export default Footer;
