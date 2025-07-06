import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CategoryBar from '../components/CategoryBar'
import ImageCarousel from '../components/ImageCarousel'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'
import { useProductService } from '../services/productService'
import type { Product } from '../types/Product'
import { useCart } from '../contexts/CartContext'

const HomePage: React.FC = () => {
  const { getProducts } = useProductService()
  const { addToCart } = useCart()

  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Carga UNA sola vez al montar
  useEffect(() => {
    let m = true
    getProducts()
      .then(data => {
        if (!m) return
        setProducts(data)
        setFiltered(data)
      })
      .catch(() => {
        if (m) setError('No se pudieron cargar los productos')
      })
      .finally(() => {
        if (m) setLoading(false)
      })
    return () => {
      m = false
    }
  }, [])

  // Filtrado al teclear en Navbar
  const handleSearch = (q: string) => {
    if (!q.trim()) return setFiltered(products)
    const low = q.toLowerCase()
    setFiltered(products.filter(p => p.nombre.toLowerCase().includes(low)))
  }

  return (
    <>
      {/* Aquí va el Navbar con sugerencias y onSearch */}
      <Navbar
        suggestions={products.map(p => p.nombre)}
        onSearch={handleSearch}
      />

      <CategoryBar />

      <div className="w-full">
        <ImageCarousel />
      </div>

      <div className="max-w-7xl mx-auto py-10 px-4">
        {loading && (
          <p className="text-center text-gray-400">Cargando productos…</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <ProductList products={filtered} onAddToCart={addToCart} />
        )}
      </div>

      <Footer />
    </>
  )
}

export default HomePage
