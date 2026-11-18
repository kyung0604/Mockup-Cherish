import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import heroImage from '../assets/cherish-hero.png'
import { MaterialIcon } from '../components/MaterialIcon'
import { Brand } from '../components/Storefront'

type Mode = 'login' | 'register' | 'forgot'
const content = {
  login: { eyebrow: 'Welcome back', title: 'Masuk ke Cherish', copy: 'Lanjutkan momen manis Anda bersama kami.', submit: 'Masuk' },
  register: { eyebrow: 'Join our table', title: 'Buat Akun Baru', copy: 'Simpan alamat, pesanan, dan produk favorit Anda.', submit: 'Daftar Sekarang' },
  forgot: { eyebrow: 'We can help', title: 'Lupa Password?', copy: 'Masukkan email dan kami akan mengirim tautan pemulihan.', submit: 'Kirim Tautan' },
}

export function AuthPage({ mode }: { mode: Mode }) {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const submit = (event: FormEvent) => { event.preventDefault(); if (mode === 'forgot') setMessage('Tautan pemulihan demo telah dikirim.'); else navigate('/') }
  const item = content[mode]
  return <main className="auth-page"><Link className="auth-back" to="/"><MaterialIcon name="arrow_back" /> Kembali</Link><div className="auth-visual" style={{ backgroundImage: `linear-gradient(180deg, rgba(73,53,40,.08), rgba(50,37,30,.74)), url(${heroImage})` }}><Brand /><div><span className="script-accent">Baked for your moments</span><h2>Every bite holds<br />a little happiness.</h2><p>Roti artisan, pastry berlapis, dan cake istimewa—dibuat fresh setiap hari.</p></div></div><section className="auth-panel"><div className="auth-card"><span className="script-accent">{item.eyebrow}</span><h1>{item.title}</h1><p>{item.copy}</p><form onSubmit={submit}>{mode === 'register' && <label>Nama lengkap<div className="input-wrap"><MaterialIcon name="person" /><input required placeholder="Nama Anda" /></div></label>}<label>Email<div className="input-wrap"><MaterialIcon name="mail" /><input type="email" required placeholder="nama@email.com" /></div></label>{mode !== 'forgot' && <label>Password<div className="input-wrap"><MaterialIcon name="lock" /><input type={showPassword ? 'text' : 'password'} required minLength={6} placeholder="Minimal 6 karakter" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Tampilkan password"><MaterialIcon name={showPassword ? 'visibility_off' : 'visibility'} /></button></div></label>}{mode === 'login' && <div className="form-meta"><label><input type="checkbox" /> Ingat saya</label><Link to="/forgot-password">Lupa password?</Link></div>}<button className="button primary full">{item.submit}</button>{mode === 'login' && <Link className="button admin-demo full" to="/admin"><MaterialIcon name="dashboard" /> Masuk sebagai Admin Demo</Link>}{message && <div className="form-success">✓ {message}</div>}</form>{mode === 'login' && <p className="auth-switch">Belum punya akun? <Link to="/register">Daftar</Link></p>}{mode === 'register' && <p className="auth-switch">Sudah punya akun? <Link to="/login">Masuk</Link></p>}{mode === 'forgot' && <p className="auth-switch"><Link to="/login">Kembali ke halaman masuk</Link></p>}</div></section></main>
}
