/**
 * CrearRifaSection Component
 * 
 * Permite crear una nueva rifa con todos sus parámetros
 */

import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function CrearRifaSection({ onCrearRifa, loading }) {
  const [formData, setFormData] = useState({
    nombre: '',
    responsable: '',
    numeroInicio: 11111,
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
      [name]: type === 'checkbox' ? checked : value
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

    if (formData.cantidadNumeros <= 0) {
      setError('La cantidad debe ser mayor a 0');
      return;
    }

    const resultado = await onCrearRifa(formData);

    if (resultado.exito) {
      setExito(true);
      setFormData({
        nombre: '',
        responsable: '',
        numeroInicio: 11111,
        cantidadNumeros: 10000,
        fecha: '',
        activa: false
      });
      setTimeout(() => setExito(false), 3000);
    } else {
      setError(resultado.error);
    }
  };

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
              label="Número Inicial"
              name="numeroInicio"
              type="number"
              value={formData.numeroInicio}
              onChange={handleChange}
              disabled={loading}
              placeholder="11111"
            />

            <Input
              label="Cantidad de Números"
              name="cantidadNumeros"
              type="number"
              value={formData.cantidadNumeros}
              onChange={handleChange}
              disabled={loading}
              placeholder="10000"
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

          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={loading}
            disabled={loading}
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
