/**
 * pages/legal.jsx
 *
 * Aviso Legal
 */

import { LegalPage } from '../src/components/common/LegalPage';

export default function Legal() {


  return (
    <LegalPage
      title="Aviso Legal"
      description="Términos y condiciones de uso de @EL DEL CT Eventos"
      metaDescription="Aviso Legal y Términos de Servicio de @EL DEL CT Eventos - Plataforma de rifas online"
    >
      <section style={{ marginBottom: 'var(--space-2xl)' , color: 'grey'}}>
        <h2>1. Información del Titular</h2>
        <p>
          <strong>Empresa:</strong> Khons.dev<br />
          <strong>País:</strong> Colombia<br />
          <strong>Actividad:</strong> Plataforma para gestión y venta de números de rifas
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)' , color: 'grey'}}>
        <h2>2. Aceptación de Términos</h2>
        <p>
          El acceso y uso de esta plataforma implica la aceptación plena y sin reservas de los
          presentes términos y condiciones. Si no está de acuerdo con alguno de estos términos,
          le recomendamos no utilizar el sitio.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)' , color: 'grey'}}>
        <h2>3. Descripción del Servicio</h2>
        <p>
          @EL DEL CT Eventos es una plataforma digital que permite:
        </p>
        <ul>
          <li>La creación y gestión de rifas (sorteos)</li>
          <li>El registro de compradores de números de rifa</li>
          <li>La búsqueda y validación de números adquiridos</li>
          <li>La visualización de números disponibles</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)' , color: 'grey'}}>
        <h2>4. Restricciones de Uso</h2>
        <p>El usuario se compromete a:</p>
        <ul>
          <li>No usar la plataforma para actividades ilegales o fraudulentas</li>
          <li>No falsificar datos personales o información</li>
          <li>No intentar acceder a áreas restringidas del sitio</li>
          <li>No distribuir malware o código malicioso</li>
          <li>No hacer scraping o recolectar datos sin autorización</li>
          <li>No interferir con el funcionamiento normal del servicio</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)' , color: 'grey'}}>
        <h2>5. Responsabilidad de Contenido</h2>
        <p>
          El usuario es responsable por toda la información que proporciona. Khons.dev no se
          responsabiliza por:
        </p>
        <ul>
          <li>Inexactitudes o errores en los datos proporcionados por el usuario</li>
          <li>Pérdida o corrupción de datos debido a fallos técnicos</li>
          <li>Acceso no autorizado a cuentas por culpa del usuario</li>
          <li>Interrupciones temporales del servicio</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>6. Límites de Responsabilidad</h2>
        <p>
          En ningún caso Khons.dev será responsable por daños directos, indirectos, incidentales,
          especiales o consecuentes que resulten del uso o la imposibilidad de usar la plataforma.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>7. Propiedad Intelectual</h2>
        <p>
          Todo el contenido de la plataforma, incluyendo logos, diseño, código fuente y texto,
          es propiedad intelectual de Khons.dev. Se prohíbe su reproducción, distribución o
          modificación sin consentimiento expreso.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>8. Datos Personales</h2>
        <p>
          Para información detallada sobre cómo tratamos datos personales, consulta nuestra
          <a href="/privacy" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
            {' '}Política de Privacidad
          </a>.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>9. Modificaciones</h2>
        <p>
          Khons.dev se reserva el derecho de modificar estos términos en cualquier momento.
          Los cambios entrarán en vigencia inmediatamente después de su publicación. El uso
          continuado de la plataforma implica aceptación de las modificaciones.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>10. Legislación Aplicable</h2>
        <p>
          Estos términos se rigen por las leyes de la República de Colombia. Cualquier
          disputa será resuelta en los juzgados competentes de Colombia.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>11. Contacto</h2>
        <p>
          Para consultas sobre estos términos, puedes contactarnos a través del formulario
          en la página principal de la plataforma.
        </p>
      </section>
    </LegalPage>
  );
}
