/**
 * ConfigSection Component
 * 
 * Panel para configurar el rango de números de la rifa
 */

import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function ConfigSection({ config, estadisticas, onSaveConfig, loading }) {
  const [numeroInicio, setNumeroInicio] = useState(config?.numeroInicio || 11111);
  const [cantidadNumeros, setCantidadNumeros] = useState(config?.cantidadNumeros || 10000);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setError(null);

    if (!numeroInicio || !cantidadNumeros) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (Number(cantidadNumeros) <= 0) {
      setError('La cantidad debe ser mayor a 0');
      return;
    }

    const resultado = await onSaveConfig(numeroInicio, cantidadNumeros);
    
    if (!resultado.exito) {
      setError(resultado.error);
    }
  };

  return (
    <div className="card" style={{color: 'grey'}}>
      <div className="card-header">
        <h3 style={{color: 'grey'}}>Configurar Rango de Números</h3>
      </div>

      <div className="card-body">
        {error && <div className="alert alert-error">{error}</div>}

        <div className="grid-2">
          <Input
            label="Número Inicial"
            type="number"
            value={numeroInicio}
            onChange={(e) => setNumeroInicio(e.target.value)}
            helperText="Ej: 11111"
            disabled={loading}
          />

          <Input
            label="Cantidad de Números"
            type="number"
            value={cantidadNumeros}
            onChange={(e) => setCantidadNumeros(e.target.value)}
            helperText="Ej: 10000"
            disabled={loading}
          />
        </div>

        {estadisticas && (
          <div className="grid-3" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="stat-box">
              <div className="stat-label">Total de Números</div>
              <div className="stat-value">{estadisticas.totalNumeros.toLocaleString()}</div>
            </div>

            <div className="stat-box">
              <div className="stat-label">Números Usados</div>
              <div className="stat-value">{estadisticas.numerosUsados}</div>
              <div className="stat-percent">{estadisticas.porcentajeUsado}% del total</div>
            </div>

            <div className="stat-box">
              <div className="stat-label">Disponibles</div>
              <div className="stat-value">{estadisticas.disponibles.toLocaleString()}</div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 'var(--space-lg)' }}>
          <Button
            onClick={handleSave}
            variant="primary"
            size="large"
            loading={loading}
            className="btn-block"
          >
            Guardar Configuración
          </Button>
        </div>

        <p style={{ marginTop: 'var(--space-lg)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          ⚠️ Al guardar, se resetean los números usados. Usa esto solo al iniciar una nueva rifa.
        </p>
      </div>
    </div>
  );
}