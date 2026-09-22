/**
 * SocialLinks Component
 * 
 * Muestra botones para acceder a redes sociales
 */

import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa6';

export function SocialLinks({ 
  facebook, 
  instagram, 
  tiktok,
  className = '' 
}) {
  const socialNetworks = [
    {
      name: 'Facebook',
      icon: <FaFacebookF size={22} />,
      url: facebook,
      color: '#1877F2'
    },
    {
      name: 'Instagram',
      icon:<FaInstagram size={24} />,
      url: instagram,
      color: '#E4405F'
    },
    {
      name: 'TikTok',
      icon: <FaTiktok size={22} />,
      url: tiktok,
      color: '#000000'
    }
  ];

  return (
    <div className={`social-links ${className}`} style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
      {socialNetworks.map((social) => (
        social.url && (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Síguenos en ${social.name}`}
            className="social-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              borderRadius: 'var(--border-radius-full)',
              backgroundColor: social.color,
              color: 'white',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
              boxShadow: 'var(--shadow-md)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            {social.icon}
          </a>
        )
      ))}
    </div>
  );
}