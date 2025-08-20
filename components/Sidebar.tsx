'use client'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <nav className={`sidebar-menu ${isOpen ? 'active' : ''}`}>
        <div className="menu-items">
          <a href="/" className="menu-item active" onClick={onClose}>
            <span className="menu-icon">📊</span>
            Dashboard
          </a>
          <a href="/solicitar" className="menu-item" onClick={onClose}>
            <span className="menu-icon">➕</span>
            Solicitar
          </a>
          <a href="/actualizar" className="menu-item" onClick={onClose}>
            <span className="menu-icon">✏️</span>
            Actualizar
          </a>
          <a href="/historial" className="menu-item" onClick={onClose}>
            <span className="menu-icon">📋</span>
            Historial
          </a>
          <a href="/reportes" className="menu-item" onClick={onClose}>
            <span className="menu-icon">📈</span>
            Reportes
          </a>
        </div>
      </nav>

      {isOpen && <div className="menu-overlay" onClick={onClose}></div>}
    </>
  )
}
