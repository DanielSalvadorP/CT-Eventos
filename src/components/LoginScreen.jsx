import { useAuth } from '../hooks/useAuth';

export function LoginScreen() {
  const { loginWithGoogle, loading } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // El estado se actualiza automáticamente en useAuth
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--color-gray-50)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: 'var(--space-3xl)',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-lg)' }}>
          @EL DEL CT Eventos
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2xl)' }}>
          Inicia sesión para acceder al panel admin
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            padding: 'var(--space-lg) var(--space-2xl)',
            borderRadius: 'var(--border-radius-md)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Cargando...' : 'Inicia sesión con Google'}
        </button>
      </div>
    </div>
  );
}