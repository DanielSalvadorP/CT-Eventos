/**
 * ProgressBarRifa Component
 * 
 * Muestra barra de progreso visual de tickets vendidos vs disponibles
 */

export function ProgressBarRifa({ numerosUsados = 0, cantidadTotal = 1, rifaNombre = null }) {
  const porcentaje = Math.round((numerosUsados / cantidadTotal) * 100);
  const disponibles = cantidadTotal - numerosUsados;

  return (
    <div style={{ marginBottom: 'var(--space-lg)' }}>
      {rifaNombre && (
        <p style={{
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'bold',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-sm)',
          margin: 0
        }}>
          {rifaNombre}
        </p>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-sm)',
        gap: 'var(--space-sm)'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            backgroundColor: 'var(--color-gray-200)',
            borderRadius: 'var(--border-radius-lg)',
            height: '24px',
            overflow: 'hidden',
            border: '2px solid var(--color-gray-300)'
          }}>
            <div style={{
              backgroundColor: porcentaje < 50
                ? 'var(--color-success)'
                : porcentaje < 80
                  ? '#f59e0b'
                  : 'var(--color-error)',
              height: '100%',
              width: `${porcentaje}%`,
              transition: 'width 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {porcentaje > 10 && (
                <span style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 'var(--font-size-xs)'
                }}>
                  {porcentaje}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-text-secondary)'
      }}>
        <span>
          <strong style={{ color: 'var(--color-primary-green)' }}>{numerosUsados}</strong> Vendidos
        </span>
        <span>
          <strong style={{ color: 'var(--color-primary-green)' }}>{disponibles}</strong> Disponibles
        </span>
        <span>
          Total: <strong>{cantidadTotal}</strong>
        </span>
      </div>
    </div>
  );
}