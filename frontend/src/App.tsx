import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthSlider from './pages/AuthSlider';
import HomePage from './pages/HomePage';
import { CartProvider } from './contexts/CartContext';
import CategoryPage from "./pages/CategoryPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <Routes>
                    {/* Página principal con productos */}
                    <Route path="/" element={<HomePage />} />

                    <Route path="/categoria/:categoryName" element={<CategoryPage />} />

                    {/* Página de login/registro */}
                    <Route path="/login" element={<AuthSlider />} />

                    {/* Redirección por defecto */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}
