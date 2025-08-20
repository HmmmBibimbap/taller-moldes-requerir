'use client'
import { useState } from 'react'

// Tipos TypeScript
type FormEvent = React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>

interface MoldeData {
  codigo: string
  area: string
  linea: string
  descripcion: string
}

interface FormData {
  requerimiento: string
  molde: string
  area: string
  linea: string
  descripcionMolde: string
  tipoServicio: string
  trabajoRealizar: string
  descripcionTrabajo: string
  ubicacionMolde: string
  solicitante: string
  piezaMuestra: string
}

export default function Solicitar() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Estados del formulario
  const [formData, setFormData] = useState<FormData>({
    requerimiento: '2024-009', // Auto-generado
    molde: '',
    area: '',
    linea: '',
    descripcionMolde: '',
    tipoServicio: '',
    trabajoRealizar: '',
    descripcionTrabajo: '',
    ubicacionMolde: '',
    solicitante: '',
    piezaMuestra: ''
  })

  // Datos mock - después vendrán de la base de datos
  const moldes: MoldeData[] = [
    { codigo: 'RW1013', area: '80 TON', linea: 'SMS', descripcion: 'Molde de inyección principal' },
    { codigo: 'CI0515', area: '210 TON', linea: 'SMS', descripcion: 'Molde cavidades múltiples' },
    { codigo: 'FM2581', area: 'FM', linea: 'Factory Machines', descripcion: 'Molde especializado FM' },
    { codigo: 'RW0879', area: '80 TON', linea: 'Production', descripcion: 'Molde runner estándar' }
  ]

  const tiposServicio: string[] = [
    'Correctivo',
    'Preventivo', 
    'Cambio de modelo',
    'Otro'
  ]

  const trabajosCorrectivo: string[] = [
    'Flash en cavidad',
    'Inserto movido',
    'Problema con runner',
    'Cavidad dañada',
    'Ajuste de temperatura',
    'Calibración'
  ]

  const trabajosPreventivo: string[] = [
    'Full Cleaning',
    'Mantenimiento programado',
    'Inspección general',
    'Cambio de refacciones'
  ]

  const ubicaciones: string[] = [
    'Máquina 1 - 80 TON',
    'Máquina 2 - 80 TON', 
    'Máquina 3 - 210 TON',
    'Máquina 4 - 210 TON',
    'Máquina FM-1',
    'Máquina FM-2',
    'N/A: Molde afuera de taller'
  ]

  const solicitantes: string[] = [
    'Juan Pérez - Supervisor',
    'Ana García - Operador',
    'Luis Escobar - Técnico',
    'María López - Supervisor',
    'Pedro Jiménez - Operador'
  ]

  // Manejar cambio de molde (auto-llenar campos)
  const handleMoldeChange = (codigo: string) => {
    const moldeSeleccionado = moldes.find(m => m.codigo === codigo)
    if (moldeSeleccionado) {
      setFormData({
        ...formData,
        molde: codigo,
        area: moldeSeleccionado.area,
        linea: moldeSeleccionado.linea,
        descripcionMolde: moldeSeleccionado.descripcion
      })
    }
  }

  // Obtener trabajos según tipo de servicio
  const getTrabajosDisponibles = (): string[] => {
    switch(formData.tipoServicio) {
      case 'Correctivo':
        return trabajosCorrectivo
      case 'Preventivo':
        return trabajosPreventivo
      default:
        return []
    }
  }

  // Limpiar formulario
  const limpiarDatos = () => {
    setFormData({
      requerimiento: '2024-009',
      molde: '',
      area: '',
      linea: '',
      descripcionMolde: '',
      tipoServicio: '',
      trabajoRealizar: '',
      descripcionTrabajo: '',
      ubicacionMolde: '',
      solicitante: '',
      piezaMuestra: ''
    })
  }

  // Validar y generar requerimiento
  const generarRequerimiento = () => {
    const camposRequeridos: (keyof FormData)[] = ['molde', 'tipoServicio', 'trabajoRealizar', 'descripcionTrabajo', 'ubicacionMolde', 'solicitante', 'piezaMuestra']
    const camposFaltantes = camposRequeridos.filter(campo => !formData[campo])
    
    if (camposFaltantes.length > 0) {
      alert('Por favor complete todos los campos requeridos antes de generar el requerimiento.')
      return
    }
    
    alert('¡Requerimiento generado exitosamente!')
    console.log('Datos del requerimiento:', formData)
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleMenu}>☰</button>
            <h1>Solicitud de Requerimiento de Trabajo</h1>
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
          <a href="/solicitar" className="menu-item active" onClick={() => setMenuOpen(false)}>
            <span className="menu-icon">➕</span>
            Solicitar
          </a>
          <a href="/actualizar" className="menu-item" onClick={() => setMenuOpen(false)}>
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
        <div className="form-container">
          <h2>Nuevo Requerimiento de Trabajo</h2>
          
          <form className="solicitud-form">
            {/* REQUERIMIENTO # */}
            <div className="form-group">
              <label>Requerimiento #</label>
              <input 
                type="text" 
                value={formData.requerimiento}
                disabled
                className="form-input disabled"
              />
              <small>Se genera automáticamente</small>
            </div>

            {/* MOLDE */}
            <div className="form-group">
              <label>Molde *</label>
              <select 
                value={formData.molde}
                onChange={(e: FormEvent) => handleMoldeChange(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Seleccionar molde...</option>
                {moldes.map(molde => (
                  <option key={molde.codigo} value={molde.codigo}>
                    {molde.codigo}
                  </option>
                ))}
              </select>
            </div>

            {/* INFO AUTO-LLENADA DEL MOLDE */}
            {formData.molde && (
              <div className="molde-info-grid">
                <div className="form-group">
                  <label>Área</label>
                  <input 
                    type="text" 
                    value={formData.area}
                    disabled
                    className="form-input disabled"
                  />
                </div>
                <div className="form-group">
                  <label>Línea</label>
                  <input 
                    type="text" 
                    value={formData.linea}
                    disabled
                    className="form-input disabled"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Descripción</label>
                  <input 
                    type="text" 
                    value={formData.descripcionMolde}
                    disabled
                    className="form-input disabled"
                  />
                </div>
              </div>
            )}

            {/* TIPO DE SERVICIO */}
            <div className="form-group">
              <label>Tipo de Servicio *</label>
              <select 
                value={formData.tipoServicio}
                onChange={(e: FormEvent) => setFormData({...formData, tipoServicio: e.target.value, trabajoRealizar: ''})}
                className="form-select"
                required
              >
                <option value="">Seleccionar tipo...</option>
                {tiposServicio.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            {/* TRABAJO A REALIZAR */}
            <div className="form-group">
              <label>Trabajo a realizar *</label>
              <select 
                value={formData.trabajoRealizar}
                onChange={(e: FormEvent) => setFormData({...formData, trabajoRealizar: e.target.value})}
                className="form-select"
                disabled={!formData.tipoServicio}
                required
              >
                <option value="">Seleccionar trabajo...</option>
                {getTrabajosDisponibles().map(trabajo => (
                  <option key={trabajo} value={trabajo}>{trabajo}</option>
                ))}
              </select>
            </div>

            {/* DESCRIPCIÓN DEL TRABAJO */}
            <div className="form-group">
              <label>Descripción del trabajo a realizar *</label>
              <textarea 
                value={formData.descripcionTrabajo}
                onChange={(e: FormEvent) => setFormData({...formData, descripcionTrabajo: e.target.value})}
                className="form-textarea"
                placeholder="Escriba información detallada sobre el trabajo que está solicitando; incluir las cavidades o zonas del molde afectadas..."
                rows={4}
                required
              ></textarea>
            </div>

            {/* UBICACIÓN DEL MOLDE */}
            <div className="form-group">
              <label>¿A dónde debe ir el técnico a buscar el molde? *</label>
              <select 
                value={formData.ubicacionMolde}
                onChange={(e: FormEvent) => setFormData({...formData, ubicacionMolde: e.target.value})}
                className="form-select"
                required
              >
                <option value="">Seleccionar ubicación...</option>
                {ubicaciones.map(ubicacion => (
                  <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
                ))}
              </select>
            </div>

            {/* SOLICITANTE */}
            <div className="form-group">
              <label>Solicitante *</label>
              <select 
                value={formData.solicitante}
                onChange={(e: FormEvent) => setFormData({...formData, solicitante: e.target.value})}
                className="form-select"
                required
              >
                <option value="">Seleccionar solicitante...</option>
                {solicitantes.map(solicitante => (
                  <option key={solicitante} value={solicitante}>{solicitante}</option>
                ))}
              </select>
            </div>

            {/* PIEZA MUESTRA */}
            <div className="form-group">
              <label>Pieza muestra *</label>
              <select 
                value={formData.piezaMuestra}
                onChange={(e: FormEvent) => setFormData({...formData, piezaMuestra: e.target.value})}
                className="form-select"
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* BOTONES */}
            <div className="form-buttons">
              <button type="button" onClick={limpiarDatos} className="btn-secondary">
                Borrar datos
              </button>
              <button type="button" onClick={generarRequerimiento} className="btn-primary">
                Generar requerimiento
              </button>
              <a href="/" className="btn-tertiary">
                Salir
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
