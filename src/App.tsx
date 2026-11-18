import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { StorefrontLayout } from './components/Storefront'
import { AuthPage } from './pages/AuthPage'
import { AdminDashboard } from './pages/AdminDashboard'
import { AdminModulePage } from './pages/AdminModulePage'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import { HomePage } from './pages/HomePage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { AboutPage, CheckoutPage, ContactPage, OrdersPage, PromoPage } from './pages/InfoPages'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <HashRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<StorefrontLayout />}>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<CatalogPage />} />
            <Route path="produk" element={<Navigate to="/menu" replace />} />
            <Route path="menu/:slug" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="promo" element={<PromoPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          <Route path="login" element={<AuthPage mode="login" />} />
          <Route path="register" element={<AuthPage mode="register" />} />
          <Route path="forgot-password" element={<AuthPage mode="forgot" />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/:module" element={<AdminModulePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </HashRouter>
  )
}

export default App
