/**
 * next.config.js
 * 
 * Configuración de Next.js para la aplicación
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones de producción
  reactStrictMode: true,
  
  // Compresión
  compress: true,
  
  // Headers de seguridad
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  },

  // Redirecciones (opcional)
  redirects: async () => {
    return [];
  },

  // Rewrites (opcional)
  rewrites: async () => {
    return [];
  },

  // Variables de entorno
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || '@EL DEL CT Eventos',
    NEXT_PUBLIC_APP_COLOR: process.env.NEXT_PUBLIC_APP_COLOR || '#EB5C01'
  }
};

module.exports = nextConfig;