import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Product} from "../types/Product.ts";

interface FilterProps {
    selectedAge: string[],
    selectedGender: string[],
    selectedType: string[],
    selectedAvailability: string[],
    priceRange: [number, number],
    availableOptions: {
        age: Record<string, number>;
        gender: Record<string, number>;
        type: Record<string, number>;
        availability: Record<string, number>;
    },
    onFilterChange: (filters: {
        age: string[];
        gender: string[];
        type: string[];
        availability: string[];
        price: [number, number];
    }) => void,
    onApply: () => void,
    ageCounts: Record<string, number>;
    genderCounts: Record<string, number>;
    typeCounts: Record<string, number>;
    availabilityCounts: Record<string, number>;
    products?: Product[]
}

const CategoryFilter: React.FC<FilterProps> = ({
                                                   selectedAge,
                                                   selectedGender,
                                                   selectedType,
                                                   selectedAvailability,
                                                   priceRange,
                                                   availableOptions,
                                                   onFilterChange,
                                                   onApply
                                               }) => {
    const handleCheckbox = (
        value: string,
        group: 'age' | 'gender' | 'type' | 'availability'
    ) => {
        const current =
            group === 'age' ? selectedAge :
                group === 'gender' ? selectedGender :
                    group === 'type' ? selectedType :
                        selectedAvailability;

        const newValues = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];

        onFilterChange({
            age: group === 'age' ? newValues : selectedAge,
            gender: group === 'gender' ? newValues : selectedGender,
            type: group === 'type' ? newValues : selectedType,
            availability: group === 'availability' ? newValues : selectedAvailability,
            price: priceRange
        });
    };

    const handlePriceChange = (range: [number, number]) => {
        onFilterChange({
            age: selectedAge,
            gender: selectedGender,
            type: selectedType,
            availability: selectedAvailability,
            price: range
        });
    };

    return (
        <div className="w-64 pr-4 text-sm text-gray-700 space-y-6">
            {/* EDAD */}
            <div>
                <h3 className="font-semibold mb-2 text-purple-800">Edad</h3>
                {Object.entries(availableOptions.age).map(([option, count]) => (
                    <label key={option} className="block mb-1">
                        <input
                            type="checkbox"
                            className="mr-2 accent-purple-400"
                            checked={selectedAge.includes(option)}
                            onChange={() => handleCheckbox(option, 'age')}
                        />
                        {option} <span className="text-gray-400">({count})</span>
                    </label>
                ))}
            </div>

            {/* GÉNERO */}
            <div>
                <h3 className="font-semibold mb-2 text-purple-800">Género</h3>
                {Object.entries(availableOptions.gender).map(([option, count]) => (
                    <label key={option} className="block mb-1">
                        <input
                            type="checkbox"
                            className="mr-2 accent-pink-400"
                            checked={selectedGender.includes(option)}
                            onChange={() => handleCheckbox(option, 'gender')}
                        />
                        {option} <span className="text-gray-400">({count})</span>
                    </label>
                ))}
            </div>

            {/* TIPO */}
            <div>
                <h3 className="font-semibold mb-2 text-purple-800">Tipo de Producto</h3>
                {Object.entries(availableOptions.type).map(([option, count]) => (
                    <label key={option} className="block mb-1">
                        <input
                            type="checkbox"
                            className="mr-2 accent-green-400"
                            checked={selectedType.includes(option)}
                            onChange={() => handleCheckbox(option, 'type')}
                        />
                        {option} <span className="text-gray-400">({count})</span>
                    </label>
                ))}
            </div>

            {/* DISPONIBILIDAD */}
            <div>
                <h3 className="font-semibold mb-2 text-purple-800">Disponibilidad</h3>
                {Object.entries(availableOptions.availability).map(([option, count]) => (
                    <label key={option} className="block mb-1">
                        <input
                            type="checkbox"
                            className="mr-2 accent-teal-400"
                            checked={selectedAvailability.includes(option)}
                            onChange={() => handleCheckbox(option, 'availability')}
                        />
                        {option} <span className="text-gray-400">({count})</span>
                    </label>
                ))}
            </div>

            {/* PRECIO */}
            <div>
                <h3 className="font-semibold mb-2 text-purple-800">Precio</h3>
                <Slider
                    range
                    min={0}
                    max={2000}
                    defaultValue={priceRange}
                    value={priceRange}
                    onChange={(value: any) => handlePriceChange(value)}
                    trackStyle={[{backgroundColor: '#EC4899'}]}
                    handleStyle={[
                        {borderColor: '#EC4899'},
                        {borderColor: '#EC4899'}
                    ]}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>S/ {priceRange[0]}</span>
                    <span>S/ {priceRange[1]}</span>
                </div>
            </div>

            {/* BOTÓN APLICAR */}
            <div className="pt-4">
                <button
                    onClick={onApply}
                    className="w-full py-2 rounded-full bg-pink-400 text-white font-semibold hover:bg-pink-500 transition"
                >
                    Aplicar filtros
                </button>
            </div>
        </div>
    );
};

export default CategoryFilter;
