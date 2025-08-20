'use client'
import { useState } from 'react'

interface Orden {
  id: string
  numero: string
  molde: string
  area: string
  linea: string
  problema: string
  ubicacion: string
  solicitante: string
  estado: string
  fechaCreacion: string
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

  // Estados para modales
  const [modalActualizar, setModalActualizar] = useState(false)
  const [modalCerrar, setModalCerrar] = useState(false)
  const [modalCancelar, setModalCancelar] = useState(false)
  const [modalInformacion, setModalInformacion] = useState(false)
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<Orden | null>(null)

  // Estados para formularios de modales
  const [formActualizar, setFormActualizar] = useState({
    estado: '',
    realizadoPor: '',
    justificacion: '',
    descripcionTrabajo: ''
  })

  const [formCerrar, setFormCerrar] = useState({
    realizo: '',
    descripcionTrabajo: '',
    refacciones: '',
    proveedorOrden: '',
    reparoInsertos: '',
    colocoInsertos: '',
    cavidadesActivas: '',
    cavidadesTotales: ''
  })

  const [formCancelar, setFormCancelar] = useState({
    canceladoPor: '',
    solicitadoPor: '',
    razonCancelacion: ''
  })

  // Datos mock
  const usuarios = [
    { usuario: 'juan.perez', password: 'tech123', nombre: 'Juan Pérez', rol: 'TECNICO' },
    { usuario: 'ana.garcia', password: 'tech123', nombre: 'Ana García', rol: 'TECNICO' },
    { usuario: 'admin', password: 'admin123', nombre: 'Administrador', rol: 'ADMIN' }
  ]

  const tecnicos = [
    'Juan Pérez', 'Ana García', 'Carlos López', 'María Rodríguez', 'Pedro Martínez'
  ]

  const ordenes: Orden[] = [
    {
      id: '1', numero: '2024-001', molde: 'RW1013', area: 'Carrocería', linea: 'Línea 1',
      problema: 'Flash en cavidad #3', ubicacion: 'Máquina 1 - 80 TON', solicitante: 'María López',
      estado: 'PENDIENTE', fechaCreacion: '2024-08-15'
    },
    {
      id: '2', numero: '2024-003', molde: 'RW0879', area: 'Interior', linea: 'Línea 2',
      problema: 'Problema con runner', ubicacion: 'N/A: Molde afuera de taller', solicitante: 'Ana García',
      estado: 'PENDIENTE', fechaCreacion: '2024-08-16'
    }
  ]

  // Función para obtener estados disponibles según ubicación
  const getEstadosDisponibles = (ubicacion: string, estadoActual: string) => {
    const esMaquina = ubicacion.includes('Máquina') || ubicacion.includes('TON')
    
    if (estadoActual === 'PENDIENTE') {
      return ['Se inicia trabajo']
    } else if (estadoActual === 'EN_PROCESO') {
      if (esMaquina) {
        return ['Se decide bajar molde', 'Cambio de personal']
      } else {
        return ['Cambio de personal']
      }
    }
    return []
  }

  // Funciones de login
  const handleLogin = () => {
    const usuario = usuarios.find(u => 
      u.usuario === loginData.usuario && u.password === loginData.password
    )
    
    if (usuario) {
      setIsLoggedIn(true)
      setCurrentUser(usuario.nombre)
      setLoginData({ usuario: '', password: '' })
    } else {
      alert('Usuario o contraseña incorrectos')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser('')
    cerrarTodosModales()
  }

  // Funciones de modales
  const abrirModalActualizar = (orden: Orden) => {
    setOrdenSeleccionada(orden)
    setFormActualizar({
      estado: '',
      realizadoPor: currentUser,
      justificacion: '',
      descripcionTrabajo: ''
    })
    setModalActualizar(true)
  }

  const abrirModalCerrar = (orden: Orden) => {
    if (orden.estado === 'PENDIENTE') {
      alert('No es posible cerrar un requerimiento que no se ha iniciado')
      return
    }
    if (orden.estado === 'Cambio de personal' || orden.estado === 'Se decide bajar molde') {
      alert('No es posible cerrar un requerimiento con estado de interrupción')
      return
    }
    
    setOrdenSeleccionada(orden)
    setFormCerrar({
      realizo: currentUser,
      descripcionTrabajo: '',
      refacciones: '',
      proveedorOrden: '',
      reparoInsertos: '',
      colocoInsertos: '',
      cavidadesActivas: '',
      cavidadesTotales: ''
    })
    setModalCerrar(true)
  }

  const abrirModalCancelar = (orden: Orden) => {
    setOrdenSeleccionada(orden)
    setFormCancelar({
      canceladoPor: currentUser,
      solicitadoPor: '',
      razonCancelacion: ''
    })
    setModalCancelar(true)
  }

  const cerrarTodosModales = () => {
    setModalActualizar(false)
    setModalCerrar(false)
    setModalCancelar(false)
    setModalInformacion(false)
    setOrdenSeleccionada(null)
  }

  // Procesar actualización
  const procesarActualizacion = () => {
    if (!formActualizar.estado || !formActualizar.justificacion || !formActualizar.descripcionTrabajo) {
      alert('Todos los campos son obligatorios')
      return
    }

    console.log('Actualizando orden:', ordenSeleccionada?.numero, formActualizar)
    alert(`Requerimiento ${ordenSeleccionada?.numero} actualizado exitosamente`)
    cerrarTodosModales()
  }

  // Procesar cierre
  const procesarCierre = () => {
    if (!formCerrar.descripcionTrabajo) {
      alert('La descripción del trabajo es obligatoria')
      return
    }

    if (formCerrar.cavidadesActivas && formCerrar.cavidadesTotales) {
      if (parseInt(formCerrar.cavidadesActivas) > parseInt(formCerrar.cavidadesTotales)) {
        alert('Las cavidades activas no pueden ser mayores a las cavidades totales')
        return
      }
    }

    console.log('Cerrando orden:', ordenSeleccionada?.numero, formCerrar)
    alert(`Requerimiento ${ordenSeleccionada?.numero} cerrado exitosamente. Se ha enviado notificación por correo.`)
    cerrarTodosModales()
  }

  // Procesar cancelación
  const procesarCancelacion = () => {
    if (!formCancelar.solicitadoPor || !formCancelar.razonCancelacion) {
      alert('Todos los campos son obligatorios')
      return
    }

    console.log('Cancelando orden:', ordenSeleccionada?.numero, formCancelar)
    alert(`Requerimiento ${ordenSeleccionada?.numero} cancelado. Se ha enviado notificación por correo.`)
    cerrarTodosModales()
  }

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
          <a href="/prioridades" className="menu-item" onClick={() => setMenuOpen(false)}>
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
          /* LOGIN */
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
          /* GESTIÓN DE ÓRDENES */
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

            <div className="orders-list-management">
              {ordenes.map(orden => (
                <div key={orden.id} className="order-management-card">
                  <div className="order-info">
                    <div className="order-main-info">
                      <span className="order-number">{orden.numero}</span>
                      <span className={`status-badge ${orden.estado.toLowerCase()}`}>
                        {orden.estado}
                      </span>
                    </div>
                    <div className="order-details">
                      <p><strong>Molde:</strong> {orden.molde}</p>
                      <p><strong>Problema:</strong> {orden.problema}</p>
                      <p><strong>Ubicación:</strong> {orden.ubicacion}</p>
                      <p><strong>Solicitante:</strong> {orden.solicitante}</p>
                    </div>
                  </div>
                  
                  <div className="order-actions">
                    <button 
                      onClick={() => abrirModalActualizar(orden)}
                      className="btn-primary"
                    >
                      Actualizar Estado
                    </button>
                    <button 
                      onClick={() => abrirModalCerrar(orden)}
                      className="btn-primary"
                    >
                      Cerrar Requerimiento
                    </button>
                    <button 
                      onClick={() => abrirModalCancelar(orden)}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={() => setModalInformacion(true)}
                      className="btn-tertiary"
                    >
                      + Información
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL ACTUALIZAR ESTADO */}
        {modalActualizar && ordenSeleccionada && (
          <div className="modal-overlay" onClick={cerrarTodosModales}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Actualizar Estado - {ordenSeleccionada.numero}</h3>
              
              <div className="form-group">
                <label>Estado del Requerimiento</label>
                <select 
                  value={formActualizar.estado}
                  onChange={(e) => setFormActualizar({...formActualizar, estado: e.target.value})}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar estado...</option>
                  {getEstadosDisponibles(ordenSeleccionada.ubicacion, ordenSeleccionada.estado).map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Realizado por</label>
                <select 
                  value={formActualizar.realizadoPor}
                  onChange={(e) => setFormActualizar({...formActualizar, realizadoPor: e.target.value})}
                  className="form-select"
                  required
                >
                  {tecnicos.map(tecnico => (
                    <option key={tecnico} value={tecnico}>{tecnico}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Justificación del cambio</label>
                <textarea 
                  value={formActualizar.justificacion}
                  onChange={(e) => setFormActualizar({...formActualizar, justificacion: e.target.value})}
                  className="form-textarea"
                  placeholder="Explique la razón del cambio de estado..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción del trabajo realizado hasta el momento</label>
                <textarea 
                  value={formActualizar.descripcionTrabajo}
                  onChange={(e) => setFormActualizar({...formActualizar, descripcionTrabajo: e.target.value})}
                  className="form-textarea"
                  placeholder="Describa el avance realizado..."
                  required
                />
              </div>

              <div className="modal-buttons">
                <button onClick={procesarActualizacion} className="btn-primary">
                  Actualizar Requerimiento
                </button>
                <button onClick={cerrarTodosModales} className="btn-secondary">
                  Regresar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL CERRAR REQUERIMIENTO */}
        {modalCerrar && ordenSeleccionada && (
          <div className="modal-overlay" onClick={cerrarTodosModales}>
            <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
              <h3>Cerrar Requerimiento - {ordenSeleccionada.numero}</h3>
              
              <div className="form-group">
                <label>Realizó</label>
                <select 
                  value={formCerrar.realizo}
                  onChange={(e) => setFormCerrar({...formCerrar, realizo: e.target.value})}
                  className="form-select"
                  required
                >
                  {tecnicos.map(tecnico => (
                    <option key={tecnico} value={tecnico}>{tecnico}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Descripción del trabajo realizado</label>
                <textarea 
                  value={formCerrar.descripcionTrabajo}
                  onChange={(e) => setFormCerrar({...formCerrar, descripcionTrabajo: e.target.value})}
                  className="form-textarea"
                  placeholder="Describa el trabajo completado..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Refacciones reemplazadas</label>
                <textarea 
                  value={formCerrar.refacciones}
                  onChange={(e) => setFormCerrar({...formCerrar, refacciones: e.target.value})}
                  className="form-textarea"
                  placeholder="Números de parte de las refacciones utilizadas..."
                />
              </div>

              <div className="form-group">
                <label>Proveedor y #Orden</label>
                <input 
                  type="text"
                  value={formCerrar.proveedorOrden}
                  onChange={(e) => setFormCerrar({...formCerrar, proveedorOrden: e.target.value})}
                  className="form-input"
                  placeholder="Proveedor y número de orden..."
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>¿Se repararon insertos?</label>
                  <select 
                    value={formCerrar.reparoInsertos}
                    onChange={(e) => setFormCerrar({...formCerrar, reparoInsertos: e.target.value})}
                    className="form-select"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>¿Se colocaron insertos para cambio de modelo?</label>
                  <select 
                    value={formCerrar.colocoInsertos}
                    onChange={(e) => setFormCerrar({...formCerrar, colocoInsertos: e.target.value})}
                    className="form-select"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Cavidades activas</label>
                  <input 
                    type="number"
                    value={formCerrar.cavidadesActivas}
                    onChange={(e) => setFormCerrar({...formCerrar, cavidadesActivas: e.target.value})}
                    className="form-input"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Cavidades totales</label>
                  <input 
                    type="number"
                    value={formCerrar.cavidadesTotales}
                    onChange={(e) => setFormCerrar({...formCerrar, cavidadesTotales: e.target.value})}
                    className="form-input"
                    min="0"
                  />
                </div>
              </div>

              <div className="modal-buttons">
                <button onClick={procesarCierre} className="btn-primary">
                  Cerrar Requerimiento
                </button>
                <button onClick={cerrarTodosModales} className="btn-secondary">
                  Regresar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL CANCELAR REQUERIMIENTO */}
        {modalCancelar && ordenSeleccionada && (
          <div className="modal-overlay" onClick={cerrarTodosModales}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Cancelar Requerimiento - {ordenSeleccionada.numero}</h3>
              
              <p>¿Está seguro que desea cancelar este requerimiento?</p>
              
              <div className="form-group">
                <label>Cancelado por</label>
                <select 
                  value={formCancelar.canceladoPor}
                  onChange={(e) => setFormCancelar({...formCancelar, canceladoPor: e.target.value})}
                  className="form-select"
                  required
                >
                  {tecnicos.map(tecnico => (
                    <option key={tecnico} value={tecnico}>{tecnico}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>La cancelación fue solicitada por</label>
                <input 
                  type="text"
                  value={formCancelar.solicitadoPor}
                  onChange={(e) => setFormCancelar({...formCancelar, solicitadoPor: e.target.value})}
                  className="form-input"
                  placeholder="Nombre de quien solicita la cancelación..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Describa la razón por la cual se canceló el trabajo</label>
                <textarea 
                  value={formCancelar.razonCancelacion}
                  onChange={(e) => setFormCancelar({...formCancelar, razonCancelacion: e.target.value})}
                  className="form-textarea"
                  placeholder="Justificación de la cancelación..."
                  required
                />
              </div>

              <div className="modal-buttons">
                <button onClick={procesarCancelacion} className="btn-primary">
                  Cancelar Requerimiento
                </button>
                <button onClick={cerrarTodosModales} className="btn-secondary">
                  Regresar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL INFORMACIÓN */}
        {modalInformacion && (
          <div className="modal-overlay" onClick={cerrarTodosModales}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Historial de Cambios</h3>
              
              <div className="info-content">
                <p><strong>Historial de estados anteriores:</strong></p>
                <ul>
                  <li>2024-08-15 10:30 - Se inicia trabajo (Juan Pérez)</li>
                  <li>2024-08-15 12:00 - Cambio de personal - Salida a comida (Juan Pérez)</li>
                  <li>2024-08-15 13:00 - Se retoma trabajo (Ana García)</li>
                </ul>
                
                <p><strong>Comentarios anteriores:</strong></p>
                <p>"Se detectó problema en cavidad #3, requiere limpieza profunda del canal."</p>
              </div>

              <div className="modal-buttons">
                <button onClick={cerrarTodosModales} className="btn-secondary">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
