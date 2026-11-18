import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MaterialIcon } from '../components/MaterialIcon'
import { ProductCard, ProductImage, SectionHeading } from '../components/Storefront'
import { useCart } from '../context/CartContext'
import { formatRupiah, products } from '../data/products'

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  if (!product) return <div className="empty-state page-shell"><h1>Produk tidak ditemukan</h1><Link className="button primary" to="/menu">Kembali ke katalog</Link></div>
  return <><section className="product-detail page-shell"><div className="detail-image-wrap"><ProductImage product={product} /></div><div className="detail-copy"><Link className="back-link" to="/menu">← Kembali ke katalog</Link><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><div className="rating"><MaterialIcon name="star" filled /> {product.rating} <span>(128 ulasan)</span></div><strong className="detail-price">{formatRupiah(product.price)}</strong><p>{product.description} Dibuat segar setiap hari dengan bahan pilihan untuk rasa yang konsisten dan istimewa.</p><hr /><label>Jumlah</label><div className="buy-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><MaterialIcon name="remove" /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}><MaterialIcon name="add" /></button></div><button className="button primary grow" onClick={() => addItem(product.id, quantity)}><MaterialIcon name="shopping_bag" /> Tambah ke Keranjang</button></div><div className="detail-benefits"><span><MaterialIcon name="local_shipping" /> Pengiriman aman</span><span><MaterialIcon name="verified" /> Dibuat fresh</span></div></div></section><section className="page-shell related"><SectionHeading title="Mungkin Anda Suka" /><div className="product-grid">{products.filter((item) => item.id !== product.id).slice(0, 3).map((item) => <ProductCard product={item} key={item.id} />)}</div></section></>
}
