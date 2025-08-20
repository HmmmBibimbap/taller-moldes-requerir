'use client'
import { useState } from 'react'

interface Orden {
  id: string
  numero: string
  molde: string
  problema: string
  estado: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado'
  prioridad: 'alta' | 'media' | 'baja'
  tecnico?: string
  solicitante: string
  fechaCreacion: string
  ubicacion: string
}

export default function Actualizar() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  
  // Estados del login
  const [loginData, setLoginData] = useState({
    usuario: '',
    password: ''
  })

  // Estados de la actualización
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<Orden | null>(null)
  const [filtroEstado, setFiltroEstado] = useState('')
  const [busqueda, setBusqueda] = useState('')

  // Datos mock - usuarios técnicos
  const tecnicos = [
    { usuario: 'juan.perez', password: 'tech123', nombre: 'Juan Pérez', rol: 'TECNICO' },
    { usuario: 'ana.garcia', password: 'tech123', nombre: 'Ana García', rol: 'TECNICO' },
    { usuario: 'luis.escobar', password: 'tech123', nombre: 'Luis Escobar', rol: 'TECNICO' },
    { usuario: 'admin', password: 'admin123', nombre: 'Administrador', rol: 'ADMIN' }
  ]

  // Datos mock - órdenes
  const ordenes: Orden[] = [
    {
      id: '1',
      numero: '2024-001',
      molde: 'RW1013',
      problema: 'Flash en cavidad #3',
      estado: 'pendiente',
      prioridad: 'alta',
      solicitante: 'María López',
      fechaCreacion: '2024-08-15',
      ubicacion: 'Máquina 1 - 80 TON'
    },
    {
      id: '2', 
      numero: '2024-002',
      molde: 'CI0515',
      problema: 'Inserto movido',
      estado: 'en_proceso',
      prioridad: 'media',
      tecnico: 'Juan Pérez',
      solicitante: 'Pedro Jiménez',
      fechaCreacion: '2024-08-16',
      ubicacion: 'Máquina 3 - 210 TON'
    },
    {
      id: '3',
      numero: '2024-003',
      molde: 'RW0879',
      problema: 'Problema con runner',
      estado: 'pendiente',
      prioridad: 'baja',
      solicitante: 'Ana García',
      fechaCreacion: '2024-08-17',
      ubicacion: 'N/A: Molde afuera de taller'
    }
  ]

  // Manejar login
  const handleLogin = () => {
    const usuario = tecnicos.find(t => 
      t.usuario === loginData.usuario && t.password === loginData.password
    )
    
    if (usuario) {
      setIsLoggedIn(true)
      setCurrentUser(usuario.nombre)
      setLoginData({ usuario: '', password: '' })
    } else {
      alert('Usuario o contraseña incorrectos')
    }
  }

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser('')
    setOrdenSeleccionada(null)
  }

  // Filtrar órdenes
  const ordenesFiltradas = ordenes.filter(orden => {
    const coincideBusqueda = orden.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
                            orden.molde.toLowerCase().includes(busqueda.toLowerCase()) ||
                            orden.problema.toLowerCase().includes(busqueda.toLowerCase())
    
    const coincideEstado = filtroEstado === '' || orden.estado === filtroEstado
    
    return coincideBusqueda && coincideEstado
  })

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleMenu}>☰</button>
            <h1>Actualizar Órdenes de Trabajo</h1>
            <button 
              className="dark-mode-toggle" 
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ LATERAL */}
      <nav className={`sidebar-menu ${menuOpen ? 'active' : ''}`}>
        <div className="menu-items">
          <a href="/" className="menu-item" onClick={() => setMenuOpen(false)}>
            <span className="menu-icon">📊</span>
            Dashboard
          </a>
          <a href="/solicitar" className="menu-item" onClick={() => setMenuOpen(false)}>
            <span className="menu-icon">➕</span>
            Solicitar
          </a>
          <a href="/actualizar" className="menu-item active" onClick={() => setMenuOpen(false)}>
            <span className="menu-icon">✏️</span>
            Actualizar
          </a>
          <a href="/historial" className="menu-item" onClick={() => setMenuOpen(false)}>
            <span className="menu-icon">📋</span>
            Historial
          </a>
          <a href="/reportes" className="menu-item" onClick={() => setMenuOpen(false)}>
            <span className="menu-icon">📈</span>
            Reportes
          </a>
        </div>
      </nav>

      {/* OVERLAY */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="form-main-content">
        {!isLoggedIn ? (
          /* FORMULARIO DE LOGIN */
          <div className="login-container">
            <div className="login-card">
              <h2>Acceso para Técnicos</h2>
              <p>Solo personal autorizado puede actualizar órdenes de trabajo</p>
              
              <form className="login-form">
                <div className="form-group">
                  <label>Usuario</label>
                  <input 
                    type="text" 
                    value={loginData.usuario}
                    onChange={(e) => setLoginData({...loginData, usuario: e.target.value})}
                    className="form-input"
                    placeholder="Ingresa tu usuario"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Contraseña</label>
                  <input 
                    type="password" 
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="form-input"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>

                <div className="login-buttons">
                  <button type="button" onClick={handleLogin} className="btn-primary">
                    Iniciar Sesión
                  </button>
                  <a href="/" className="btn-tertiary">
                    Volver al Dashboard
                  </a>
                </div>
              </form>

              <div className="login-help">
                <small>
                  <strong>Usuarios de prueba:</strong><br/>
                  • juan.perez / tech123<br/>
                  • ana.garcia / tech123<br/>
                  • admin / admin123
                </small>
              </div>
            </div>
          </div>
        ) : (
          /* LISTA DE ÓRDENES DESPUÉS DEL LOGIN */
          <div className="orders-management">
            <div className="management-header">
              <div className="header-info">
                <h2>Gestión de Órdenes</h2>
                <p>Bienvenido, <strong>{currentUser}</strong></p>
              </div>
              <button onClick={handleLogout} className="btn-secondary">
                Cerrar Sesión
              </button>
            </div>

            {/* FILTROS Y BÚSQUEDA */}
            <div className="filters-section">
              <div className="search-group">
                <label>Buscar orden</label>
                <input 
                  type="text" 
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="form-input"
                  placeholder="Número, molde o problema..."
                />
              </div>
              <div className="filter-group">
                <label>Filtrar por estado</label>
                <select 
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="form-select"
                >
                  <option value="">Todos los estados</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="completado">Completados</option>
                  <option value="cancelado">Cancelados</option>
                </select>
              </div>
            </div>

            {/* LISTA DE ÓRDENES */}
            <div className="orders-list-management">
              {ordenesFiltradas.map(orden => (
                <div key={orden.id} className={`order-management-card ${orden.prioridad}`}>
                  <div className="order-info">
                    <div className="order-main-info">
                      <span className="order-number">{orden.numero}</span>
                      <span className={`status-badge ${orden.estado}`}>
                        {orden.estado.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="order-details">
                      <p><strong>Molde:</strong> {orden.molde}</p>
                      <p><strong>Problema:</strong> {orden.problema}</p>
                      <p><strong>Ubicación:</strong> {orden.ubicacion}</p>
                      <p><strong>Solicitante:</strong> {orden.solicitante}</p>
                      {orden.tecnico && <p><strong>Técnico:</strong> {orden.tecnico}</p>}
                    </div>
                  </div>
                  <div className="order-actions">
                    <button 
                      onClick={() => setOrdenSeleccionada(orden)}
                      className="btn-primary"
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
