/**
 * RegistrarSection Component - Versión 2.0
 * 
 * Registra compradores en la rifa activa
 */

import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function RegistrarSection({ rifaActiva, onRegistrar, loading }) {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    correo: '',
    telefono: ''
  });

  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);
  const [numeroAsignado, setNumeroAsignado] = useState(null);

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
    setNumeroAsignado(null);

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

    // Llamar servicio
    const resultado = await onRegistrar(formData);

    if (resultado.exito) {
      setExito(true);
      setNumeroAsignado(resultado.registro.numeroRifa);
      setFormData({
        cedula: '',
        nombre: '',
        correo: '',
        telefono: ''
      });

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setExito(false);
        setNumeroAsignado(null);
      }, 5000);
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

  return (
    <div className="card">
      <div className="card-header">
        <h3>Registrar Comprador</h3>
        <p style={{ margin: 'var(--space-sm) 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Rifa activa: <strong>{rifaActiva.nombre}</strong>
        </p>
      </div>

      <div className="card-body">
        {error && <div className="alert alert-error">{error}</div>}
        {exito && (
          <div className="alert alert-success">
            ✅ Comprador registrado exitosamente
            {numeroAsignado && (
              <p style={{ margin: 'var(--space-md) 0 0', fontSize: 'var(--font-size-lg)', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                Número asignado: {numeroAsignado}
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Cédula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            disabled={loading}
            required
            placeholder="1234567890"
            style={{ marginBottom: 'var(--space-lg)' }}
          />

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
            Registrar Comprador
          </Button>
        </form>

        <div style={{
          marginTop: 'var(--space-2xl)',
          padding: 'var(--space-lg)',
          backgroundColor: 'var(--color-gray-50)',
          borderRadius: 'var(--border-radius-md)',
          borderLeft: '4px solid var(--color-primary)'
        }}>
          <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            <strong>📊 Información de la rifa activa:</strong>
          </p>
          <p style={{ margin: 'var(--space-sm) 0 0', fontSize: 'var(--font-size-sm)' }}>
            Números: {rifaActiva.numeroInicio} - {rifaActiva.numeroInicio + rifaActiva.cantidadNumeros - 1}
          </p>
          <p style={{ margin: 'var(--space-sm) 0 0', fontSize: 'var(--font-size-sm)' }}>
            Disponibles: {rifaActiva.cantidadNumeros - (rifaActiva.numerosUsados?.length || 0)} de {rifaActiva.cantidadNumeros}
          </p>
          <p style={{ margin: 'var(--space-sm) 0 0', fontSize: 'var(--font-size-sm)' }}>
            Fecha de sorteo: {new Date(rifaActiva.fecha).toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  );
}