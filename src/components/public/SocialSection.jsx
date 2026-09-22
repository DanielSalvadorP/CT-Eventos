/**
 * SocialSection Component
 * 
 * Sección que muestra redes sociales oficiales
 * Los URLs están hardcodeados aquí (no necesita .env)
 */

import { SocialLinks } from '../common/SocialLinks';

export function SocialSection() {
  // ====================================
  // AGREGAR TUS ENLACES AQUÍ
  // ====================================
  const facebook = 'https://facebook.com/profile.php?id=61580320114944';      // ← Cambia aquí
  const instagram = 'https://instagram.com/eldelct';    // ← Cambia aquí
  const tiktok = 'https://tiktok.com/@el_del_ct';         // ← Cambia aquí
  // ====================================

  return (
    <section style={{
      backgroundColor:'var(--color-primary)',
      padding: 'var(--space-3xl) var(--space-lg)',
      textAlign: 'center',
      marginTop: 'var(--space-3xl)',
      marginBottom: 'var(--space-3xl)'
    }}>
      <div className="container">
        <h2 style={{
          color: 'white',
          marginBottom: 'var(--space-md)',
          fontSize: 'var(--font-size-2xl)'
        }}>
          📱 Síguenos en Nuestras Redes Oficiales
        </h2>
        
        <p style={{
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-2xl)',
          fontSize: 'var(--font-size-lg)'
        }}>
          Mantente atento a nuestras redes para novedades y más rifas
        </p>

        <SocialLinks
          facebook={facebook}
          instagram={instagram}
          tiktok={tiktok}
        />

        <p style={{
          marginTop: 'var(--space-2xl)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)'
        }}>
          ¡No te pierdas nada! Síguenos para enterarte primero de nuevas promociones
        </p>
      </div>
    </section>
  );
}