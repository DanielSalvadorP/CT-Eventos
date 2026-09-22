/**
 * AdminPanel Component - Versión 2.0
 * 
 * Panel de administración con:
 * - Crear nuevas rifas
 * - Ver y gestionar rifas existentes
 * - Registrar compradores en rifa activa
 * - Cambiar contraseña
 */

import { useState, useEffect } from 'react';
import { CrearRifaSection } from './CrearRifaSection';
import { ListarRifasSection } from './ListarRifasSection';
import { RegistrarSection } from './RegistrarSection';
import { SeguridadSection } from './SeguridadSection';
import { Button } from '../common/Button';
import { useRifa } from '../../hooks/useRifa';
import { useAuth } from '../../hooks/useAuth';

export function AdminPanel() {
  const [tab, setTab] = useState('rifas');
  const [loading, setLoading] = useState(false);
  const [rifas, setRifas] = useState([]);
  const [rifaActiva, setRifaActiva] = useState(null);
  const [message, setMessage] = useState(null);

  const { 
    crearRifa, 
    obtenerRifas, 
    activarRifa, 
    eliminarRifa,
    registrarCompradorEnRifaActiva,
    obtenerRifaActiva
  } = useRifa();

  const { logout } = useAuth();

  // Cargar rifas al montar el componente
  useEffect(() => {
    cargarRifas();
  }, []);

  const cargarRifas = async () => {
    try {
      setLoading(true);
      const datos = await obtenerRifas();
      setRifas(datos);
      
      // Obtener rifa activa
      const activa = await obtenerRifaActiva();
      setRifaActiva(activa);
    } catch (error) {
      setMessage({ tipo: 'error', texto: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCrearRifa = async (datos) => {
    try {
      setLoading(true);
      const resultado = await crearRifa(datos);
      
      if (resultado.exito) {
        setMessage({ tipo: 'exito', texto: 'Rifa creada exitosamente' });
        
        // Si la marcan como activa, actualizar referencia
        if (datos.activa) {
          setRifaActiva(resultado.rifa);
        }
        
        // Recargar lista
        await cargarRifas();
      }
      
      return resultado;
    } catch (error) {
      const resultado = { exito: false, error: error.message };
      setMessage({ tipo: 'error', texto: error.message });
      return resultado;
    } finally {
      setLoading(false);
    }
  };

  const handleActivarRifa = async (rifaId) => {
    try {
      setLoading(true);
      await activarRifa(rifaId);
      setMessage({ tipo: 'exito', texto: 'Rifa activada' });
      await cargarRifas();
    } catch (error) {
      setMessage({ tipo: 'error', texto: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarRifa = async (rifaId) => {
    try {
      setLoading(true);
      await eliminarRifa(rifaId);
      setMessage({ tipo: 'exito', texto: 'Rifa eliminada' });
      await cargarRifas();
    } catch (error) {
      setMessage({ tipo: 'error', texto: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrarComprador = async (datos) => {
    try {
      setLoading(true);
      
      if (!rifaActiva) {
        throw new Error('No hay rifa activa. Activa una rifa primero.');
      }

      const resultado = await registrarCompradorEnRifaActiva(rifaActiva.id, datos);
      setMessage({ tipo: 'exito', texto: `Comprador registrado. Número: ${resultado.registro.numeroRifa}` });
      
      return resultado;
    } catch (error) {
      const resultado = { exito: false, error: error.message };
      setMessage({ tipo: 'error', texto: error.message });
      return resultado;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      logout();
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-gray-50)' }}>
      {/* HEADER */}
      <div style={{
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        padding: 'var(--space-lg)',
        marginBottom: 'var(--space-2xl)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0 }}>🎰 Panel de Administración</h1>
            <Button
              variant="secondary"
              size="small"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* MENSAJES */}
      {message && (
        <div className="container" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className={`alert alert-${message.tipo}`}>
            {message.tipo === 'exito' ? '✅' : '❌'} {message.texto}
          </div>
        </div>
      )}

      {/* RIFA ACTIVA INFO */}
      {rifaActiva && (
        <div className="container" style={{ marginBottom: 'var(--space-2xl)' }}>
          <div style={{
            backgroundColor: '#ecfdf5',
            border: '2px solid #10b981',
            borderRadius: 'var(--border-radius-lg)',
            padding: 'var(--space-lg)'
          }}>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: '#065f46' }}>
              <strong>✅ Rifa Activa:</strong> {rifaActiva.nombre} 
              {rifaActiva.responsable && ` (Responsable: ${rifaActiva.responsable})`}
            </p>
          </div>
        </div>
      )}

      {/* TABS */}
      <div className="container">
        <div style={{
          display: 'flex',
          gap: 'var(--space-sm)',
          marginBottom: 'var(--space-2xl)',
          borderBottom: '2px solid var(--color-gray-200)',
          overflowX: 'auto',
          paddingBottom: 'var(--space-md)'
        }}>
          <Button
            variant={tab === 'rifas' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setTab('rifas')}
          >
            📋 Mis Rifas
          </Button>

          <Button
            variant={tab === 'crear' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setTab('crear')}
          >
            ➕ Crear Rifa
          </Button>

          {rifaActiva && (
            <Button
              variant={tab === 'registrar' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setTab('registrar')}
            >
              👤 Registrar Comprador
            </Button>
          )}

          <Button
            variant={tab === 'seguridad' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setTab('seguridad')}
          >
            🔒 Seguridad
          </Button>
        </div>

        {/* CONTENIDO POR TAB */}
        {tab === 'rifas' && (
          <ListarRifasSection
            rifas={rifas}
            loading={loading}
            onActivarRifa={handleActivarRifa}
            onEliminarRifa={handleEliminarRifa}
            onRefresh={cargarRifas}
          />
        )}

        {tab === 'crear' && (
          <CrearRifaSection
            onCrearRifa={handleCrearRifa}
            loading={loading}
          />
        )}

        {tab === 'registrar' && rifaActiva && (
          <RegistrarSection
            rifaActiva={rifaActiva}
            onRegistrar={handleRegistrarComprador}
            loading={loading}
          />
        )}

        {tab === 'seguridad' && (
          <SeguridadSection />
        )}
      </div>

      <div style={{ height: 'var(--space-3xl)' }} />
    </div>
  );
}