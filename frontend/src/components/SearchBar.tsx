import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

interface Props {
    suggestions: string[];
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ suggestions, onSearch }) => {
    const [input, setInput] = useState('');
    const [filtered, setFiltered] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (input.trim() === '') {
            setFiltered([]);
            setShowDropdown(false);
            return;
        }

        const matches = suggestions.filter((item) =>
            item.toLowerCase().includes(input.toLowerCase())
        );
        setFiltered(matches);
        setShowDropdown(matches.length > 0);
    }, [input, suggestions]);

    const handleSelect = (value: string) => {
        setInput(value);
        onSearch(value);
        setShowDropdown(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(input.trim());
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" size={18} />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none placeholder-gray-400 text-sm"
                    placeholder="Buscar productos o categorías..."
                />
            </form>

            {showDropdown && (
                <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-md z-20 overflow-hidden">
                    {filtered.map((item, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleSelect(item)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-mint/20 cursor-pointer transition-all"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
