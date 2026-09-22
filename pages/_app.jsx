/**
 * pages/_app.jsx
 * 
 * Componente raíz de Next.js
 * Aquí van los estilos globales y configuraciones globales
 * 
 * Este archivo es especial en Next.js:
 * - Se ejecuta en TODAS las páginas
 * - Aquí van los estilos globales (CSS imports)
 * - Aquí van providers/contextos globales
 * - Aquí va configuración de Head global
 */

import '../src/styles/globals.css';
import '../src/styles/variables.css';
import '../src/styles/components.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}