/**
 * pages/privacy.jsx
 *
 * Política de Privacidad
 */

import { LegalPage } from '../src/components/common/LegalPage';

export default function Privacy() {
  return (
    <LegalPage
      title="Política de Privacidad"
      description="Cómo protegemos y gestionamos tus datos personales"
      metaDescription="Política de Privacidad de @EL DEL CT Eventos - Protección de datos personales"
    >
      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>1. Identificación del Responsable</h2>
        <p>
          <strong>Empresa:</strong> Khons.dev<br />
          <strong>País:</strong> Colombia<br />
          <strong>Actividad:</strong> Plataforma de gestión de rifas online
        </p>
        <p>
          Esta política de privacidad cumple con la Ley 1581 de 2012 (LSPDCP - Ley de
          Protección de Datos Personales de Colombia).
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>2. Datos Personales que Recopilamos</h2>
        <p>Recopilamos los siguientes datos personales para prestar nuestro servicio:</p>
        <ul>
          <li><strong>Nombre Completo:</strong> Identificación del comprador</li>
          <li><strong>Cédula de Ciudadanía:</strong> Validación de identidad</li>
          <li><strong>Correo Electrónico:</strong> Contacto y comunicaciones</li>
          <li><strong>Número de Teléfono:</strong> Contacto directo</li>
        </ul>
        <p>
          <strong>Nota:</strong> No recopilamos datos de navegación, cookies de seguimiento
          o información de localización.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>3. Propósito del Tratamiento</h2>
        <p>
          Utilizamos tus datos personales exclusivamente para:
        </p>
        <ul>
          <li>Registrar tu compra de números de rifa</li>
          <li>Permitir la búsqueda y validación de tus números</li>
          <li>Comunicaciones relacionadas con la rifa (opcional)</li>
          <li>Cumplir obligaciones legales y regulatorias</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>4. Almacenamiento y Seguridad</h2>
        <p>
          Tus datos se almacenan en Firebase Realtime Database con seguridad de nivel empresarial.
          Implementamos:
        </p>
        <ul>
          <li>Encriptación en tránsito (HTTPS)</li>
          <li>Reglas de seguridad en la base de datos</li>
          <li>Autenticación segura (Google Sign-In)</li>
          <li>Acceso restringido solo al propietario de la rifa</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>5. Período de Retención</h2>
        <p>
          <strong>Período de Retención: 30 días</strong>
        </p>
        <p>
          Tus datos personales se conservarán durante 30 días después de la finalización
          oficial de la rifa (cuando se haya anunciado el número ganador). Después de este
          período, tus datos serán eliminados automáticamente de nuestros servidores.
        </p>
        <p>
          <strong>Excepciones:</strong> Si es requerido por ley, los datos pueden retenerse
          por más tiempo.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>6. Derechos del Usuario</h2>
        <p>
          De conformidad con la Ley 1581 de 2012, tienes derecho a:
        </p>
        <ul>
          <li><strong>Acceso:</strong> Conocer qué datos tenemos de ti</li>
          <li><strong>Rectificación:</strong> Corregir datos inexactos</li>
          <li><strong>Eliminación:</strong> Solicitar la cancelación de tus datos</li>
          <li><strong>Oposición:</strong> Revocar el consentimiento</li>
          <li><strong>Portabilidad:</strong> Recibir una copia de tus datos</li>
        </ul>
        <p>
          Para ejercer estos derechos, contacta con nosotros a través del formulario en
          la página principal.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>7. Transferencias a Terceros</h2>
        <p>
          <strong>No compartimos tus datos con terceros.</strong> Tus datos se usan
          exclusivamente por la plataforma y el administrador de la rifa.
        </p>
        <p>
          <strong>Excepciones:</strong> Solo si es requerido por autoridades legales
          o regulatorias de Colombia.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>8. Seguridad de Datos</h2>
        <p>
          Implementamos medidas técnicas y organizacionales para proteger tus datos contra:
        </p>
        <ul>
          <li>Acceso no autorizado</li>
          <li>Pérdida o alteración</li>
          <li>Procesamiento ilícito</li>
        </ul>
        <p>
          Sin embargo, ningún sistema es 100% seguro. Usamos HTTPS y Firebase con
          configuración de seguridad robusta.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>9. Cookies y Tracking</h2>
        <p>
          <strong>No usamos cookies de seguimiento ni Google Analytics.</strong>
        </p>
        <p>
          Solo usamos cookies técnicas de sesión para:
        </p>
        <ul>
          <li>Mantener sesión de login de administrador activa</li>
          <li>Recordar preferencias de idioma (si aplica)</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>10. Menores de Edad</h2>
        <p>
          La plataforma está dirigida a mayores de 18 años. No recopilamos conscientemente
          datos de menores. Si crees que hemos recopilado datos de un menor, contactanos
          inmediatamente.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>11. Cambios en Esta Política</h2>
        <p>
          Podemos actualizar esta política ocasionalmente. Los cambios entrarán en vigencia
          cuando se publiquen en este sitio. Te recomendamos revisar esta política
          regularmente.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>12. Reclamaciones</h2>
        <p>
          Si consideras que tus derechos han sido vulnerados, puedes:
        </p>
        <ul>
          <li>Contactarnos a través del formulario en la página principal</li>
          <li>Presentar una reclamación ante la Superintendencia de Industria y Comercio (SIC) en Colombia</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-2xl)', color: 'grey'}}>
        <h2>13. Contacto</h2>
        <p>
          Para preguntas o solicitudes relacionadas con privacidad, puedes comunicarte
          a través del formulario en la página principal de la plataforma.
        </p>
        <p>
          <strong>Responsable de Datos:</strong> Khons.dev<br />
          <strong>País:</strong> Colombia
        </p>
      </section>

      <div style={{
        marginTop: 'var(--space-3xl)',
        padding: 'var(--space-lg)',
        backgroundColor: 'var(--color-gray-100)',
        borderRadius: 'var(--border-radius-md)',
        borderLeft: '4px solid var(--color-primary)'
      }}>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'grey'}}>
          <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}<br />
          <strong>Vigencia:</strong> Esta política está en vigor desde su publicación y se aplica a todos los usuarios nuevos y existentes.
        </p>
      </div>
    </LegalPage>
  );
}
