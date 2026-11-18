/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { products } from '../data/products'

type CartLine = { productId: number; quantity: number }
type CartContextValue = {
  lines: CartLine[]
  count: number
  subtotal: number
  notice: string
  addItem: (productId: number, quantity?: number) => void
  setQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clearNotice: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const storageKey = 'cherish-demo-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) ?? '[]') as CartLine[] } catch { return [] }
  })
  const [notice, setNotice] = useState('')

  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(lines)), [lines])
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 2800)
    return () => window.clearTimeout(timer)
  }, [notice])

  const value = useMemo<CartContextValue>(() => ({
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: lines.reduce((sum, line) => sum + (products.find((p) => p.id === line.productId)?.price ?? 0) * line.quantity, 0),
    notice,
    addItem: (productId, quantity = 1) => {
      setLines((current) => {
        const exists = current.find((line) => line.productId === productId)
        return exists ? current.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + quantity } : line) : [...current, { productId, quantity }]
      })
      setNotice('Produk ditambahkan ke keranjang')
    },
    setQuantity: (productId, quantity) => setLines((current) => quantity < 1 ? current.filter((line) => line.productId !== productId) : current.map((line) => line.productId === productId ? { ...line, quantity } : line)),
    removeItem: (productId) => setLines((current) => current.filter((line) => line.productId !== productId)),
    clearNotice: () => setNotice(''),
  }), [lines, notice])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
