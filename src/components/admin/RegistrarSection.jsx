/**
 * RegistrarSection Component - Versión 4.0
 * 
 * Registra compradores con múltiples tickets
 * Muestra números formateados con cantidad de dígitos
 */

import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { ProgressBarRifa } from '../common/ProgressBarRifa';

export function RegistrarSection({ rifaActiva, onRegistrar, loading }) {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    correo: '',
    telefono: '',
    cantidadTickets: 1
  });

  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);
  const [numerosAsignados, setNumerosAsignados] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cantidadTickets' ? Math.max(1, parseInt(value) || 1) : value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(false);
    setNumerosAsignados([]);

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

    if (formData.cantidadTickets <= 0) {
      setError('La cantidad debe ser mayor a 0');
      return;
    }

    // Validar disponibilidad
    const disponibles = rifaActiva.cantidadNumeros - (rifaActiva.numerosUsados?.length || 0);
    if (formData.cantidadTickets > disponibles) {
      setError(
        `No hay suficientes números disponibles. Solicitados: ${formData.cantidadTickets}, Disponibles: ${disponibles}`
      );
      return;
    }

    // Llamar servicio
    const resultado = await onRegistrar(formData);

    if (resultado.exito) {
      setExito(true);
      setNumerosAsignados(resultado.numerosAsignados || []);
      setFormData({
        cedula: '',
        nombre: '',
        correo: '',
        telefono: '',
        cantidadTickets: 1
      });

      // Limpiar mensaje después de 6 segundos
      setTimeout(() => {
        setExito(false);
        setNumerosAsignados([]);
      }, 6000);
    } else {
      setError(resultado.error);
    }
  };

  if (!rifaActiva) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>
            ⚠️ No hay rifa activa
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Ve a "Mis Rifas" y activa una rifa para poder registrar compradores
          </p>
        </div>
      </div>
    );
  }

  const disponibles = rifaActiva.cantidadNumeros - (rifaActiva.numerosUsados?.length || 0);

  return (
    <div className="card">
      <div className="card-header">
        <h3>Registrar Comprador</h3>
        <p style={{ margin: 'var(--space-sm) 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Rifa activa: <strong>{rifaActiva.nombre}</strong>
        </p>
      </div>

      <div className="card-body">
        {/* BARRA DE PROGRESO */}
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <ProgressBarRifa
            rifaId={rifaActiva.id}
            numerosUsados={rifaActiva.numerosUsados?.length || 0}
            cantidadTotal={rifaActiva.cantidadNumeros}
            rifaNombre={rifaActiva.nombre}
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
            Registrar {formData.cantidadTickets} Ticket{formData.cantidadTickets !== 1 ? 's' : ''}
          </Button>
        </form>

        <div style={{
          marginTop: 'var(--space-2xl)',
          padding: 'var(--space-lg)',
          backgroundColor: 'var(--color-gray-500)',
          borderRadius: 'var(--border-radius-md)',
          borderLeft: '4px solid var(--color-primary)'
        }}>
          <p style={{ margin: 0, marginBottom: 'var(--space-sm)', fontWeight: 'bold' }}>
            📊 Información de la rifa activa:
          </p>
          <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
            Formato: <strong>{rifaActiva.cantidadDigitos} dígitos</strong>
          </p>
          <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
            Ejemplo: {Array(rifaActiva.cantidadDigitos).fill('0').join('').slice(0, -3) + '123'}
          </p>
          <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
            Disponibles: <strong style={{ color: 'var(--color-primary-green)' }}>{disponibles.toLocaleString('es-ES')}</strong> de {rifaActiva.cantidadNumeros.toLocaleString('es-ES')}
          </p>
          <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
            Fecha de sorteo: {new Date(rifaActiva.fecha).toLocaleDateString('es-ES')}
          </p>
          <p style={{ margin: 'var(--space-sm) 0 0', fontSize: 'var(--font-size-sm)' }}>
            Responsable: {rifaActiva.responsable}
          </p>
        </div>
      </div>
    </div>
  );
}