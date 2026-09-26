import { useEffect, useState } from 'react';
import { database } from '../../services/firebase';
import { ref, onValue } from 'firebase/database';

/**
 * ProgressBarRifa Component
 * 
 * Muestra barra de progreso visual de tickets vendidos vs disponibles
 */

export function ProgressBarRifa({ numerosUsados = 0, cantidadTotal = 1, rifaNombre = null, rifaId = null }) {
  const [datosActuales, setDatosActuales] = useState({
    numerosUsados,
    cantidadTotal
  });

  useEffect(() => {
    if (!rifaId) {
      setDatosActuales({ numerosUsados, cantidadTotal });
      return;
    }

    // Suscribirse a cambios en tiempo real
    const rifaRef = ref(database, `rifas/${rifaId}`);
    const unsubscribe = onValue(rifaRef, (snapshot) => {
      if (snapshot.exists()) {
        const rifa = snapshot.val();
        setDatosActuales({
          numerosUsados: rifa.numerosUsados?.length || 0,
          cantidadTotal: rifa.cantidadNumeros
        });
      }
    });

    return () => unsubscribe();
  }, [rifaId]);

  const porcentaje = Math.round((datosActuales.numerosUsados / datosActuales.cantidadTotal) * 100);
  const disponibles = datosActuales.cantidadTotal - datosActuales.numerosUsados;

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
        <strong style={{ color: 'var(--color-primary-green)' }}>{datosActuales.numerosUsados}</strong> Vendidos
        </span>
        <span>
          <strong style={{ color: 'var(--color-primary-green)' }}>{disponibles}</strong> Disponibles
        </span>
        <span>
          Total: <strong>{datosActuales.cantidadTotal}</strong>
        </span>
      </div>
    </div>
  );
}