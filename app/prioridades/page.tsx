'use client'
import { useState } from 'react'

interface Orden {
  id: string
  numero: string
  molde: string
  problema: string
  categoria: string
  prioridad?: {
    valor: number
    asignadaPor: string
    fecha: string
  }
  solicitante: string
  fechaCreacion: string
}

export default function Prioridades() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  
  // Estados del login
  const [loginData, setLoginData] = useState({
    usuario: '',
    password: ''
  })

  // Estado para gestión de prioridades
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('correctivos_80_210')
  const [nuevaPrioridad, setNuevaPrioridad] = useState('')
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<string | null>(null)

  // Datos mock - supervisores
  const supervisores = [
    { usuario: 'supervisor1', password: 'sup123', nombre: 'Luis Supervisor', rol: 'SUPERVISOR' },
    { usuario: 'supervisor2', password: 'sup123', nombre: 'María Jefa', rol: 'SUPERVISOR' },
    { usuario: 'admin', password: 'admin123', nombre: 'Administrador', rol: 'ADMIN' }
  ]

  // Datos mock - órdenes por categoría
  const ordenesPorCategoria: Record<string, Orden[]> = {
    correctivos_80_210: [
      {
        id: '1', numero: '2024-001', molde: 'RW1013', 
        problema: 'Flash en cavidad #3', categoria: 'correctivos_80_210',
        prioridad: { valor: 2.0, asignadaPor: 'Luis Supervisor', fecha: '2024-08-15' },
        solicitante: 'María López', fechaCreacion: '2024-08-15'
      },
      {
        id: '4', numero: '2024-004', molde: 'RW1017',
        problema: 'Cavidad dañada', categoria: 'correctivos_80_210',
        prioridad: { valor: 1.0, asignadaPor: 'María Jefa', fecha: '2024-08-16' },
        solicitante: 'Pedro García', fechaCreacion: '2024-08-16'
      }
    ],
    correctivos_fm: [
      {
        id: '2', numero: '2024-005', molde: 'FM2581',
        problema: 'Ajuste de temperatura', categoria: 'correctivos_fm',
        solicitante: 'Ana Ruiz', fechaCreacion: '2024-08-16'
      }
    ],
    preventivos: [
      {
        id: '3', numero: '2024-007', molde: 'RI0571',
        problema: 'Full Cleaning programado', categoria: 'preventivos',
        prioridad: { valor: 1.0, asignadaPor: 'Luis Supervisor', fecha: '2024-08-17' },
        solicitante: 'Sistema', fechaCreacion: '2024-08-17'
      }
    ]
  }

  const categorias = [
    { id: 'correctivos_80_210', nombre: 'Correctivos 80 y 210 TON' },
    { id: 'correctivos_fm', nombre: 'Correctivos FM' },
    { id: 'preventivos', nombre: 'Preventivos' },
    { id: 'otros', nombre: 'Otros' }
  ]

  // Manejar login
  const handleLogin = () => {
    const usuario = supervisores.find(s => 
      s.usuario === loginData.usuario && s.password === loginData.password
    )
    
    if (usuario) {
      setIsLoggedIn(true)
      setCurrentUser(usuario.nombre)
      setLoginData({ usuario: '', password: '' })
    } else {
      alert('Usuario o contraseña incorrectos. Solo supervisores pueden acceder.')
    }
  }

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser('')
    setOrdenSeleccionada(null)
  }

  // Validar y asignar prioridad
  const asignarPrioridad = (ordenId: string) => {
    const valor = parseFloat(nuevaPrioridad)
    
    if (isNaN(valor) || valor <= 0) {
      alert('Ingresa un valor de prioridad válido (mayor a 0)')
      return
    }

    const ordenesCategoria = ordenesPorCategoria[categoriaSeleccionada]
    const prioridadExiste = ordenesCategoria.some(orden => 
      orden.prioridad?.valor === valor && orden.id !== ordenId
    )

    if (prioridadExiste) {
      alert(`La prioridad ${valor} ya existe en esta categoría. Usa un valor diferente (ej: ${valor - 0.1} o ${valor + 0.1})`)
      return
    }

    alert(`Prioridad ${valor} asignada exitosamente por ${currentUser}`)
    setNuevaPrioridad('')
    setOrdenSeleccionada(null)
  }

  const getPrioridadLabel = (valor?: number) => {
    if (!valor) return 'Sin asignar'
    if (valor < 2) return 'Alta'
    if (valor < 3) return 'Media'
    return 'Baja'
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleMenu}>☰</button>
            <h1>Gestión de Prioridades</h1>
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
          <a href="/actualizar" className="menu-item" onClick={() => setMenuOpen(false)}>
            <span className="menu-icon">✏️</span>
            Actualizar
          </a>
          <a href="/prioridades" className="menu-item active" onClick={() => setMenuOpen(false)}>
            <span className="menu-icon">⚡</span>
            Prioridades
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
          /* LOGIN PARA SUPERVISORES */
          <div className="login-container">
            <div className="login-card">
              <h2>Acceso para Supervisores</h2>
              <p>Solo supervisores pueden gestionar prioridades de órdenes</p>
              
              <form className="login-form">
                <div className="form-group">
                  <label>Usuario</label>
                  <input 
                    type="text" 
                    value={loginData.usuario}
                    onChange={(e) => setLoginData({...loginData, usuario: e.target.value})}
                    className="form-input"
                    placeholder="Usuario de supervisor"
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
                    placeholder="Contraseña"
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
                  • supervisor1 / sup123<br/>
                  • supervisor2 / sup123<br/>
                  • admin / admin123
                </small>
              </div>
            </div>
          </div>
        ) : (
          /* GESTIÓN DE PRIORIDADES */
          <div className="priorities-management">
            <div className="management-header">
              <div className="header-info">
                <h2>Gestión de Prioridades</h2>
                <p>Supervisor: <strong>{currentUser}</strong></p>
              </div>
              <button onClick={handleLogout} className="btn-secondary">
                Cerrar Sesión
              </button>
            </div>

            {/* SELECTOR DE CATEGORÍA */}
            <div className="category-selector">
              <label>Categoría:</label>
              <select 
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="form-select"
              >
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>

            {/* LISTA DE ÓRDENES CON PRIORIDADES */}
            <div className="priorities-list">
              <h3>{categorias.find(c => c.id === categoriaSeleccionada)?.nombre}</h3>
              
              {ordenesPorCategoria[categoriaSeleccionada]?.map(orden => (
                <div key={orden.id} className="priority-card">
                  <div className="order-info">
                    <div className="order-header">
                      <span className="order-number">{orden.numero}</span>
                      <span className={`priority-current ${getPrioridadLabel(orden.prioridad?.valor).toLowerCase()}`}>
                        {orden.prioridad ? 
                          `${orden.prioridad.valor} (${getPrioridadLabel(orden.prioridad.valor)})` 
                          : 'Sin prioridad'
                        }
                      </span>
                    </div>
                    <p><strong>Molde:</strong> {orden.molde}</p>
                    <p><strong>Problema:</strong> {orden.problema}</p>
                    {orden.prioridad && (
                      <p><strong>Asignada por:</strong> {orden.prioridad.asignadaPor} el {orden.prioridad.fecha}</p>
                    )}
                  </div>
                  
                  <div className="priority-actions">
                    {ordenSeleccionada === orden.id ? (
                      <div className="priority-input">
                        <input 
                          type="number" 
                          step="0.1"
                          value={nuevaPrioridad}
                          onChange={(e) => setNuevaPrioridad(e.target.value)}
                          className="form-input"
                          placeholder="1.0"
                        />
                        <button 
                          onClick={() => asignarPrioridad(orden.id)}
                          className="btn-primary"
                        >
                          Asignar
                        </button>
                        <button 
                          onClick={() => setOrdenSeleccionada(null)}
                          className="btn-secondary"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setOrdenSeleccionada(orden.id)}
                        className="btn-primary"
                      >
                        {orden.prioridad ? 'Cambiar' : 'Asignar'} Prioridad
                      </button>
                    )}
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
