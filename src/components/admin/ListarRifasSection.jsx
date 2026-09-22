/**
 * ListarRifasSection Component
 * 
 * Muestra todas las rifas creadas
 * Permite activar/desactivar y eliminar
 */

import { useState } from 'react';
import { Button } from '../common/Button';
import { RegistrosRifaTable } from './RegistrosRifaTable';

export function ListarRifasSection({ rifas, loading, onActivarRifa, onEliminarRifa, onRefresh }) {
  const [rifaSeleccionada, setRifaSeleccionada] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  if (!rifas || rifas.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h3>Mis Rifas</h3>
        </div>
        <div className="card-body" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>
            Aún no hay rifas creadas
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Crea una nueva rifa para comenzar
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card" style={{ marginBottom: 'var(--space-2xl)' }}>
        <div className="card-header">
          <h3>Mis Rifas</h3>
        </div>

        <div className="card-body">
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 'var(--font-size-sm)'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-gray-200)' }}>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'left', fontWeight: 'bold' }}>Nombre</th>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'left', fontWeight: 'bold' }}>Responsable</th>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'left', fontWeight: 'bold' }}>Fecha</th>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'center', fontWeight: 'bold' }}>Números</th>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'center', fontWeight: 'bold' }}>Registros</th>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'center', fontWeight: 'bold' }}>Estado</th>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'center', fontWeight: 'bold' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rifas.map((rifa) => (
                  <tr key={rifa.id} style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                    <td style={{ padding: 'var(--space-md)' }}>
                      <strong>{rifa.nombre}</strong>
                    </td>
                    <td style={{ padding: 'var(--space-md)' }}>
                      {rifa.responsable}
                    </td>
                    <td style={{ padding: 'var(--space-md)' }}>
                      {new Date(rifa.fecha).toLocaleDateString('es-ES')}
                    </td>
                    <td style={{ padding: 'var(--space-md)', textAlign: 'center' }}>
                      {rifa.cantidadNumeros}
                    </td>
                    <td style={{ padding: 'var(--space-md)', textAlign: 'center' }}>
                      {rifa.numerosUsados?.length || 0}
                    </td>
                    <td style={{ padding: 'var(--space-md)', textAlign: 'center' }}>
                      {rifa.activa ? (
                        <span style={{ 
                          backgroundColor: 'var(--color-success-light)',
                          color: '#065f46',
                          padding: 'var(--space-sm) var(--space-md)',
                          borderRadius: 'var(--border-radius-md)',
                          display: 'inline-block',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'bold'
                        }}>
                          ✅ ACTIVA
                        </span>
                      ) : (
                        <span style={{ 
                          backgroundColor: 'var(--color-gray-200)',
                          color: 'var(--color-text-secondary)',
                          padding: 'var(--space-sm) var(--space-md)',
                          borderRadius: 'var(--border-radius-md)',
                          display: 'inline-block',
                          fontSize: 'var(--font-size-xs)'
                        }}>
                          Inactiva
                        </span>
                      )}
                    </td>
                    <td style={{ padding: 'var(--space-md)', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                          size="small"
                          variant={rifa.activa ? 'secondary' : 'primary'}
                          onClick={() => onActivarRifa(rifa.id)}
                          disabled={loading || rifa.activa}
                        >
                          {rifa.activa ? 'Activa' : 'Activar'}
                        </Button>
                        
                        <Button
                          size="small"
                          variant="secondary"
                          onClick={() => setRifaSeleccionada(rifa.id)}
                        >
                          Ver
                        </Button>

                        <Button
                          size="small"
                          variant="danger"
                          onClick={() => setConfirmDelete(rifa.id)}
                          disabled={loading}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VER REGISTROS DE RIFA */}
      {rifaSeleccionada && (
        <RegistrosRifaTable
          rifaId={rifaSeleccionada}
          rifaNombre={rifas.find(r => r.id === rifaSeleccionada)?.nombre}
          onClose={() => setRifaSeleccionada(null)}
        />
      )}

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
                ¿Estás seguro de que deseas eliminar esta rifa y todos sus registros? Esta acción no se puede deshacer.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                <Button
                  variant="danger"
                  size="large"
                  onClick={() => {
                    onEliminarRifa(confirmDelete);
                    setConfirmDelete(null);
                  }}
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
    </>
  );
}
