/**
 * LoginScreen Component
 * 
 * Pantalla de login para acceso al panel administrativo
 */

import { useState } from 'react';
import { Button } from './common/Button';
import { Input } from './common/Input';

export function LoginScreen({ onLogin, loading }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError('Ingresa la contraseña');
      return;
    }

    const resultado = await onLogin(password);
    
    if (!resultado) {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--color-gray-50)',
      padding: 'var(--space-lg)'
    }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-header" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-md)' }}>
            🔐 Acceso Admin
          </h2>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
            Panel Administrativo de Rifa
          </p>
        </div>

        <div className="card-body">
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ position: 'relative' }}>
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                disabled={loading}
                required
                autoFocus
                style={{color:'grey'}}
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 'var(--space-md)',
                  top: 'var(--space-lg)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-lg)',
                  padding: 0
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={loading}
              disabled={!password || loading}
              className="btn-block"
            >
              Entrar
            </Button>
          </form>

          <div style={{
            marginTop: 'var(--space-lg)',
            padding: 'var(--space-md)',
            backgroundColor: 'var(--color-info-light)',
            borderRadius: 'var(--border-radius-md)',
            fontSize: 'var(--font-size-sm)',
            color: '#1e3a8a'
          }}>
            <strong>ℹ️ Nota:</strong> Por seguridad, cambia la contraseña predeterminada una vez logres acceso.
          </div>
        </div>
      </div>
    </div>
  );
}