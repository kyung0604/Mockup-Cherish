import atlas from '../assets/product-atlas.png'

export type Product = {
  id: number
  slug: string
  name: string
  category: 'Roti' | 'Pastry' | 'Cake' | 'Dessert'
  price: number
  description: string
  position: string
  rating: number
}

export const productAtlas = atlas

export const products: Product[] = [
  { id: 1, slug: 'classic-croissant', name: 'Classic Croissant', category: 'Pastry', price: 18000, description: 'Croissant renyah dengan aroma butter yang khas.', position: '0% 0%', rating: 4.9 },
  { id: 2, slug: 'tiramisu-cake', name: 'Tiramisu Cake', category: 'Cake', price: 42000, description: 'Perpaduan lembut mascarpone dengan aroma kopi klasik.', position: '50% 0%', rating: 4.8 },
  { id: 3, slug: 'brioche', name: 'Brioche', category: 'Roti', price: 32000, description: 'Roti lembut dengan tekstur empuk dan rasa kaya.', position: '100% 0%', rating: 4.9 },
  { id: 4, slug: 'strawberry-shortcake', name: 'Strawberry Shortcake', category: 'Cake', price: 395000, description: 'Cake lembut dengan krim vanila dan stroberi segar.', position: '0% 50%', rating: 4.9 },
  { id: 5, slug: 'macaron-box', name: 'Macaron', category: 'Dessert', price: 25000, description: 'Kue khas Prancis, renyah di luar dan lembut di dalam.', position: '50% 50%', rating: 4.7 },
  { id: 6, slug: 'focaccia', name: 'Focaccia', category: 'Roti', price: 36000, description: 'Roti artisan dengan olive oil, rempah, dan topping pilihan.', position: '100% 50%', rating: 4.8 },
  { id: 7, slug: 'multigrain-bread', name: 'Multigrain Bread', category: 'Roti', price: 28000, description: 'Roti gandum dengan biji-bijian pilihan, kaya serat dan bernutrisi.', position: '0% 100%', rating: 4.8 },
  { id: 8, slug: 'chocolate-layer-cake', name: 'Chocolate Layer Cake', category: 'Cake', price: 420000, description: 'Cake cokelat lembut dengan ganache premium.', position: '50% 100%', rating: 4.9 },
  { id: 9, slug: 'milk-bread', name: 'Milk Bread', category: 'Roti', price: 28000, description: 'Roti susu lembut dengan rasa manis yang pas.', position: '100% 100%', rating: 4.8 },
]

export const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
