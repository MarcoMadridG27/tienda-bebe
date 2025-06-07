import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import SearchBar from "./SearchBar";
import CartDrawer from "./CartDrawer";
import { useCart } from "../contexts/CartContext";

interface NavbarProps {
    suggestions: string[];
    onSearch: (query: string) => void;
}

const Navbar = ({ suggestions, onSearch }: NavbarProps) => {
    const [showCart, setShowCart] = useState(false);
    const { cart } = useCart();

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <div className="bg-base border-b border-lavender text-text shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-mint font-serif">
                        Nido<span className="text-pink">Bebé</span>
                    </Link>

                    <div className="flex-1 mx-10">
                        <SearchBar suggestions={suggestions} onSearch={onSearch} />
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                        <div className="text-right">
                            <p className="text-xs text-graylight font-semibold">Whatsapp :</p>
                            <p className="text-mint text-sm font-semibold">📞 953 376 448</p>
                        </div>

                        <Link to="/regalos" className="flex items-center gap-1 text-lavender hover:text-pink">
                            <FiHeart size={18} />
                            Lista de regalos
                        </Link>

                        <Link to="/login" className="flex items-center gap-1 text-lavender hover:text-pink">
                            <FiUser size={18} />
                            Registrarse
                        </Link>

                        <button
                            onClick={() => setShowCart(true)}
                            className="relative flex items-center text-lavender hover:text-pink"
                        >
                            <FiShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink text-white text-xs rounded-full px-1">
                                    {cartCount}
                                </span>
                            )}
                            <span className="ml-1">Carro</span>
                        </button>
                    </div>
                </div>
            </div>

            <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
        </>
    );
};

export default Navbar;
