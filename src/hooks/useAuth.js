/**
 * useAuth Hook
 * 
 * Maneja la lógica de autenticación del panel admin
 * Reutilizable en múltiples componentes
 */

import { useState, useEffect, useCallback } from 'react';
import { validarPasswordAdmin, cambiarPasswordAdmin, crearTokenSesion, validarTokenSesion } from '../services/authService';

export function useAuth() {
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // Verificar sesión al montar
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('adminToken');
    if (tokenGuardado && validarTokenSesion(tokenGuardado)) {
      setIsAutenticado(true);
      setToken(tokenGuardado);
    }
    setLoading(false);
  }, []);

  // Login
  const login = useCallback(async (password) => {
    setLoading(true);
    setError(null);

    try {
      const esValido = await validarPasswordAdmin(password);
      
      if (!esValido) {
        setError('Contraseña incorrecta');
        return false;
      }

      const nuevoToken = crearTokenSesion();
      localStorage.setItem('adminToken', nuevoToken);
      setToken(nuevoToken);
      setIsAutenticado(true);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAutenticado(false);
    setError(null);
  }, []);

  // Cambiar contraseña
  const cambiarPassword = useCallback(async (passwordActual, passwordNueva) => {
    setLoading(true);
    setError(null);

    try {
      await cambiarPasswordAdmin(passwordActual, passwordNueva);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    isAutenticado,
    loading,
    error,
    token,
    login,
    logout,
    cambiarPassword,
    setError
  };
}