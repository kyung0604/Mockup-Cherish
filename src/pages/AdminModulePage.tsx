import { useMemo, useState, type FormEvent } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { MaterialIcon } from '../components/MaterialIcon'
import { Brand, ProductImage } from '../components/Storefront'
import { adminNavItems } from '../data/admin'
import { formatRupiah, products } from '../data/products'

type ModuleKey = 'orders' | 'production' | 'products' | 'promos' | 'customers' | 'shipping' | 'reports' | 'settings'

const moduleMeta: Record<ModuleKey, { title: string; description: string; icon: string; action: string }> = {
  orders: { title: 'Manajemen Pesanan', description: 'Kelola seluruh pesanan pelanggan dengan mudah dan efisien.', icon: 'receipt_long', action: 'Buat Pesanan' },
  production: { title: 'Jadwal Produksi', description: 'Atur antrean produksi berdasarkan pesanan terverifikasi.', icon: 'restaurant', action: 'Atur Produksi' },
  products: { title: 'Manajemen Produk', description: 'Kelola produk, kategori, harga, stok, dan ketersediaan katalog.', icon: 'inventory_2', action: 'Tambah Produk' },
  promos: { title: 'Promo & Voucher', description: 'Buat kampanye promosi dan voucher untuk pelanggan Cherish.', icon: 'sell', action: 'Buat Promo' },
  customers: { title: 'Data Pelanggan', description: 'Lihat profil pelanggan dan riwayat pemesanan mereka.', icon: 'group', action: 'Tambah Pelanggan' },
  shipping: { title: 'Pengiriman', description: 'Pantau pengiriman, kurir, dan jadwal pickup pelanggan.', icon: 'local_shipping', action: 'Tambah Pengiriman' },
  reports: { title: 'Laporan Bisnis', description: 'Analisis penjualan, pesanan, produk, dan performa toko.', icon: 'monitoring', action: 'Ekspor Laporan' },
  settings: { title: 'Pengaturan Toko', description: 'Atur identitas, operasional, pembayaran, dan tampilan toko.', icon: 'settings', action: 'Simpan Perubahan' },
}

const demoRows: Record<Exclude<ModuleKey, 'products' | 'reports' | 'settings'>, string[][]> = {
  orders: [
    ['CB-10248', 'Rina Aulia', 'Classic Croissant ×2, Milk Bread ×1', 'Rp64.000', 'Baru'],
    ['CB-10247', 'Dewi Saraswati', 'Strawberry Shortcake ×1', 'Rp395.000', 'Menunggu Verifikasi'],
    ['CB-10246', 'Bagus Pratama', 'Macaron Box ×1', 'Rp150.000', 'Dalam Proses'],
    ['CB-10245', 'Siti Nurhaliza', 'Chocolate Cake ×1', 'Rp452.000', 'Dalam Pengiriman'],
    ['CB-10244', 'Agung Wicaksono', 'Milk Bread ×2', 'Rp56.000', 'Selesai'],
  ],
  production: [
    ['PRD-1108', 'Croissant Pagi', '24 pcs · 07:00–09:00', 'Siti', 'Berjalan'],
    ['PRD-1109', 'Cake Pesanan', '6 cake · 09:00–12:00', 'Dewi', 'Terjadwal'],
    ['PRD-1110', 'Bread Batch 2', '32 loaf · 12:00–15:00', 'Bagus', 'Terjadwal'],
    ['PRD-1111', 'Macaron Box', '18 box · 15:00–17:00', 'Rina', 'Menunggu'],
  ],
  promos: [
    ['PROMO20', 'Promo Minggu Manis', 'Diskon 20% · Min. Rp150.000', '24/50 terpakai', 'Aktif'],
    ['WELCOME10', 'Pelanggan Baru', 'Diskon 10% · Min. Rp80.000', '38/100 terpakai', 'Aktif'],
    ['CAKE15', 'Cake Celebration', 'Diskon 15% kategori Cake', '12/30 terpakai', 'Terjadwal'],
    ['ONGKIR', 'Gratis Ongkir', 'Maks. Rp20.000', '50/50 terpakai', 'Selesai'],
  ],
  customers: [
    ['CUS-001', 'Rina Aulia', 'rina@email.com · 0812••••2231', '12 pesanan', 'Pelanggan Setia'],
    ['CUS-002', 'Dewi Saraswati', 'dewi@email.com · 0813••••1010', '8 pesanan', 'Aktif'],
    ['CUS-003', 'Bagus Pratama', 'bagus@email.com · 0857••••8812', '5 pesanan', 'Aktif'],
    ['CUS-004', 'Siti Nurhaliza', 'siti@email.com · 0819••••3324', '3 pesanan', 'Baru'],
  ],
  shipping: [
    ['SHP-2048', 'CB-10245 · Siti Nurhaliza', 'Kurir Toko · 10:00–12:00', 'Surabaya', 'Dalam Pengiriman'],
    ['SHP-2047', 'CB-10243 · Dinda Putri', 'Gojek · Same Day', 'Sidoarjo', 'Siap Dikirim'],
    ['SHP-2046', 'CB-10241 · Naya Sari', 'Pickup Toko · 14:00', 'Outlet Utama', 'Siap Diambil'],
    ['SHP-2045', 'CB-10239 · Rafi Akbar', 'Grab · Instant', 'Surabaya', 'Selesai'],
  ],
}

function AdminChrome({ children }: { children: React.ReactNode }) {
  const [storeOpen, setStoreOpen] = useState(true)
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
          <div className="admin-topbar-actions"><Link to="/admin/orders" className="admin-icon"><MaterialIcon name="notifications" /><i /></Link><button className={`store-toggle ${storeOpen ? '' : 'closed'}`} onClick={() => setStoreOpen(!storeOpen)}><MaterialIcon name="storefront" /> Toko: {storeOpen ? 'Buka' : 'Tutup'} <span /></button><Link to="/admin/settings" className="admin-profile"><ProductImage product={products[0]} /><b>Admin</b><MaterialIcon name="expand_more" /></Link></div>
        </header>
        {children}
      </section>
    </main>
  )
}

export function AdminModulePage() {
  const { module = 'orders' } = useParams()
  const key = (module in moduleMeta ? module : 'orders') as ModuleKey
  const meta = moduleMeta[key]
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Semua Status')
  const [modal, setModal] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const rows = useMemo(() => {
    if (key === 'products' || key === 'reports' || key === 'settings') return []
    return demoRows[key].filter((row) => row.join(' ').toLowerCase().includes(query.toLowerCase()) && (filter === 'Semua Status' || row[4] === filter))
  }, [filter, key, query])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setModal(null)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <AdminChrome>
      <div className="admin-module-page">
        <section className="module-heading">
          <div><span className="module-eyebrow"><MaterialIcon name={meta.icon} /> Cherish Operations</span><h1>{meta.title}</h1><p>{meta.description}</p></div>
          <button className="button primary" onClick={() => key === 'reports' ? setSaved(true) : setModal(meta.action)}><MaterialIcon name={key === 'settings' ? 'save' : key === 'reports' ? 'download' : 'add'} /> {meta.action}</button>
        </section>

        {saved && <div className="admin-toast"><MaterialIcon name="check_circle" /> Perubahan demo berhasil disimpan.</div>}

        {key === 'reports' ? <ReportsContent /> : key === 'settings' ? <SettingsContent onSave={() => setSaved(true)} /> : key === 'products' ? <ProductsContent onAction={setModal} /> : (
          <>
            <section className="module-kpis">
              <article><MaterialIcon name={meta.icon} /><div><span>Total Data</span><strong>{key === 'orders' ? '248' : key === 'customers' ? '1.284' : '24'}</strong></div></article>
              <article><MaterialIcon name="pending_actions" /><div><span>Perlu Tindakan</span><strong>{key === 'orders' ? '8' : '6'}</strong></div></article>
              <article><MaterialIcon name="check_circle" /><div><span>Selesai / Aktif</span><strong>{key === 'shipping' ? '18' : '22'}</strong></div></article>
              <article><MaterialIcon name="today" /><div><span>Hari Ini</span><strong>{key === 'production' ? '4' : '12'}</strong></div></article>
            </section>
            <section className="module-card">
              <div className="module-toolbar"><label><MaterialIcon name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Cari di ${meta.title.toLowerCase()}...`} /></label><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>Semua Status</option><option>Baru</option><option>Aktif</option><option>Dalam Proses</option><option>Selesai</option></select><button onClick={() => { setQuery(''); setFilter('Semua Status') }}><MaterialIcon name="restart_alt" /> Reset</button></div>
              <div className="module-table"><div className="module-row module-table-head"><span>ID</span><span>Nama / Pelanggan</span><span>Detail</span><span>Total / PIC</span><span>Status</span><span>Aksi</span></div>{rows.map((row) => <div className="module-row" key={row[0]}><b>{row[0]}</b><span>{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span><em className={`status ${row[4].toLowerCase().replaceAll(' ', '-')}`}>{row[4]}</em><div className="module-actions"><button onClick={() => setModal(`Detail ${row[0]}`)} aria-label="Lihat detail"><MaterialIcon name="visibility" /></button><button onClick={() => setModal(`Edit ${row[0]}`)} aria-label="Edit"><MaterialIcon name="edit" /></button></div></div>)}</div>
              {!rows.length && <div className="module-empty"><MaterialIcon name="search_off" /><strong>Data tidak ditemukan</strong><p>Coba ubah pencarian atau filter.</p></div>}
            </section>
          </>
        )}
      </div>
      {modal && <DemoModal title={modal} onClose={() => setModal(null)} onSubmit={submit} />}
    </AdminChrome>
  )
}

function ProductsContent({ onAction }: { onAction: (value: string) => void }) {
  return <section className="module-card"><div className="module-toolbar"><label><MaterialIcon name="search" /><input placeholder="Cari nama produk..." /></label><select><option>Semua Kategori</option><option>Roti</option><option>Pastry</option><option>Cake</option></select><select><option>Semua Status</option><option>Aktif</option><option>Stok Menipis</option></select></div><div className="product-admin-list">{products.slice(0, 7).map((product, index) => <article key={product.id}><ProductImage product={product} /><div><strong>{product.name}</strong><small>SKU: CH-{String(product.id).padStart(3, '0')}</small></div><span className="category-chip">{product.category}</span><b>{formatRupiah(product.price)}</b><span className={index === 3 ? 'stock low' : 'stock'}>{index === 3 ? '8 pcs' : `${28 + index * 3} pcs`}</span><label className="small-switch"><input type="checkbox" defaultChecked /><i /></label><button onClick={() => onAction(`Edit ${product.name}`)}><MaterialIcon name="edit" /></button></article>)}</div></section>
}

function ReportsContent() {
  return <><section className="module-kpis"><article><MaterialIcon name="payments" /><div><span>Omzet Bulan Ini</span><strong>Rp48,2 jt</strong></div></article><article><MaterialIcon name="shopping_bag" /><div><span>Total Pesanan</span><strong>248</strong></div></article><article><MaterialIcon name="trending_up" /><div><span>Rata-rata Order</span><strong>Rp194 rb</strong></div></article><article><MaterialIcon name="group" /><div><span>Pelanggan Aktif</span><strong>186</strong></div></article></section><section className="report-grid"><article className="module-card"><div className="admin-card-title"><h2>Tren Penjualan 30 Hari</h2><select><option>30 Hari Terakhir</option><option>Bulan Ini</option></select></div><div className="report-chart">{[32,45,38,62,55,72,69,88,75,94,82,100].map((height,index)=><span key={index} style={{height:`${height}%`}} />)}</div></article><article className="module-card report-summary"><h2>Ringkasan Kategori</h2>{[['Pastry','38%'],['Cake','31%'],['Roti','24%'],['Dessert','7%']].map(([name,value])=><div key={name}><span>{name}</span><strong>{value}</strong><i><b style={{width:value}} /></i></div>)}</article></section></>
}

function SettingsContent({ onSave }: { onSave: () => void }) {
  return <form className="settings-grid" onSubmit={(event) => { event.preventDefault(); onSave() }}><section className="module-card"><h2>Identitas Toko</h2><label>Nama toko<input defaultValue="Cherish Bakery" /></label><label>Email toko<input defaultValue="hello@cherishbakery.id" /></label><label>Nomor WhatsApp<input defaultValue="0812 3456 7890" /></label><label>Alamat<textarea defaultValue="Jl. Bakery Bahagia No. 18, Surabaya" /></label></section><section className="module-card"><h2>Jam Operasional</h2>{['Senin – Jumat','Sabtu','Minggu'].map((day,index)=><div className="settings-row" key={day}><span>{day}</span><input defaultValue={index === 2 ? '08:00 – 17:00' : '07:00 – 20:00'} /><label className="small-switch"><input type="checkbox" defaultChecked /><i /></label></div>)}<h2 className="settings-subtitle">Tema & Warna</h2><div className="color-swatches">{['#493528','#B78358','#226660','#C8798B','#803D52'].map((color)=><button type="button" key={color} style={{background:color}} aria-label={color} />)}</div><button className="button primary" type="submit"><MaterialIcon name="save" /> Simpan Pengaturan</button></section></form>
}

function DemoModal({ title, onClose, onSubmit }: { title: string; onClose: () => void; onSubmit: (event: FormEvent) => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><form className="demo-modal" onSubmit={onSubmit}><header><div><span className="module-eyebrow">Demo Form</span><h2>{title}</h2></div><button type="button" onClick={onClose} aria-label="Tutup"><MaterialIcon name="close" /></button></header><label>Nama / Judul<input required placeholder="Masukkan nama atau judul" /></label><label>Kategori<select><option>Pilih kategori</option><option>Roti</option><option>Pastry</option><option>Cake</option></select></label><label>Catatan<textarea placeholder="Tambahkan catatan demo..." /></label><footer><button type="button" className="button secondary" onClick={onClose}>Batal</button><button className="button primary">Simpan Demo</button></footer></form></div>
}
