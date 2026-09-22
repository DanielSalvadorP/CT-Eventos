/**
 * SearchSection Component
 * 
 * Sección pública donde los compradores buscan su número de rifa
 */

import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { CTABanner } from './CTABanner';
import { useRifa } from '../../hooks/useRifa';

export function SearchSection() {
  const { buscar, loading, error } = useRifa();
  
  const [searchType, setSearchType] = useState('correo');
  const [searchValue, setSearchValue] = useState('');
  const [resultado, setResultado] = useState(null);
  const [buscando, setBuscando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBuscando(true);
    setResultado(null);

    const resultado = await buscar(searchType, searchValue);
    
    if (resultado.exito) {
      setResultado({
        encontrado: !!resultado.registro,
        registro: resultado.registro
      });
    } else {
      setResultado({
        encontrado: false,
        error: resultado.error
      });
    }
    
    setBuscando(false);
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
      {/* BANNER CTA */}
      <CTABanner />
 
      {/* FORMULARIO DE BÚSQUEDA */}
      <div className="card" style={{ display:'flex', flexDirection:'column', maxWidth: '800px', margin: '0 auto', alignItems:'center'}}>
        <div className="card-header" maxWidth={500}>
          <h2 style={{ marginBottom: 0, color:'grey'}}>Verifica tu ticket aquí</h2>
        </div>

        <div className="card-body">
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* SELECTOR DE TIPO DE BÚSQUEDA */}
            <div className="form-group">
              <label className="form-label" style={{color:'grey'}}>¿Cómo deseas buscar?</label>
              
              <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="correo"
                    checked={searchType === 'correo'}
                    onChange={(e) => {
                      setSearchType(e.target.value);
                      setSearchValue('');
                      setResultado(null);
                    }}
                    style={{ marginRight: 'var(--space-sm)'}}
                  />
                  <span style={{color:'grey'}}>Por Correo</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="telefono"
                    checked={searchType === 'telefono'}
                    onChange={(e) => {
                      setSearchType(e.target.value);
                      setSearchValue('');
                      setResultado(null);
                    }}
                    style={{ marginRight: 'var(--space-sm)' }}
                  />
                  <span style={{color:'grey'}}>Por Teléfono</span>
                </label>
              </div>
            </div>

            {/* INPUT DE BÚSQUEDA */}
            <Input style={{color:'grey'}}
              type={searchType === 'correo' ? 'email' : 'tel'}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchType === 'correo' ? 'tu@correo.com' : '3001234567'}
              required
            />

            {/* BOTÓN DE BÚSQUEDA */}
            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={buscando || loading}
              disabled={!searchValue.trim()}
              className="btn-block"
            >
              🔍 Buscar
            </Button>
          </form>
        </div>
      </div>

      {/* RESULTADO DE BÚSQUEDA */}
      {resultado && (
        <div style={{ marginTop: 'var(--space-3xl)' }}>
          {resultado.encontrado ? (
            <ResultadoExitoso registro={resultado.registro} />
          ) : (
            <ResultadoNoEncontrado error={resultado.error} />
          )}
        </div>
      )}

      
    </div>
  );
}

/**
 * Componente para mostrar resultado exitoso
 */
function ResultadoExitoso({ registro }) {
  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        padding: 'var(--space-lg)',
        backgroundColor: 'var(--color-success-light)',
        borderRadius: 'var(--border-radius-lg)',
        marginBottom: 'var(--space-lg)',
        borderLeft: '4px solid var(--color-success)',
        color: '#065f46'
      }}>
        <h3 style={{ margin: 0, marginBottom: 'var(--space-md)', color: '#065f46' }}>
          ✅ ¡Encontrado!
        </h3>
      </div>

      <div className="grid-2" style={{ gap: 'var(--space-lg)' }}>
        <div>
          <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            Nombre
          </p>
          <p style={{ margin: 'var(--space-sm) 0 0 0', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>
            {registro.nombre}
          </p>
        </div>

        <div>
          <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            Cédula
          </p>
          <p style={{ margin: 'var(--space-sm) 0 0 0', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>
            {registro.cedula}
          </p>
        </div>

        <div>
          <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            Correo
          </p>
          <p style={{ margin: 'var(--space-sm) 0 0 0', fontSize: 'var(--font-size-base)' }}>
            {registro.correo}
          </p>
        </div>

        <div>
          <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            Teléfono
          </p>
          <p style={{ margin: 'var(--space-sm) 0 0 0', fontSize: 'var(--font-size-base)' }}>
            {registro.telefono}
          </p>
        </div>
      </div>

      {/* NÚMERO DE RIFA DESTACADO */}
      <div style={{
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        padding: 'var(--space-2xl)',
        borderRadius: 'var(--border-radius-lg)',
        textAlign: 'center',
        marginTop: 'var(--space-2xl)'
      }}>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
          Tu Número de Rifa
        </p>
        <p style={{ margin: 'var(--space-md) 0 0 0', fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-bold)', color: 'white' }}>
          {registro.numeroRifa}
        </p>
      </div>
    </div>
  );
}

/**
 * Componente para mostrar que no se encontró resultado
 */
function ResultadoNoEncontrado({ error }) {
  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        padding: 'var(--space-lg)',
        backgroundColor: 'var(--color-error-light)',
        borderRadius: 'var(--border-radius-lg)',
        marginBottom: 'var(--space-lg)',
        borderLeft: '4px solid var(--color-error)',
        color: '#7f1d1d'
      }}>
        <h3 style={{ margin: 0, marginBottom: 'var(--space-md)', color: '#7f1d1d' }}>
          ❌ No encontrado
        </h3>
        
        <p style={{ margin: 0 }}>
          {error || 'No hay registros con esa información. Revisa que hayas escrito correctamente tu correo o teléfono.'}
        </p>
      </div>

      <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
        Si no tienes registro aún, comunícate con nosotros por WhatsApp.
      </p>
    </div>
  );
}