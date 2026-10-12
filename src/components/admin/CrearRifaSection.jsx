/**
 * CrearRifaSection Component - Versión 3.0
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
          ? value
          : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(false);

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

    const cantidadDigitos = parseInt(formData.cantidadDigitos) || 0;
    const cantidadNumeros = parseInt(formData.cantidadNumeros) || 0;

    if (cantidadDigitos <= 0) {
      setError('La cantidad de dígitos debe ser mayor a 0');
      return;
    }

    if (cantidadNumeros <= 0) {
      setError('La cantidad de números debe ser mayor a 0');
      return;
    }

    const maxPosibles = Math.pow(10, cantidadDigitos);
    if (cantidadNumeros > maxPosibles) {
      setError(
        `Con ${cantidadDigitos} dígitos, máximo ${maxPosibles.toLocaleString('es-ES')} tickets. Ingresaste ${cantidadNumeros.toLocaleString('es-ES')}`
      );
      return;
    }

    const resultado = await onCrearRifa({
      ...formData,
      cantidadDigitos,
      cantidadNumeros
    });

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

  const maxPosibles = formData.cantidadDigitos ? Math.pow(10, parseInt(formData.cantidadDigitos)) : 0;

  return (
    <div className="card">
      <div className="card-header">
        <h3>Crear Nueva Rifa</h3>
      </div>

      <div className="card-body">
        {/* SOLO MOSTRAR ERRORES EN EL FORMULARIO */}
        {error && (
          <div className="alert alert-error" style={{
            animation: 'slideDown 0.3s ease-out'
          }}>
            {error}
          </div>
        )}

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
              max={maxPosibles || undefined}
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
            borderLeft: '4px solid var(--color-primary)',
            color: 'grey'
          }}>
            <p style={{ margin: 0, marginBottom: 'var(--space-sm)', fontWeight: 'bold' }}>
              📋 Información del formato:
            </p>
            <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
              Con <strong>{formData.cantidadDigitos || '?'}</strong> dígitos, máximo <strong>{maxPosibles.toLocaleString('es-ES')}</strong> tickets posibles
            </p>
            <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
              Ejemplo: {Array(formData.cantidadDigitos || 6).fill('0').join('').slice(0, -3) + '123'}
            </p>
            {formData.cantidadNumeros && maxPosibles && parseInt(formData.cantidadNumeros) > maxPosibles && (
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
            disabled={loading || (formData.cantidadNumeros && maxPosibles && parseInt(formData.cantidadNumeros) > maxPosibles)}
            className="btn-block"
            style={{ marginTop: 'var(--space-lg)' }}
          >
            Crear Rifa
          </Button>
        </form>

        <p style={{ marginTop: 'var(--space-lg)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          ℹ️ Cada rifa tendrá su enlace único para compartir.
        </p>
      </div>

      {/* TOAST DE ÉXITO - POSICIÓN FIJA */}
      {exito && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#ecfdf5',
          border: '2px solid #10b981',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--space-lg) var(--space-xl)',
          color: '#065f46',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-md)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'bold',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
          zIndex: 9999,
          animation: 'slideIn 0.4s ease-out, slideOut 0.4s ease-in 2.6s forwards',
          maxWidth: '400px'
        }}>
          <span style={{ fontSize: '1.8rem' }}>✨</span>
          <div>
            <div>¡Éxito!</div>
            <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.9 }}>Rifa creada exitosamente</div>
          </div>
        </div>
      )}

      {/* ANIMACIONES */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(400px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(400px);
          }
        }
      `}</style>
    </div>
  );
}