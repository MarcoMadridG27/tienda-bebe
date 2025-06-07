import { useCart } from "../contexts/CartContext";
import { FiX } from "react-icons/fi";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const formatPrice = (price: number) => `S/ ${price.toFixed(2)}`;
    const oldPrice = (price: number) => `S/ ${(price * 1.43).toFixed(2)}`;
    const shorten = (text: string, max: number) =>
        text.length > max ? text.slice(0, max) + "..." : text;

    return (
        <div
            className={`fixed top-0 right-0 w-[370px] h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out flex flex-col ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-graylight">
                <div>
                    <h2 className="text-lg font-bold text-pink">Carrito de Compras</h2>
                    <p className="text-sm text-graylight">{cart.length} item{cart.length !== 1 && "s"}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-pink">
                    <FiX size={22} />
                </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {cart.length === 0 ? (
                    <p className="text-center text-graylight mt-20">Tu carrito está vacío 🛒</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-3 gap-3 border-graylight">
                            <img
                                src={item.image || "/placeholder.jpg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md bg-graylight"
                            />
                            <div className="flex-1 text-sm text-text">
                                <p className="font-medium">{shorten(item.name, 40)}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="line-through text-gray-400 text-xs">{oldPrice(item.price)}</span>
                                    <span className="text-pink font-bold text-sm">{formatPrice(item.price)}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        className="w-6 h-6 rounded-full border text-sm text-gray-600 hover:bg-graylight"
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    >
                                        −
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="w-6 h-6 rounded-full border text-sm text-gray-600 hover:bg-graylight"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Recomendaciones */}
            <div className="px-5 pt-3 pb-2 border-t border-graylight">
                <h3 className="text-center text-mint font-semibold text-sm mb-3">🔥 Los + vendidos 🔥</h3>
                <div className="flex gap-3">
                    <img src="/demo-product.png" className="w-16 h-16 rounded bg-graylight object-cover" />
                    <div className="text-sm text-text">
                        <p className="font-medium mb-1">Pack Mamá Power Rosado</p>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="line-through text-gray-400">S/ 869.70</span>
                            <span className="bg-mint text-white px-2 py-0.5 rounded">S/ 695.76</span>
                        </div>
                        <button className="text-pink underline text-xs mt-1">Detalles</button>
                    </div>
                </div>
            </div>

            {/* Totales */}
            <div className="px-5 py-4 border-t border-graylight bg-white">
                <div className="flex justify-between text-sm text-graylight mb-1">
                    <span>Total parcial</span>
                    <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between font-bold text-blue text-base mb-4">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                </div>
                <button className="w-full bg-pink hover:bg-[#ec9db5] text-white py-2 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition">
                    Ver carrito
                    <img src="/whatsapp-icon.png" alt="whatsapp" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default CartDrawer;
