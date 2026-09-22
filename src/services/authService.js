/**
 * Auth Service
 * 
 * Maneja la autenticación del panel admin
 * Nota: Esta es una autenticación simple basada en contraseña
 * Para producción con muchos usuarios, migrar a Firebase Auth
 */

import { obtenerConfig, actualizarPasswordAdmin } from './rifaService';

/**
 * Valida la contraseña admin
 */
export async function validarPasswordAdmin(passwordIngresada) {
  try {
    const config = await obtenerConfig();
    return passwordIngresada === config.passwordAdmin;
  } catch (error) {
    console.error('Error al validar contraseña:', error);
    return false;
  }
}

/**
 * Cambia la contraseña admin
 */
export async function cambiarPasswordAdmin(passwordActual, passwordNueva) {
  try {
    // Validar que la contraseña actual sea correcta
    const esValida = await validarPasswordAdmin(passwordActual);
    if (!esValida) {
      throw new Error('Contraseña actual incorrecta');
    }

    // Validar requisitos de la nueva contraseña
    const validacion = validarPasswordNueva(passwordNueva);
    if (!validacion.valido) {
      throw new Error(validacion.error);
    }

    // Actualizar en Firebase
    await actualizarPasswordAdmin(passwordNueva);

    return { exito: true };
  } catch (error) {
    throw new Error(`Error al cambiar contraseña: ${error.message}`);
  }
}

/**
 * Valida requisitos de una nueva contraseña
 */
export function validarPasswordNueva(password) {
  if (!password) {
    return { valido: false, error: 'La contraseña no puede estar vacía' };
  }

  if (password.length < 6) {
    return { valido: false, error: 'Mínimo 6 caracteres' };
  }

  if (password.length > 100) {
    return { valido: false, error: 'Máximo 100 caracteres' };
  }

  return { valido: true };
}

/**
 * Crea un token de sesión (simple, en memoria)
 * Para producción: usar JWT o sesiones de servidor
 */
export function crearTokenSesion() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Valida si un token de sesión es válido
 * (Simple validación - mejorar en producción)
 */
export function validarTokenSesion(token) {
  return token && token.startsWith('session_');
}