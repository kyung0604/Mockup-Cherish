import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { MaterialIcon } from '../components/MaterialIcon'
import { ProductImage } from '../components/Storefront'
import { useCart } from '../context/CartContext'
import { formatRupiah, products } from '../data/products'

export function PromoPage() {
  return <><section className="simple-hero"><span className="script-accent">Made sweeter for you</span><h1>Promo Spesial</h1><p>Nikmati penawaran pilihan untuk momen manis bersama Cherish Bakery.</p></section><section className="promo-list page-shell">{[['PROMO20','Minggu Manis','Diskon 20%','Min. belanja Rp150.000'],['WELCOME10','Welcome Treat','Diskon 10%','Untuk pelanggan baru'],['CAKE15','Cake Celebration','Diskon 15%','Khusus kategori cake']].map(([code,title,value,terms],index)=><article key={code}><ProductImage product={products[[3,0,7][index]]} /><div><span>{code}</span><h2>{title}</h2><strong>{value}</strong><p>{terms} · Berlaku sampai 30 November 2026.</p><Link className="button primary" to="/menu">Pilih Produk</Link></div></article>)}</section></>
}

export function AboutPage() {
  return <><section className="simple-hero"><span className="script-accent">Our story</span><h1>Tentang Cherish</h1><p>Bakery & pâtisserie yang percaya bahwa setiap momen layak dirayakan dengan sesuatu yang dibuat sepenuh hati.</p></section><section className="about-story page-shell"><div><ProductImage product={products[6]} /></div><article><span className="module-eyebrow">Sejak 2021</span><h2>Freshly baked,<br />made to cherish.</h2><p>Cherish lahir dari dapur kecil dan kecintaan pada roti artisan. Kami bekerja dalam batch kecil, memilih bahan berkualitas, dan memanggang fresh setiap hari.</p><div className="story-values"><span><MaterialIcon name="eco" /><b>Bahan pilihan</b></span><span><MaterialIcon name="bakery_dining" /><b>Fresh setiap hari</b></span><span><MaterialIcon name="favorite" /><b>Dibuat dengan hati</b></span></div></article></section></>
}

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true) }
  return <><section className="simple-hero"><span className="script-accent">Let's talk</span><h1>Hubungi Kami</h1><p>Tim Cherish siap membantu kebutuhan pesanan, hampers, dan acara spesial Anda.</p></section><section className="contact-layout page-shell"><div className="contact-cards"><article><MaterialIcon name="location_on" /><h3>Outlet Utama</h3><p>Jl. Bakery Bahagia No. 18, Surabaya</p></article><article><MaterialIcon name="call" /><h3>WhatsApp</h3><p>0812 3456 7890</p></article><article><MaterialIcon name="schedule" /><h3>Jam Buka</h3><p>Senin–Sabtu, 07:00–20:00</p></article></div><form onSubmit={submit}><h2>Kirim Pesan</h2><label>Nama<input required placeholder="Nama Anda" /></label><label>Email<input required type="email" placeholder="nama@email.com" /></label><label>Pesan<textarea required placeholder="Ceritakan kebutuhan Anda..." /></label><button className="button primary">Kirim Pesan</button>{sent && <p className="form-success">✓ Pesan demo berhasil dikirim.</p>}</form></section></>
}

export function OrdersPage() {
  return <section className="orders-page page-shell"><div className="cart-heading"><span className="script-accent">Track every sweet moment</span><h1>Pesanan Saya</h1><p>Status pesanan demo Anda ditampilkan di sini.</p></div><div className="customer-orders">{[['CB-10248',products[0],'Dalam Proses','14 Nov 2026',2],['CB-10198',products[3],'Selesai','2 Nov 2026',1]].map(([code,product,status,date,qty])=><article key={String(code)}><ProductImage product={product as typeof products[number]} /><div><span>{code as string}</span><h3>{(product as typeof products[number]).name} ×{qty as number}</h3><p>{date as string}</p></div><em className={`status ${String(status).toLowerCase().replaceAll(' ','-')}`}>{status as string}</em><button className="button secondary">Lihat Detail</button></article>)}</div></section>
}

export function CheckoutPage() {
  const { lines, subtotal } = useCart()
  const [complete, setComplete] = useState(false)
  if (complete) return <section className="checkout-success page-shell"><MaterialIcon name="check_circle" filled /><h1>Pesanan Demo Dibuat!</h1><p>Kode pesanan Anda <strong>CB-10249</strong>. Tidak ada pembayaran nyata yang diproses.</p><Link className="button primary" to="/orders">Lihat Pesanan</Link></section>
  return <section className="checkout-page page-shell"><div><span className="script-accent">Almost there</span><h1>Checkout</h1><form onSubmit={(event) => { event.preventDefault(); setComplete(true) }}><section><h2>Informasi Penerima</h2><div className="checkout-fields"><label>Nama penerima<input required defaultValue="Pelanggan Demo" /></label><label>Nomor HP<input required defaultValue="0812 3456 7890" /></label><label className="wide">Alamat lengkap<textarea required defaultValue="Jl. Contoh No. 18, Surabaya" /></label></div></section><section><h2>Jadwal & Pengiriman</h2><div className="checkout-fields"><label>Tanggal<input type="date" required defaultValue="2026-11-18" /></label><label>Metode<select><option>Kurir Toko</option><option>Pickup di Toko</option><option>Gojek / Grab</option></select></label></div></section><button className="button primary full">Buat Pesanan Demo</button></form></div><aside className="cart-summary"><h2>Ringkasan</h2><div><span>{lines.reduce((sum,line)=>sum+line.quantity,0)} item</span><strong>{formatRupiah(subtotal)}</strong></div><div><span>Ongkir demo</span><strong>Rp15.000</strong></div><hr /><div className="total"><span>Total</span><strong>{formatRupiah(subtotal+15000)}</strong></div></aside></section>
}
