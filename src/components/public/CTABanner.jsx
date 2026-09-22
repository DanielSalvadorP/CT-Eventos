/**
 * CTABanner Component
 * 
 * Banner de llamada a acción para comprar boletas
 */

export function CTABanner() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573118180149';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div style={{
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      padding: 'var(--space-3xl) var(--space-lg)',
      borderRadius: 'var(--border-radius-lg)',
      textAlign: 'center',
      marginBottom: 'var(--space-3xl)'
    }}>
      <img src="/ELdelCTPerfil.png" alt="perfil" width={150} height={150} style={{borderRadius:'50%', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)'}}/>
      
      <h2 style={{ marginBottom: 'var(--space-md)', color: 'white' }}>
        ¿Aún no tienes tu Ticket?
      </h2>
      
      <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2xl)', opacity: 0.95 }}>
        Haz clic en el botón y comunícate con nosotros por WhatsApp
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-large"
        style={{
          backgroundColor: 'white',
          color: 'var(--color-primary)',
          display: 'inline-block',
          borderRadius: 'var(--border-radius-full)',
          fontWeight: 'var(--font-weight-bold)',
          fontSize: 'var(--font-size-lg)'
        }}
      >
        Compralo Aquí
      </a>
    </div>
  );
}