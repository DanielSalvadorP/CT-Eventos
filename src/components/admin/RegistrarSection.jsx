/**
 * RegistrarSection Component - Versión 5.1
 * 
 * Registra compradores con múltiples tickets
 * NUEVO: Permite seleccionar a qué rifa registrar el comprador
 * MEJORADO: Campo de cantidad de tickets permite borrar y escribir libremente
 */

import { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { ProgressBarRifa } from '../common/ProgressBarRifa';

export function RegistrarSection({ todasLasRifas = [], onRegistrar, loading }) {
  const [rifaSeleccionada, setRifaSeleccionada] = useState('');
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    correo: '',
    telefono: '',
    cantidadTickets: ''
  });

  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);
  const [numerosAsignados, setNumerosAsignados] = useState([]);

  // Seleccionar la primera rifa por defecto
  useEffect(() => {
    if (todasLasRifas.length > 0 && !rifaSeleccionada) {
      setRifaSeleccionada(todasLasRifas[0].id);
    }
  }, [todasLasRifas, rifaSeleccionada]);

  const rifa = todasLasRifas.find(r => r.id === rifaSeleccionada);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(false);
    setNumerosAsignados([]);

    if (!rifaSeleccionada) {
      setError('Por favor selecciona una rifa');
      return;
    }

    // Validaciones
    if (!formData.cedula.trim()) {
      setError('La cédula es requerida');
      return;
    }

    if (!formData.nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!formData.correo.trim()) {
      setError('El correo es requerido');
      return;
    }

    if (!formData.telefono.trim()) {
      setError('El teléfono es requerido');
      return;
    }

    // Validar cantidad de tickets
    const cantidad = parseInt(formData.cantidadTickets) || 0;
    if (cantidad <= 0) {
      setError('La cantidad debe ser un número mayor a 0');
      return;
    }

    // Validar disponibilidad
    const disponibles = rifa.cantidadNumeros - (rifa.numerosUsados?.length || 0);
    if (cantidad > disponibles) {
      setError(
        `No hay suficientes números disponibles. Solicitados: ${cantidad}, Disponibles: ${disponibles}`
      );
      return;
    }

    // Llamar servicio - AHORA PASA rifaId
    const resultado = await onRegistrar(
      { ...formData, cantidadTickets: cantidad },
      rifaSeleccionada
    );

    if (resultado.exito) {
      setExito(true);
      setNumerosAsignados(resultado.numerosAsignados || []);
      setFormData({
        cedula: '',
        nombre: '',
        correo: '',
        telefono: '',
        cantidadTickets: ''
      });

      setTimeout(() => {
        setExito(false);
        setNumerosAsignados([]);
      }, 6000);
    } else {
      setError(resultado.error);
    }
  };

  if (!todasLasRifas || todasLasRifas.length === 0) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>
            ⚠️ No hay rifas creadas
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Ve a "Crear Rifa" para crear una nueva rifa
          </p>
        </div>
      </div>
    );
  }

  const disponibles = rifa ? rifa.cantidadNumeros - (rifa.numerosUsados?.length || 0) : 0;
  const cantidadDisplay = formData.cantidadTickets || '1';

  return (
    <div className="card">
      <div className="card-header">
        <h3>Registrar Comprador</h3>
        <p style={{ margin: 'var(--space-sm) 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Selecciona una rifa para registrar compradores
        </p>
      </div>

      <div className="card-body">
        {/* SELECTOR DE RIFA */}
        <div style={{
          marginBottom: 'var(--space-2xl)',
          padding: 'var(--space-lg)',
          backgroundColor: 'var(--color-gray-500)',
          borderRadius: 'var(--border-radius-md)',
          borderLeft: '4px solid var(--color-primary)'
        }}>
          <label style={{
            display: 'block',
            marginBottom: 'var(--space-sm)',
            fontWeight: 'bold',
            fontSize: 'var(--font-size-sm)'
          }}>
            Selecciona una rifa:
          </label>
          <select
            value={rifaSeleccionada}
            onChange={(e) => setRifaSeleccionada(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-md)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--color-gray-400)',
              fontSize: 'var(--font-size-base)',
              backgroundColor: 'white',
              color: 'grey',
              cursor: 'pointer'
            }}
            disabled={loading}
          >
            <option value="">-- Selecciona una rifa --</option>
            {todasLasRifas.map(r => {
              const disp = r.cantidadNumeros - (r.numerosUsados?.length || 0);
              return (
                <option key={r.id} value={r.id}>
                  {r.nombre} - {disp} disponibles de {r.cantidadNumeros}
                </option>
              );
            })}
          </select>
        </div>

        {/* INFORMACIÓN DE LA RIFA SELECCIONADA */}
        {rifa && (
          <>
            {/* BARRA DE PROGRESO */}
            <div style={{ marginBottom: 'var(--space-2xl)' }}>
              <ProgressBarRifa
                rifaId={rifa.id}
                numerosUsados={rifa.numerosUsados?.length || 0}
                cantidadTotal={rifa.cantidadNumeros}
                rifaNombre={rifa.nombre}
              />
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {exito && (
              <div className="alert alert-success">
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  ✅ {formData.cantidadTickets} ticket{formData.cantidadTickets !== 1 ? 's' : ''} registrado{formData.cantidadTickets !== 1 ? 's' : ''} exitosamente
                </div>
                {numerosAsignados.length > 0 && (
                  <div style={{
                    padding: 'var(--space-lg)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--border-radius-md)',
                    marginTop: 'var(--space-md)'
                  }}>
                    <p style={{ margin: 0, marginBottom: 'var(--space-sm)', fontWeight: 'bold' }}>
                      Números asignados:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                      {numerosAsignados.map((numero) => (
                        <span
                          key={numero}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            padding: 'var(--space-sm) var(--space-md)',
                            borderRadius: 'var(--border-radius-md)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'bold',
                            fontFamily: 'monospace'
                          }}
                        >
                          {numero}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <Input
                  label="Cédula"
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  placeholder="1234567890"
                />

                <Input
                  label="Cantidad de Tickets"
                  name="cantidadTickets"
                  type="number"
                  value={formData.cantidadTickets}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  min="1"
                  max={disponibles}
                  placeholder="1"
                />
              </div>

              <Input
                label="Nombre Completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={loading}
                required
                placeholder="Juan Pérez"
                style={{ marginBottom: 'var(--space-lg)' }}
              />

              <Input
                label="Correo Electrónico"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                disabled={loading}
                required
                placeholder="juan@ejemplo.com"
                style={{ marginBottom: 'var(--space-lg)' }}
              />

              <Input
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={loading}
                required
                placeholder="3118180149"
                style={{ marginBottom: 'var(--space-lg)' }}
              />

              <Button
                type="submit"
                variant="primary"
                size="large"
                loading={loading}
                disabled={loading}
                className="btn-block"
              >
                Registrar {cantidadDisplay} Ticket{cantidadDisplay !== '1' ? 's' : ''}
              </Button>
            </form>

            <div style={{
              marginTop: 'var(--space-2xl)',
              padding: 'var(--space-lg)',
              backgroundColor: 'white',
              color:'grey',
              borderRadius: 'var(--border-radius-md)',
              borderLeft: '4px solid var(--color-primary)'
            }}>
              <p style={{ margin: 0, marginBottom: 'var(--space-sm)', fontWeight: 'bold' }}>
                📊 Información de {rifa.nombre}:
              </p>
              <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
                Formato: <strong>{rifa.cantidadDigitos} dígitos</strong>
              </p>
              <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
                Ejemplo: {Array(rifa.cantidadDigitos).fill('0').join('').slice(0, -3) + '123'}
              </p>
              <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
                Disponibles: <strong style={{ color: 'var(--color-primary)' }}>{disponibles.toLocaleString('es-ES')}</strong> de {rifa.cantidadNumeros.toLocaleString('es-ES')}
              </p>
              <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
                Fecha de sorteo: {new Date(rifa.fecha).toLocaleDateString('es-ES')}
              </p>
              <p style={{ margin: 'var(--space-sm) 0 0', fontSize: 'var(--font-size-sm)' }}>
                Responsable: {rifa.responsable}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}