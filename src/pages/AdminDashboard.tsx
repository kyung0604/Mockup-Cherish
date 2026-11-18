import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Brand, ProductImage } from '../components/Storefront'
import { MaterialIcon } from '../components/MaterialIcon'
import { adminNavItems } from '../data/admin'
import { formatRupiah, products } from '../data/products'

const orders = [
  ['CB-10248', 'Rina Aulia', 285000, 'Transfer BCA', 'Baru'],
  ['CB-10247', 'Dewi Saraswati', 150000, 'QRIS', 'Menunggu Verifikasi'],
  ['CB-10246', 'Bagus Pratama', 420000, 'Transfer BCA', 'Dalam Proses'],
  ['CB-10245', 'Siti Nurhaliza', 98000, 'QRIS', 'Dalam Pengiriman'],
  ['CB-10244', 'Agung Wicaksono', 315000, 'Transfer BCA', 'Selesai'],
]

export function AdminDashboard() {
  const [storeOpen, setStoreOpen] = useState(true)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  return (
    <main className="admin-app">
      <aside className="admin-sidebar">
        <Brand />
        <nav>{adminNavItems.map((item) => <NavLink end={item.path === '/admin'} to={item.path} key={item.label} className={({ isActive }) => isActive ? 'active' : ''}><MaterialIcon name={item.icon} /><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}</NavLink>)}</nav>
        <div className="admin-sidebar-note"><MaterialIcon name="bakery_dining" /><em>Baking Happiness Everyday ♡</em></div>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar">
          <label><MaterialIcon name="search" /><input placeholder="Cari pesanan, produk, atau pelanggan..." /><kbd>Ctrl K</kbd></label>
          <div className="admin-topbar-actions"><button className="admin-icon" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Notifikasi"><MaterialIcon name="notifications" /><i /></button><button className={`store-toggle ${storeOpen ? '' : 'closed'}`} onClick={() => setStoreOpen(!storeOpen)}><MaterialIcon name="storefront" /> Toko: {storeOpen ? 'Buka' : 'Tutup'} <span /></button><Link to="/admin/settings" className="admin-profile"><ProductImage product={products[0]} /><b>Admin</b><MaterialIcon name="expand_more" /></Link></div>
          {notificationsOpen && <aside className="notification-popover"><header><strong>Notifikasi</strong><button onClick={() => setNotificationsOpen(false)} aria-label="Tutup notifikasi"><MaterialIcon name="close" /></button></header><Link to="/admin/orders"><MaterialIcon name="shopping_cart" /><span><b>8 pesanan baru</b><small>Perlu diperiksa hari ini</small></span></Link><Link to="/admin/orders"><MaterialIcon name="payments" /><span><b>2 pembayaran</b><small>Menunggu verifikasi</small></span></Link><footer><Link to="/admin/orders">Buka pusat notifikasi <MaterialIcon name="arrow_forward" /></Link></footer></aside>}
        </header>

        <div className="admin-page">
          <section className="admin-welcome"><div><span>Selamat Datang di</span><h1>Cherish Bakery</h1><p>Kelola pesanan, produk, dan operasional toko Anda dengan lebih mudah.</p></div><div className="admin-bread"><ProductImage product={products[6]} /></div></section>

          <section className="kpi-grid">
            <article><MaterialIcon name="shopping_cart" /><div><span>Pesanan Hari Ini</span><strong>32</strong><small>↑ +12% dari kemarin</small></div></article>
            <article><MaterialIcon name="inventory_2" /><div><span>Dalam Proses</span><strong>8</strong></div></article>
            <article><MaterialIcon name="local_shipping" /><div><span>Dalam Pengiriman</span><strong>6</strong></div></article>
            <article><MaterialIcon name="check_circle" /><div><span>Selesai</span><strong>18</strong></div></article>
          </section>

          <section className="admin-panels">
            <article className="sales-chart"><div className="admin-card-title"><h2><MaterialIcon name="bar_chart" /> Grafik Penjualan</h2><Link to="/admin/reports" className="admin-select-link">7 Hari Terakhir <MaterialIcon name="expand_more" /></Link></div><div className="chart-area">{[38, 54, 51, 78, 58, 80, 91].map((height, index) => <div key={index}><span style={{ height: `${height}%` }} /><i>{8 + index} Nov</i></div>)}</div></article>
            <article className="top-products"><div className="admin-card-title"><h2><MaterialIcon name="star" /> Produk Terlaris</h2><Link to="/admin/products">Lihat Semua →</Link></div>{products.slice(0, 3).map((product, index) => <div className="top-product" key={product.id}><ProductImage product={product} /><strong>{product.name}</strong><span>{[42, 28, 19][index]} pcs</span></div>)}</article>
          </section>

          <section className="latest-orders"><div className="admin-card-title"><h2><MaterialIcon name="assignment" /> Pesanan Terbaru</h2><div className="order-tabs"><button className="active">Semua</button><button>Baru (8)</button><button>Diproses</button><button>Dikirim</button></div><Link to="/admin/orders">Lihat Semua →</Link></div><div className="admin-table"><div className="table-row table-head"><span>No. Pesanan</span><span>Pelanggan</span><span>Total</span><span>Pembayaran</span><span>Status</span><span>Aksi</span></div>{orders.map(([code, customer, total, payment, status]) => <div className="table-row" key={String(code)}><b>{code}</b><span>{customer}</span><span>{formatRupiah(Number(total))}</span><span>{payment}</span><em className={`status ${String(status).toLowerCase().replaceAll(' ', '-')}`}>{status}</em><Link className="row-action" to="/admin/orders" aria-label={`Lihat ${code}`}><MaterialIcon name="visibility" /></Link></div>)}</div></section>

          <section className="quick-actions"><h2><MaterialIcon name="bolt" /> Aksi Cepat</h2><div>{[['add','Buat Pesanan','/admin/orders'],['inventory_2','Tambah Produk','/admin/products'],['sell','Buat Promo','/admin/promos'],['event_available','Atur Produksi','/admin/production'],['monitoring','Lihat Laporan','/admin/reports']].map(([icon,label,path]) => <Link to={path} key={label}><MaterialIcon name={icon} /><span>{label}</span></Link>)}</div></section>
        </div>
      </section>
    </main>
  )
}
