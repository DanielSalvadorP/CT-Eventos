/**
 * RegistrosRifaTable Component
 * 
 * Muestra tabla de todos los registros de una rifa específica
 * Permite eliminar registros
 */

import { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { obtenerRegistrosDeRifa, eliminarRegistroDeRifa } from '../../services/rifaService';

export function RegistrosRifaTable({ rifaId, rifaNombre, onClose }) {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    cargarRegistros();
  }, [rifaId]);

  const cargarRegistros = async () => {
    try {
      setLoading(true);
      setError(null);
      const datos = await obtenerRegistrosDeRifa(rifaId);
      setRegistros(datos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarRegistro = async (registroId) => {
    try {
      setLoading(true);
      await eliminarRegistroDeRifa(rifaId, registroId);
      setRegistros(registros.filter(r => r.id !== registroId));
      setConfirmDelete(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginBottom: 'var(--space-2xl)' }}>
      <div className="card-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>📋 Registros de {rifaNombre}</h3>
          <Button
            variant="secondary"
            size="small"
            onClick={onClose}
            disabled={loading}
          >
            Cerrar
          </Button>
        </div>
      </div>

      <div className="card-body">
        {error && <div className="alert alert-error">{error}</div>}

        {loading && registros.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Cargando registros...</p>
        ) : registros.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>No hay registros aún</p>
        ) : (
          <>
            <p style={{ marginBottom: 'var(--space-lg)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Total: {registros.length} registros
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 'var(--font-size-sm)'
              }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-gray-700)', borderBottom: '2px solid var(--color-gray-200)' }}>
                    <th style={{ padding: 'var(--space-md)', textAlign: 'left', fontWeight: 'bold' }}>Cédula</th>
                    <th style={{ padding: 'var(--space-md)', textAlign: 'left', fontWeight: 'bold' }}>Nombre</th>
                    <th style={{ padding: 'var(--space-md)', textAlign: 'left', fontWeight: 'bold' }}>Correo</th>
                    <th style={{ padding: 'var(--space-md)', textAlign: 'left', fontWeight: 'bold' }}>Teléfono</th>
                    <th style={{ padding: 'var(--space-md)', textAlign: 'center', fontWeight: 'bold' }}>Número</th>
                    <th style={{ padding: 'var(--space-md)', textAlign: 'left', fontWeight: 'bold' }}>Fecha</th>
                    <th style={{ padding: 'var(--space-md)', textAlign: 'center', fontWeight: 'bold' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((registro) => (
                    <tr key={registro.id} style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                      <td style={{ padding: 'var(--space-md)' }}>
                        <strong>{registro.cedula}</strong>
                      </td>
                      <td style={{ padding: 'var(--space-md)' }}>
                        {registro.nombre}
                      </td>
                      <td style={{ padding: 'var(--space-md)' }}>
                        <a href={`mailto:${registro.correo}`} style={{ color: 'var(--color-primary)' }}>
                          {registro.correo}
                        </a>
                      </td>
                      <td style={{ padding: 'var(--space-md)' }}>
                        <a href={`tel:${registro.telefono}`} style={{ color: 'var(--color-primary)' }}>
                          {registro.telefono}
                        </a>
                      </td>
                      <td style={{ padding: 'var(--space-md)', textAlign: 'center', fontWeight: 'bold', fontSize: 'var(--font-size-lg)' }}>
                        <span style={{
                          backgroundColor: 'var(--color-primary)',
                          color: 'white',
                          padding: 'var(--space-sm) var(--space-md)',
                          borderRadius: 'var(--border-radius-md)',
                          display: 'inline-block'
                        }}>
                          {registro.numeroRifa}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--space-md)' }}>
                        {new Date(registro.fecha).toLocaleString('es-ES')}
                      </td>
                      <td style={{ padding: 'var(--space-md)', textAlign: 'center' }}>
                        <Button
                          size="small"
                          variant="danger"
                          onClick={() => setConfirmDelete(registro.id)}
                          disabled={loading}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* CONFIRMACIÓN DE ELIMINACIÓN */}
      {confirmDelete && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ maxWidth: '400px', width: '90%' }}>
            <div className="card-header">
              <h3>⚠️ Confirmar Eliminación</h3>
            </div>
            <div className="card-body">
              <p style={{ marginBottom: 'var(--space-lg)' }}>
                ¿Deseas eliminar este registro? El número volvería a estar disponible.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                <Button
                  variant="danger"
                  size="large"
                  onClick={() => handleEliminarRegistro(confirmDelete)}
                  disabled={loading}
                  className="btn-block"
                >
                  Sí, Eliminar
                </Button>
                <Button
                  variant="secondary"
                  size="large"
                  onClick={() => setConfirmDelete(null)}
                  disabled={loading}
                  className="btn-block"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
