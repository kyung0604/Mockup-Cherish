import { useMemo, useState } from 'react'
import heroImage from '../assets/cherish-hero.png'
import { MaterialIcon } from '../components/MaterialIcon'
import { ProductCard, SectionHeading } from '../components/Storefront'
import { products } from '../data/products'

const categories = [
  { label: 'Semua', icon: 'bakery_dining' }, { label: 'Roti', icon: 'breakfast_dining' }, { label: 'Pastry', icon: 'bakery_dining' }, { label: 'Cake', icon: 'cake' }, { label: 'Dessert', icon: 'cookie' }, { label: 'Minuman', icon: 'local_cafe' },
]

export function CatalogPage() {
  const [category, setCategory] = useState('Semua')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('popular')
  const filtered = useMemo(() => products.filter((product) => (category === 'Semua' || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : b.rating - a.rating), [category, query, sort])
  return (
    <>
      <section className="catalog-hero page-shell"><div><span className="script-accent">Our Catalog</span><h1>Katalog<br />Produk</h1><p>Temukan beragam pilihan roti, pastry, dan cake artisan yang selalu fresh dari dapur Cherish Bakery.</p><a className="button primary" href="#catalog">Belanja Sekarang</a></div><img src={heroImage} alt="Koleksi roti Cherish Bakery" /></section>
      <section className="category-section page-shell"><SectionHeading title="Jelajahi Kategori" /><div className="category-scroller">{categories.map(({ label, icon }) => <button key={label} className={category === label ? 'active' : ''} onClick={() => setCategory(label)}><MaterialIcon name={icon} /><span>{label}</span></button>)}</div></section>
      <section id="catalog" className="catalog-section page-shell"><SectionHeading title="Pilihan Produk Kami" copy="Roti, pastry, dan cake favorit, dibuat dengan bahan berkualitas dan resep andalan." /><div className="catalog-toolbar"><label><MaterialIcon name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari produk..." /></label><select aria-label="Urutkan produk" value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Urutkan: Paling Populer</option><option value="low">Harga Terendah</option><option value="high">Harga Tertinggi</option></select></div>{filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><MaterialIcon name="search_off" /><h3>Produk tidak ditemukan</h3><p>Coba kata kunci atau kategori lain.</p></div>}</section>
      <section className="promo-banner page-shell"><div><span className="script-accent">Minggu ini</span><h2>Promo Spesial</h2><p>Nikmati potongan harga hingga 20% untuk pilihan roti dan cake favorit.</p><button className="button light">Lihat Promo</button></div><div className="promo-product" /></section>
    </>
  )
}
