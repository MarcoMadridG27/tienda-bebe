import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import AuthSlider from './pages/AuthSlider'
import Footer from './components/Footer'

// Estructura “drawer” de DaisyUI. Fíjate que el Navbar ya NO va aquí.
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="drawer drawer-end">
          <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

          {/* Este es el contenido “normal” */}
          <div className="drawer-content flex flex-col min-h-screen">
            <Routes>
              <Route path="/auth" element={<AuthSlider />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/category/:categoryName"
                element={<CategoryPage />}
              />
            </Routes>
            <Footer />
          </div>

          {/* Aquí va el drawer del carrito */}
          <div className="drawer-side">
            <label htmlFor="cart-drawer" className="drawer-overlay" />
            <CartDrawer />
          </div>
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}
