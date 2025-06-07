import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { getProducts } from "../services/productService";
import { Product } from "../types/Product";
import CategoryBar from '../components/CategoryBar';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer.tsx";
import { useCart } from "../contexts/CartContext";
import ImageCarousel from "../components/ImageCarousel.tsx"; // ⬅️ Importa el contexto

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const { addToCart } = useCart(); // ⬅️ Usa addToCart del contexto

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            setFilteredProducts(data);
        });
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart(product); // ⬅️ Añade el producto al carrito
    };

    const handleSearch = (query: string) => {
        if (query.trim() === "") {
            setFilteredProducts(products);
            return;
        }

        const result = products.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(result);
    };

    return (
        <>
            <Navbar
                suggestions={products.map((p) => p.name)}
                onSearch={handleSearch}
            />

            <CategoryBar />
            <div className="w-full">
                <ImageCarousel />
            </div>
            {/* Contenido principal */}
            <div className="max-w-7xl mx-auto py-10 px-4">
                <ProductList
                    products={filteredProducts}
                    onAddToCart={handleAddToCart}
                />
            </div>

            {/* ✅ Footer fuera del contenedor limitado */}
            <Footer />
        </>
    );
};

export default HomePage;
