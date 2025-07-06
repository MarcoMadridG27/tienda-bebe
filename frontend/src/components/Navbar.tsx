import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

interface NavbarProps {
  suggestions: string[]
  onSearch: (q: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ suggestions, onSearch }) => {
  const { cartItems } = useCart()
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setQuery(q)
    onSearch(q)
  }

  return (
    <nav className="bg-white shadow-lg px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        NidoBebé
      </Link>

      {/* Buscador centrado */}
      <div className="relative flex-1 mx-6">
        <input
          type="text"
          list="search-suggestions"
          placeholder="Buscar productos o categorías…"
          value={query}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none"
        />
        <datalist id="search-suggestions">
          {suggestions.map((s, i) => (
            <option key={i} value={s} />
          ))}
        </datalist>
      </div>

      {/* Enlaces + Carrito */}
      <div className="flex items-center space-x-6">
        <a
          href="https://wa.me/953376448"
          className="text-gray-600 hover:text-gray-800"
        >
          Whatsapp
        </a>
        <Link to="/wishlist" className="text-gray-600 hover:text-gray-800">
          🤍 Lista de regalos
        </Link>
        <Link to="/auth" className="text-gray-600 hover:text-gray-800">
          Registrarse
        </Link>

        {/* Label que abre/oculta el drawer */}
        <label htmlFor="cart-drawer" className="relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
            />
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
              {cartItems.length}
            </span>
          )}
        </label>
      </div>
    </nav>
  )
}

export default Navbar
