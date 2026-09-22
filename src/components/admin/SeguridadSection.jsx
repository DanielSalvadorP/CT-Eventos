/**
 * SeguridadSection Component
 * 
 * Panel para cambiar la contraseña del administrador
 */

import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function SeguridadSection({ onCambiarPassword, loading }) {
  const [formData, setFormData] = useState({
    passwordActual: '',
    passwordNueva: '',
    passwordNuevaConfirm: ''
  });

  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(false);

    // Validaciones
    if (!formData.passwordActual) {
      setError('Ingresa la contraseña actual');
      return;
    }

    if (!formData.passwordNueva) {
      setError('Ingresa una contraseña nueva');
      return;
    }

    if (formData.passwordNueva.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres');
      return;
    }

    if (formData.passwordNueva !== formData.passwordNuevaConfirm) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    if (formData.passwordActual === formData.passwordNueva) {
      setError('La contraseña nueva debe ser diferente a la actual');
      return;
    }

    const resultado = await onCambiarPassword(formData.passwordActual, formData.passwordNueva);

    if (resultado) {
      setExito(true);
      setFormData({
        passwordActual: '',
        passwordNueva: '',
        passwordNuevaConfirm: ''
      });
      
      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => setExito(false), 5000);
    } else {
      setError('Error al cambiar la contraseña');
    }
  };

  return (
    <div style={{display:'flex', width: '100%', justifyContent:'center'}}>
      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="card-header">
          <h3  style={{color: 'grey'}}>Cambiar Contraseña</h3>
        </div>

        <div className="card-body">
          {error && <div className="alert alert-error">{error}</div>}
          
          {exito && <div className="alert alert-success">✅ Contraseña cambiada exitosamente</div>}

          <form onSubmit={handleSubmit}>
            <Input
              label="Contraseña Actual"
              name="passwordActual"
              type="password"
              value={formData.passwordActual}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <Input
              label="Contraseña Nueva"
              name="passwordNueva"
              type="password"
              value={formData.passwordNueva}
              onChange={handleChange}
              disabled={loading}
              required
              helperText="Mínimo 6 caracteres"
            />

            <Input
              label="Confirmar Contraseña Nueva"
              name="passwordNuevaConfirm"
              type="password"
              value={formData.passwordNuevaConfirm}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={loading}
              disabled={loading}
              className="btn-block"
              style={{ marginTop: 'var(--space-lg)' }}
            >
              Cambiar Contraseña
            </Button>
          </form>

          <div style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-md)', backgroundColor: 'var(--color-warning-light)', borderRadius: 'var(--border-radius-md)', fontSize: 'var(--font-size-sm)' , color:'grey'}}>
            <strong>Consejo de seguridad:</strong>
            <ul style={{ marginTop: 'var(--space-sm)', paddingLeft: 'var(--space-lg)' }}>
              <li>Usa una contraseña fuerte con números y caracteres especiales</li>
              <li>No compartas tu contraseña con nadie</li>
              <li>Cambia la contraseña regularmente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}