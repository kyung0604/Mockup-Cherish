import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/cherish-hero.png'
import { MaterialIcon } from '../components/MaterialIcon'
import { ProductCard, ProductImage, SectionHeading } from '../components/Storefront'
import { useCart } from '../context/CartContext'
import { formatRupiah, products } from '../data/products'

const slides = [
  { accent: 'Freshly baked with love', title: <>Taste The<br />Difference</>, copy: 'Roti, pastry, dan cake artisan untuk setiap momen istimewa.', product: products[6], image: 'hero' },
  { accent: 'A little celebration', title: <>Sweet Moments,<br />Made Cherished</>, copy: 'Strawberry shortcake lembut untuk ulang tahun, hadiah, dan hari yang layak dirayakan.', product: products[3], image: 'product' },
  { accent: 'Slow crafted, always fresh', title: <>Artisan Bread<br />Every Morning</>, copy: 'Dibuat dalam batch kecil, dipanggang setiap pagi, dan hadir hangat untuk Anda.', product: products[0], image: 'hero' },
]

export function HomePage() {
  const { addItem } = useCart()
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 6000)
    return () => window.clearInterval(timer)
  }, [])

  const current = slides[slide]
  const move = (direction: number) => setSlide((slide + direction + slides.length) % slides.length)

  return (
    <>
      <section className="hero-section" aria-roledescription="carousel" aria-label="Promo Cherish Bakery">
        <div className="hero-copy" key={slide}>
          <span className="script-accent">{current.accent}</span>
          <h1>{current.title}</h1>
          <p>{current.copy}</p>
          <div className="hero-actions"><Link className="button primary" to="/menu">Pesan Sekarang</Link><Link className="button secondary" to="/menu">Lihat Menu</Link></div>
          <div className="mini-products">
            <button onClick={() => addItem(1)} aria-label="Tambah Classic Croissant"><ProductImage product={products[0]} /><span>+</span></button>
            <button onClick={() => addItem(4)} aria-label="Tambah Strawberry Shortcake"><ProductImage product={products[3]} /><span>+</span></button>
          </div>
        </div>
        <div className="hero-visual">
          {current.image === 'hero' ? <img src={heroImage} alt="Rangkaian roti artisan Cherish Bakery" /> : <ProductImage product={current.product} className="hero-product-image" />}
          <div className="floating-card"><strong>{current.product.name}</strong><span>★ {current.product.rating} (320)</span><b>{formatRupiah(current.product.price)}</b></div>
          <button className="carousel-arrow previous" onClick={() => move(-1)} aria-label="Slide sebelumnya"><MaterialIcon name="arrow_back_ios_new" /></button>
          <button className="carousel-arrow next" onClick={() => move(1)} aria-label="Slide berikutnya"><MaterialIcon name="arrow_forward_ios" /></button>
          <div className="carousel-dots">{slides.map((_, index) => <button key={index} className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} aria-label={`Tampilkan slide ${index + 1}`} />)}</div>
        </div>
      </section>

      <section id="about" className="editorial-section page-shell"><div className="editorial-photo"><div className="atlas-feature" /></div><div><span className="script-accent">Every bite, a little joy</span><h2>Enjoy the<br /><em>Pure Bite</em></h2><p>Nikmati kelezatan roti dan pastry dengan bahan pilihan, dipanggang segar setiap hari di dapur Cherish Bakery.</p><Link className="button secondary" to="/menu">Selengkapnya <MaterialIcon name="arrow_forward" /></Link></div></section>
      <section className="benefits page-shell"><SectionHeading title="Why Cherish?" /><div className="benefit-grid"><article><MaterialIcon name="eco" /><h3>Fresh Every Day</h3><p>Dipanggang setiap hari untuk kualitas dan rasa terbaik.</p></article><article><MaterialIcon name="verified" /><h3>Bahan Berkualitas</h3><p>Menggunakan bahan pilihan yang aman dan premium.</p></article><article><MaterialIcon name="calendar_month" /><h3>Pesan Terjadwal</h3><p>Atur waktu pengambilan atau pengiriman sesuai kebutuhan.</p></article></div></section>
      <section className="best-sellers page-shell"><SectionHeading eyebrow="Our favorites" title="Enjoy the Best Deal" copy="Pilihan favorit dari Cherish Bakery, dibuat dengan resep andalan dan bahan terbaik." action="Lihat semua" /><div className="product-grid home-grid">{products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
      <section className="testimonials page-shell"><SectionHeading eyebrow="Sweet words" title="Cerita dari Pelanggan" /><div className="testimonial-grid"><blockquote>“Rotinya selalu fresh dan wangi, jadi langganan di sini!”<cite>— Naya, Surabaya</cite></blockquote><blockquote className="featured">“Rasa, kualitas, dan pelayanannya selalu memuaskan. Cocok untuk hampers maupun acara keluarga.”<cite>— Sarah M., Pelanggan Setia</cite></blockquote><blockquote>“Pilihan variannya lengkap, semuanya enak!”<cite>— Dinda, Sidoarjo</cite></blockquote></div></section>
      <section id="promo" className="newsletter page-shell"><div><span className="script-accent">A little treat for you</span><h2>Dapatkan Promo Spesial</h2><p>Berlangganan newsletter Cherish Bakery untuk info menu terbaru, promo eksklusif, dan inspirasi hidangan.</p></div><form onSubmit={(event) => event.preventDefault()}><MaterialIcon name="mail" /><input aria-label="Email" type="email" placeholder="Masukkan email Anda" required /><button>Berlangganan</button></form></section>
      <section className="service-strip page-shell"><div><MaterialIcon name="local_shipping" /><span><b>Pengiriman Aman</b><small>Dikemas dengan hati-hati</small></span></div><div><MaterialIcon name="eco" /><span><b>Bahan Berkualitas</b><small>Pilihan bahan terbaik</small></span></div><div><MaterialIcon name="calendar_month" /><span><b>Pesan Terjadwal</b><small>Atur waktu pengambilan</small></span></div></section>
    </>
  )
}
