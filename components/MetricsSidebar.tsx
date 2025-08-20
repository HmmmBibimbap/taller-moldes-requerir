// En el futuro esto vendrá de la DB
interface MetricData {
  label: string
  value: string | number
  icon: string
  type: 'pending' | 'in-progress' | 'completed' | 'average'
}

// Datos mock - después vendrán de API
const mockMetrics: MetricData[] = [
  { label: 'Pendientes', value: 8, icon: '⏳', type: 'pending' },
  { label: 'En Proceso', value: 5, icon: '🔧', type: 'in-progress' },
  { label: 'Completados Hoy', value: 12, icon: '✅', type: 'completed' },
  { label: 'Tiempo Promedio', value: '2.5h', icon: '⏱️', type: 'average' }
]

export default function MetricsSidebar() {
  return (
    <aside className="metrics-sidebar">
      {mockMetrics.map((metric) => (
        <div key={metric.label} className={`metric-card-vertical ${metric.type}`}>
          <div className="metric-icon">{metric.icon}</div>
          <div className="metric-info">
            <h3>{metric.label}</h3>
            <span className="metric-number">{metric.value}</span>
          </div>
        </div>
      ))}
    </aside>
  )
}
