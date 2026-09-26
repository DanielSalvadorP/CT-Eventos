/**
 * CrearRifaSection Component - Versión 2.0
 * 
 * Permite crear una nueva rifa con dígitos configurables
 */

import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function CrearRifaSection({ onCrearRifa, loading }) {
  const [formData, setFormData] = useState({
    nombre: '',
    responsable: '',
    cantidadDigitos: 6,
    cantidadNumeros: 10000,
    fecha: '',
    activa: false
  });

  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? checked 
        : (name === 'cantidadDigitos' || name === 'cantidadNumeros')
          ? Math.max(1, parseInt(value) || 1)
          : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(false);

    // Validaciones
    if (!formData.nombre.trim()) {
      setError('El nombre de la rifa es requerido');
      return;
    }

    if (!formData.responsable.trim()) {
      setError('El nombre del responsable es requerido');
      return;
    }

    if (!formData.fecha) {
      setError('La fecha de la rifa es requerida');
      return;
    }

    if (formData.cantidadDigitos <= 0) {
      setError('La cantidad de dígitos debe ser mayor a 0');
      return;
    }

    if (formData.cantidadNumeros <= 0) {
      setError('La cantidad de números debe ser mayor a 0');
      return;
    }

    // Validar que no haya más tickets que dígitos permitan
    const maxPosibles = Math.pow(10, formData.cantidadDigitos);
    if (formData.cantidadNumeros > maxPosibles) {
      setError(
        `Con ${formData.cantidadDigitos} dígitos, máximo ${maxPosibles.toLocaleString('es-ES')} tickets. Ingresaste ${formData.cantidadNumeros.toLocaleString('es-ES')}`
      );
      return;
    }

    const resultado = await onCrearRifa(formData);

    if (resultado.exito) {
      setExito(true);
      setFormData({
        nombre: '',
        responsable: '',
        cantidadDigitos: 6,
        cantidadNumeros: 10000,
        fecha: '',
        activa: false
      });
      setTimeout(() => setExito(false), 3000);
    } else {
      setError(resultado.error);
    }
  };

  const maxPosibles = Math.pow(10, formData.cantidadDigitos);

  return (
    <div className="card">
      <div className="card-header">
        <h3>Crear Nueva Rifa</h3>
      </div>

      <div className="card-body">
        {error && <div className="alert alert-error">{error}</div>}
        {exito && <div className="alert alert-success">✅ Rifa creada exitosamente</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <Input
              label="Nombre de la Rifa"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              disabled={loading}
              required
              placeholder="Ej: Rifa Navidad 2025"
            />

            <Input
              label="Responsable"
              name="responsable"
              value={formData.responsable}
              onChange={handleChange}
              disabled={loading}
              required
              placeholder="Nombre de quien organiza"
            />

            <Input
              label="Cantidad de Dígitos"
              name="cantidadDigitos"
              type="number"
              value={formData.cantidadDigitos}
              onChange={handleChange}
              disabled={loading}
              placeholder="6"
              min="1"
              max="9"
            />

            <Input
              label="Cantidad de Tickets"
              name="cantidadNumeros"
              type="number"
              value={formData.cantidadNumeros}
              onChange={handleChange}
              disabled={loading}
              placeholder="10000"
              min="1"
              max={maxPosibles}
            />

            <Input
              label="Fecha de Sorteo"
              name="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 'var(--space-md)' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 'var(--space-md)' }}>
                <input
                  type="checkbox"
                  name="activa"
                  checked={formData.activa}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span>Marcar como rifa activa</span>
              </label>
            </div>
          </div>

          {/* INFORMACIÓN DEL FORMATO */}
          <div style={{
            backgroundColor: 'var(--color-gray-50)',
            padding: 'var(--space-lg)',
            borderRadius: 'var(--border-radius-md)',
            marginBottom: 'var(--space-lg)',
            borderLeft: '4px solid var(--color-primary)'
          }}>
            <p style={{ margin: 0, marginBottom: 'var(--space-sm)', fontWeight: 'bold' }}>
              📋 Información del formato:
            </p>
            <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
              Con <strong>{formData.cantidadDigitos}</strong> dígitos, máximo <strong>{maxPosibles.toLocaleString('es-ES')}</strong> tickets posibles
            </p>
            <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
              Ejemplo: {Array(formData.cantidadDigitos).fill('0').join('').slice(0, -3) + '123'}
            </p>
            {formData.cantidadNumeros > maxPosibles && (
              <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)', color: '#991b1b' }}>
                ⚠️ La cantidad de tickets ({formData.cantidadNumeros}) supera el máximo ({maxPosibles})
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={loading}
            disabled={loading || formData.cantidadNumeros > maxPosibles}
            className="btn-block"
            style={{ marginTop: 'var(--space-lg)' }}
          >
            Crear Rifa
          </Button>
        </form>

        <p style={{ marginTop: 'var(--space-lg)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          💡 Solo puede haber una rifa activa. Al activar una, las demás se desactivarán automáticamente.
        </p>
      </div>
    </div>
  );
}