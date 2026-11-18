import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatRupiah, productAtlas, type Product } from '../data/products'
import { MaterialIcon } from './MaterialIcon'

export function Brand() {
  return <Link className="brand" to="/" aria-label="Cherish Bakery home"><MaterialIcon name="bakery_dining" /><span><strong>Cherish</strong><small>Bakery</small></span></Link>
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()
  const location = useLocation()
  const links = [['/', 'Beranda'], ['/menu', 'Produk'], ['/promo', 'Promo'], ['/about', 'Tentang Kami'], ['/contact', 'Kontak']]
  const close = () => setOpen(false)
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />
        <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Navigasi utama">
          {links.map(([to, label]) => <NavLink key={label} to={to} end={to === '/'} onClick={close} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
        </nav>
        <div className="nav-actions">
          <Link className="icon-button hide-mobile" to="/menu" aria-label="Cari produk"><MaterialIcon name="search" /></Link>
          <Link className="icon-button cart-link" to="/cart" aria-label={`Keranjang, ${count} item`}><MaterialIcon name="shopping_bag" />{count > 0 && <span>{count}</span>}</Link>
          <Link className="icon-button hide-mobile" to="/login" aria-label="Akun"><MaterialIcon name="account_circle" /></Link>
          <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-label="Buka menu"><MaterialIcon name={open ? 'close' : 'menu'} /></button>
        </div>
      </div>
      {location.pathname === '/menu' && <div className="mobile-search"><MaterialIcon name="search" /><input aria-label="Cari produk" placeholder="Cari roti, cake, atau pastry..." /></div>}
    </header>
  )
}

export function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  return <div className={`atlas-image ${className}`} role="img" aria-label={product.name} style={{ backgroundImage: `url(${productAtlas})`, backgroundPosition: product.position }} />
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  return (
    <article className="product-card">
      <Link to={`/menu/${product.slug}`} className="product-photo-link"><ProductImage product={product} /></Link>
      <div className="product-card-body">
        <span className="eyebrow">{product.category}</span>
        <Link to={`/menu/${product.slug}`}><h3>{product.name}</h3></Link>
        <p>{product.description}</p>
        <div className="product-card-bottom"><strong>{formatRupiah(product.price)}</strong><button onClick={() => addItem(product.id)} aria-label={`Tambah ${product.name}`}><MaterialIcon name="add_shopping_cart" /></button></div>
      </div>
    </article>
  )
}

function Toast() {
  const { notice, clearNotice } = useCart()
  if (!notice) return null
  return <div className="toast" role="status"><span>✓</span>{notice}<button onClick={clearNotice} aria-label="Tutup"><MaterialIcon name="close" /></button></div>
}

export function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <div className="footer-grid">
        <div><Brand /><p>Bakery & pâtisserie dengan berbagai pilihan roti, pastry, dan cake untuk setiap momen istimewa.</p><div className="socials"><span>◎</span><span>♪</span><span>▶</span></div></div>
        <div><h3>Menu</h3><Link to="/menu">Semua Produk</Link><Link to="/menu">Roti</Link><Link to="/menu">Pastry</Link><Link to="/menu">Cake</Link></div>
        <div><h3>Bantuan</h3><Link to="/orders">Cara Pemesanan</Link><Link to="/checkout">Pengiriman</Link><Link to="/checkout">Pembayaran</Link><Link to="/contact">FAQ</Link></div>
        <div><h3>Tentang Kami</h3><Link to="/about">Cerita Cherish</Link><Link to="/contact">Lokasi Toko</Link><Link to="/contact">Kerja Sama</Link><Link to="/contact">Kontak Kami</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Cherish Bakery. All rights reserved.</span><span>Kebijakan Privasi &nbsp; · &nbsp; Syarat & Ketentuan</span></div>
    </footer>
  )
}

export function StorefrontLayout() {
  return <><Header /><main><Outlet /></main><Footer /><nav className="bottom-nav"><NavLink to="/"><MaterialIcon name="home" /><span>Beranda</span></NavLink><NavLink to="/menu"><MaterialIcon name="bakery_dining" /><span>Menu</span></NavLink><NavLink to="/promo"><MaterialIcon name="local_offer" /><span>Promo</span></NavLink><NavLink to="/orders"><MaterialIcon name="receipt_long" /><span>Pesanan</span></NavLink><NavLink to="/login"><MaterialIcon name="person" /><span>Profil</span></NavLink></nav><Toast /></>
}

export function SectionHeading({ eyebrow, title, copy, action }: { eyebrow?: string; title: string; copy?: string; action?: string }) {
  return <div className="section-heading"><div>{eyebrow && <span className="script-accent">{eyebrow}</span>}<h2>{title}</h2>{copy && <p>{copy}</p>}</div>{action && <Link to="/menu" className="text-link">{action}<MaterialIcon name="arrow_forward" /></Link>}</div>
}
