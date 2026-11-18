type AdminNavItem = { icon: string; label: string; path: string; badge?: string }

export const adminNavItems: AdminNavItem[] = [
  { icon: 'dashboard', label: 'Dashboard', path: '/admin' },
  { icon: 'receipt_long', label: 'Pesanan', path: '/admin/orders', badge: '8' },
  { icon: 'restaurant', label: 'Produksi', path: '/admin/production' },
  { icon: 'inventory_2', label: 'Produk & Katalog', path: '/admin/products' },
  { icon: 'sell', label: 'Promo & Voucher', path: '/admin/promos' },
  { icon: 'group', label: 'Pelanggan', path: '/admin/customers' },
  { icon: 'local_shipping', label: 'Pengiriman', path: '/admin/shipping' },
  { icon: 'monitoring', label: 'Laporan', path: '/admin/reports' },
  { icon: 'settings', label: 'Pengaturan', path: '/admin/settings' },
]
