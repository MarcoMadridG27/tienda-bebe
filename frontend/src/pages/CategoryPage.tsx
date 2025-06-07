import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import { Product } from '../types/Product';
import Navbar from '../components/Navbar';
import CategoryBar from '../components/CategoryBar';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import CategoryFilter from '../components/CategoryFilter';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [filtered, setFiltered] = useState<Product[]>([]);

    const [ageCounts, setAgeCounts] = useState<Record<string, number>>({});
    const [genderCounts, setGenderCounts] = useState<Record<string, number>>({});
    const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});
    const [availabilityCounts, setAvailabilityCounts] = useState<Record<string, number>>({});

    const [filters, setFilters] = useState({
        age: [] as string[],
        gender: [] as string[],
        price: [0, 2000] as [number, number],
        type: [] as string[],
        availability: [] as string[]
    });

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    // Aplicar filtros y actualizar conteos por categoría
    useEffect(() => {
        const filteredByCategory = products.filter(p =>
            p.category?.toLowerCase() === categoryName?.toLowerCase()
        );

        const countByCategory = (key: keyof Product): Record<string, number> => {
            const counts: Record<string, number> = {};
            filteredByCategory.forEach(p => {
                const val = p[key];
                if (val) {
                    counts[val] = (counts[val] || 0) + 1;
                }
            });
            return counts;
        };

        setAgeCounts(countByCategory('age'));
        setGenderCounts(countByCategory('gender'));
        setTypeCounts(countByCategory('type'));
        setAvailabilityCounts(countByCategory('availability'));

        const result = filteredByCategory.filter(p => {
            const inPrice = p.price >= filters.price[0] && p.price <= filters.price[1];
            const matchAge = filters.age.length === 0 || filters.age.includes(p.age || '');
            const matchGender = filters.gender.length === 0 || filters.gender.includes(p.gender || '');
            const matchType = filters.type.length === 0 || filters.type.includes(p.type || '');
            const matchAvailability = filters.availability.length === 0 || filters.availability.includes(p.availability || '');

            return inPrice && matchAge && matchGender && matchType && matchAvailability;
        });

        setFiltered(result);
    }, [filters, products, categoryName]);

    return (
        <>
            <Navbar suggestions={products.map(p => p.name)} onSearch={() => {}} />
            <CategoryBar />

            <div className="max-w-7xl mx-auto px-4 py-10 flex gap-8">
                <div className="w-72 shrink-0">
                    <CategoryFilter
                        products={products}
                        selectedAge={filters.age}
                        selectedGender={filters.gender}
                        selectedType={filters.type}
                        selectedAvailability={filters.availability}
                        priceRange={filters.price}
                        ageCounts={ageCounts}
                        genderCounts={genderCounts}
                        typeCounts={typeCounts}
                        availabilityCounts={availabilityCounts}
                        availableOptions={{
                            age: ageCounts,
                            gender: genderCounts,
                            type: typeCounts,
                            availability: availabilityCounts
                        }}
                        onFilterChange={setFilters}
                        onApply={() => {}}
                    />
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-6 text-pink-600 capitalize">
                        {categoryName?.replace(/-/g, ' ')}
                    </h1>
                    <ProductList
                        products={filtered}
                        onAddToCart={(p) => console.log('Carrito:', p)}
                    />
                </div>
            </div>

            <Footer />
        </>
    );
};

export default CategoryPage;
