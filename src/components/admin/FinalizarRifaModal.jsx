import { useState } from 'react';
import { finalizarRifa } from '../../services/rifaService';

export function FinalizarRifaModal({ rifa, userId, onClose, onSuccess }) {
  const [numeroGanador, setNumeroGanador] = useState(rifa.numeroGanador || '');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirmar = async () => {
    if (!numeroGanador) {
      setError('Debes ingresar el número ganador');
      return;
    }

    const numero = parseInt(numeroGanador);
    if (numero < 1 || numero > rifa.cantidadNumeros) {
      setError(`El número debe estar entre 1 y ${rifa.cantidadNumeros}`);
      return;
    }

    try {
      setCargando(true);
      await finalizarRifa(userId, rifa.id, numero);
      onSuccess();
      onClose();
    } catch (err) {
      setError('Error al finalizar la rifa: ' + err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 'var(--border-radius-lg)',
        padding: 'var(--space-2xl)',
        maxWidth: '500px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ marginTop: 0, color: 'var(--color-text-primary)' }}>
          Finalizar Rifa: {rifa.nombre}
        </h2>

        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <label style={{
            display: 'block',
            marginBottom: 'var(--space-sm)',
            fontWeight: 'bold',
            color: 'var(--color-text-primary)'
          }}>
            Número Ganador
          </label>
          <input
            type="number"
            value={numeroGanador}
            onChange={(e) => setNumeroGanador(e.target.value)}
            min="1"
            max={rifa.cantidadNumeros}
            placeholder="Ingresa el número ganador"
            style={{
              width: '100%',
              padding: 'var(--space-md)',
              border: '1px solid var(--color-gray-300)',
              borderRadius: 'var(--border-radius-md)',
              fontSize: 'var(--font-size-base)',
              boxSizing: 'border-box'
            }}
          />
          <p style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            margin: 'var(--space-sm) 0 0 0'
          }}>
            Números disponibles: 1 a {rifa.cantidadNumeros}
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--space-md)',
            marginBottom: 'var(--space-lg)',
            color: '#991b1b',
            fontSize: 'var(--font-size-sm)'
          }}>
            {error}
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: 'var(--space-md)',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            disabled={cargando}
            style={{
              padding: 'var(--space-md) var(--space-lg)',
              backgroundColor: 'var(--color-gray-200)',
              color: 'var(--color-text-primary)',
              border: 'none',
              borderRadius: 'var(--border-radius-md)',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'bold',
              cursor: cargando ? 'not-allowed' : 'pointer',
              opacity: cargando ? 0.5 : 1
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            disabled={cargando}
            style={{
              padding: 'var(--space-md) var(--space-lg)',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--border-radius-md)',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'bold',
              cursor: cargando ? 'not-allowed' : 'pointer',
              opacity: cargando ? 0.5 : 1
            }}
          >
            {cargando ? 'Finalizando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}