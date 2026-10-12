/**
 * AdminPanel Component - Versión 3.0
 * 
 * Panel de administración con:
 * - Crear nuevas rifas
 * - Ver y gestionar rifas existentes
 * - Registrar compradores en CUALQUIER rifa (selector)
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
  const { logout, user } = useAuth();
  
  const { 
    crearRifa, 
    obtenerRifas, 
    activarRifa, 
    eliminarRifa,
    registrarCompradorMultiplesTickets,
    obtenerRifaActiva
  } = useRifa();

  const cargarRifas = async () => {
    try {
      setLoading(true);
      console.log('Intentando cargar rifas...');
      const datos = await obtenerRifas();
      console.log('Rifas cargadas:', datos);
      setRifas(datos);
      
      const activa = await obtenerRifaActiva();
      console.log('Rifa activa:', activa);
      setRifaActiva(activa);
    } catch (error) {
      console.error('Error al cargar rifas:', error);
      setMessage({ tipo: 'error', texto: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Cargar rifas al montar el componente
  useEffect(() => {
    if (user) {
      cargarRifas();
    }
  }, [user]);

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

  const handleRegistrarComprador = async (datos, rifaId) => {
    try {
      setLoading(true);
      
      if (!rifaId) {
        throw new Error('Por favor selecciona una rifa');
      }

      // Llamar al servicio con el rifaId seleccionado
      const resultado = await registrarCompradorMultiplesTickets(
        rifaId,
        datos,
        datos.cantidadTickets || 1
      );

      setMessage({ 
        tipo: 'exito', 
        texto: `${resultado.totalTickets} ticket(s) registrado(s) exitosamente. Números: ${resultado.numerosAsignados.join(', ')}` 
      });
      
      // Recargar para actualizar números usados
      await cargarRifas();
      
      return { exito: true, ...resultado };
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
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-gray-900)' }}>      
      {/* HEADER PRINCIPAL - Logo + Título centrados */}
      <div style={{
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        padding: 'var(--space-lg)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          {/* LOGO */}
          <img 
            className='logo' 
            src="/ELdelCT.png" 
            alt="imagenCT" 
            style={{ 
              width: 'clamp(80px, 20vw, 110px)', 
              height: 'auto'
            }} 
          />
          
          {/* TÍTULO */}
          <h3 style={{ 
            margin: 0,
            fontSize: 'clamp(1.2rem, 5vw, 2rem)',
            textAlign: 'center'
          }}>
            🎰 Panel Admin
          </h3>
        </div>
      </div>

      {/* BARRA SUPERIOR - Usuario + Cerrar Sesión */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: 'var(--space-md) var(--space-lg)',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 'var(--space-md)' }}>
          <span style={{ color: 'white', fontSize: 'var(--font-size-sm)' }}>
            <p style={{ margin: 0 }}><strong>👤 {user?.displayName || user?.email}</strong></p>
          </span>
          <Button variant="secondary" size="small" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
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

      {/* TABS */}
      <div className="container">
        <div style={{
          display: 'flex',
          gap: 'var(--space-sm)',
          marginTop:'var(--space-2xl)',
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
            Mis Rifas
          </Button>

          <Button
            variant={tab === 'crear' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setTab('crear')}
          >
            Crear Rifa
          </Button>

          {/* CAMBIO: Ya no depende de rifaActiva, solo de tener rifas */}
          {rifas.length > 0 && (
            <Button
              variant={tab === 'registrar' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setTab('registrar')}
            >
              Registrar Comprador
            </Button>
          )}
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

        {/* CAMBIO: Ahora pasa todasLasRifas en lugar de rifaActiva */}
        {tab === 'registrar' && rifas.length > 0 && (
          <RegistrarSection
            todasLasRifas={rifas}
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