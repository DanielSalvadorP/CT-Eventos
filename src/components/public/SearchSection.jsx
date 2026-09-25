/**
 * SearchSection Component - Versión 2.0
 * 
 * Busca tickets de un cliente y muestra TODOS sus números
 */

import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useRifa } from '../../hooks/useRifa';

export function SearchSection() {
  const [tipoSearch, setTipoSearch] = useState('correo');
  const [valor, setValor] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buscado, setBuscado] = useState(false);

  const { buscarTicketsDelCliente } = useRifa();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setResultados([]);
    setBuscado(false);

    if (!valor.trim()) {
      setError(`Por favor ingresa un ${tipoSearch}`);
      return;
    }

    try {
      setLoading(true);
      const tickets = await buscarTicketsDelCliente(tipoSearch, valor);

      if (tickets && tickets.length > 0) {
        setResultados(tickets);
      } else {
        setError('No se encontraron tickets para los datos ingresados');
      }

      setBuscado(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      backgroundColor: 'var(--color-gray-700)',
      padding: 'var(--space-3xl) var(--space-lg)',
      marginTop: 'var(--space-3xl)',
      marginBottom: 'var(--space-3xl)',
      borderRadius: 'var(--border-radius-lg)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <div className="container">
        <h2 style={{
          color: 'var(--color-primary)',
          marginBottom: 'var(--space-lg)',
          textAlign: 'center',
          fontSize: 'var(--font-size-2xl)',
        }}>
          🔍 Consulta tus Boletas
        </h2>

        <p style={{
          textAlign: 'center',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-2xl)',
          fontSize: 'var(--font-size-lg)'
        }}>
          Ingresa tu correo o teléfono para ver todos tus números
        </p>

        {/* FORMULARIO */}
        <form onSubmit={handleSearch} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <label style={{
              display: 'flex',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-lg)'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  value="correo"
                  checked={tipoSearch === 'correo'}
                  onChange={(e) => {
                    setTipoSearch(e.target.value);
                    setValor('');
                    setResultados([]);
                    setError(null);
                  }}
                  disabled={loading}
                />
                <span>Por Correo</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  value="telefono"
                  checked={tipoSearch === 'telefono'}
                  onChange={(e) => {
                    setTipoSearch(e.target.value);
                    setValor('');
                    setResultados([]);
                    setError(null);
                  }}
                  disabled={loading}
                />
                <span>Por Teléfono</span>
              </label>
            </label>
          </div>

          <Input
            type={tipoSearch === 'correo' ? 'email' : 'tel'}
            value={valor}
            onChange={(e) => {
              setValor(e.target.value);
              setError(null);
            }}
            disabled={loading}
            placeholder={tipoSearch === 'correo' ? 'tu@correo.com' : '3123456789'}
            required
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
            {loading ? 'Buscando...' : 'Buscar Boletas'}
          </Button>
        </form>

        {/* ERRORES */}
        {error && (
          <div style={{
            marginTop: 'var(--space-2xl)',
            padding: 'var(--space-lg)',
            backgroundColor: '#fee2e2',
            border: '2px solid #ef4444',
            borderRadius: 'var(--border-radius-md)',
            color: '#991b1b',
            textAlign: 'center'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* RESULTADOS */}
        {buscado && resultados.length > 0 && (
          <div style={{ marginTop: 'var(--space-3xl)' }}>
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '2px solid #10b981',
              borderRadius: 'var(--border-radius-md)',
              padding: 'var(--space-lg)',
              marginBottom: 'var(--space-2xl)'
            }}>
              <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 'bold', color: '#065f46' }}>
                ✅ Encontramos {resultados.length} boleta{resultados.length !== 1 ? 's' : ''} a tu nombre
              </p>
            </div>

            {/* INFO DEL CLIENTE */}
            <div style={{
              backgroundColor: 'var(--color-gray-50)',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--border-radius-md)',
              marginBottom: 'var(--space-2xl)',
              borderLeft: '4px solid var(--color-primary)'
            }}>
              <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
                <strong>Nombre:</strong> {resultados[0].nombre}
              </p>
              <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
                <strong>Correo:</strong> {resultados[0].correo}
              </p>
              <p style={{ margin: 'var(--space-sm) 0', fontSize: 'var(--font-size-sm)' }}>
                <strong>Teléfono:</strong> {resultados[0].telefono}
              </p>
            </div>

            {/* LISTADO DE NÚMEROS */}
            <div>
              <h3 style={{
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-lg)',
                fontSize: 'var(--font-size-lg)'
              }}>
                📋 Tus Números:
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-2xl)'
              }}>
                {resultados.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                      padding: 'var(--space-lg)',
                      borderRadius: 'var(--border-radius-md)',
                      textAlign: 'center',
                      boxShadow: '0 4px 12px rgba(235, 92, 1, 0.2)',
                      transition: 'transform 0.2s',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{
                      fontSize: 'var(--font-size-sm)',
                      opacity: 0.9,
                      marginBottom: 'var(--space-sm)'
                    }}>
                      Boleta {index + 1}
                    </div>
                    <div style={{
                      fontSize: 'var(--font-size-3xl)',
                      fontWeight: 'bold',
                      marginBottom: 'var(--space-sm)'
                    }}>
                      {ticket.numeroRifa}
                    </div>
                    <div style={{
                      fontSize: 'var(--font-size-xs)',
                      opacity: 0.8
                    }}>
                      {new Date(ticket.fecha).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTÓN WHATSAPP */}
              <div style={{ textAlign: 'center' }}>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola, tengo los números: ${resultados.map(t => t.numeroRifa).join(', ')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#25D366',
                    color: 'white',
                    padding: 'var(--space-md) var(--space-lg)',
                    borderRadius: 'var(--border-radius-md)',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: 'var(--font-size-lg)',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20ba5a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
                >
                  📲 Compartir mis Números por WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}