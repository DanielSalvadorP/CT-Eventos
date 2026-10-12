import Link from 'next/link';

export function Header({ isAdmin = false, onLogout }) {
  return (
    <header style={{
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className='contenedorHeader' style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* LOGO */}
        <div style={{
          width: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          <img className='logo' src="/ELdelCT.png" alt="imagenCT" width={110} height={35} />
        </div>

        {/* EVENTOS */}
        <div style={{
          width: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h2 style={{ margin: 0 }}>EVENTOS</h2>
        </div>

        {/* PREGUNTAS FRECUENTES */}
        <div style={{
          width: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          <Link href="/faq" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'bold',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            FAQs
          </Link>
        </div>
      </div>
    </header>
  );
}