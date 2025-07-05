import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { useProductService } from "../services/productService";
import { Product } from "../types/Product";
import CategoryBar from "../components/CategoryBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.tsx";
import { useCart } from "../contexts/CartContext";
import ImageCarousel from "../components/ImageCarousel.tsx";

const HomePage = () => {
    const { addToCart } = useCart();
    const { getProducts } = useProductService();

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        console.log("🔍 Llamando getProducts...");
        getProducts()
            .then((data) => {
                console.log("✅ Productos recibidos:", data);
                if (mounted) {
                    setProducts(data);
                    setFilteredProducts(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error("❌ Error en getProducts:", err);
                setError("No se pudieron cargar los productos");
                setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [getProducts]);


    const handleAddToCart = (product: Product) => {
        addToCart(product);
    };

    const handleSearch = (query: string) => {
        if (!query.trim()) {
            setFilteredProducts(products);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const result = products.filter((p) =>
            p.nombre.toLowerCase().includes(lowerQuery) // 👈 corregido: p.nombre en lugar de p.name
        );

        setFilteredProducts(result);
    };

    return (
        <>
            <Navbar
                suggestions={products.map((p) => p.nombre)} // 👈 corregido: p.nombre
                onSearch={handleSearch}
            />

            <CategoryBar />

            <div className="w-full">
                <ImageCarousel />
            </div>

            <div className="max-w-7xl mx-auto py-10 px-4">
                {loading && <p className="text-center text-gray-400">Cargando productos...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && (
                    <ProductList
                        products={filteredProducts}
                        onAddToCart={handleAddToCart}
                    />
                )}
            </div>

            <Footer />
        </>
    );
};

export default HomePage;
