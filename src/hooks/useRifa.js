/**
 * useRifa Hook - Versión 3.0
 * 
 * Maneja la lógica de rifas múltiples por usuario
 * Requiere autenticación Firebase
 */

import { useState } from 'react';
import { useAuth } from './useAuth';
import * as rifaService from '../services/rifaService';

export function useRifa() {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validar que hay usuario autenticado
  const userId = user?.uid;

  /**
   * RIFAS
   */

  const crearRifa = async (datos) => {
    try {
      setError(null);
      if (!userId) throw new Error('Usuario no autenticado');
      const resultado = await rifaService.crearRifa(userId, datos);
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const obtenerRifas = async () => {
    try {
      setError(null);
      if (!userId) throw new Error('Usuario no autenticado');
      return await rifaService.obtenerTodasLasRifas(userId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const obtenerRifa = async (rifaId) => {
    try {
      setError(null);
      if (!userId) throw new Error('Usuario no autenticado');
      return await rifaService.obtenerRifa(userId, rifaId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const obtenerRifaActiva = async () => {
    try {
      setError(null);
      if (!userId) throw new Error('Usuario no autenticado');
      return await rifaService.obtenerRifaActiva(userId);
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const activarRifa = async (rifaId) => {
    try {
      setError(null);
      if (!userId) throw new Error('Usuario no autenticado');
      return await rifaService.marcarRifaComoActiva(userId, rifaId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const eliminarRifa = async (rifaId) => {
    try {
      setError(null);
      if (!userId) throw new Error('Usuario no autenticado');
      return await rifaService.eliminarRifa(userId, rifaId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * REGISTROS
   */

  const registrarCompradorMultiplesTickets = async (rifaId, datos, cantidadTickets) => {
    try {
      setError(null);
      if (!userId) throw new Error('Usuario no autenticado');
      const resultado = await rifaService.registrarCompradorMultiplesTickets(
        userId,
        rifaId,
        datos,
        cantidadTickets
      );
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const obtenerRegistrosDeRifa = async (rifaId) => {
    try {
      setError(null);
      if (!userId) throw new Error('Usuario no autenticado');
      return await rifaService.obtenerRegistrosDeRifa(userId, rifaId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const eliminarRegistroDeRifa = async (rifaId, registroId) => {
    try {
      setError(null);
      if (!userId) throw new Error('Usuario no autenticado');
      return await rifaService.eliminarRegistroDeRifa(userId, rifaId, registroId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * ESTADÍSTICAS
   */

  const obtenerEstadisticas = async (rifaId) => {
    try {
      setError(null);
      if (!userId) throw new Error('Usuario no autenticado');
      return await rifaService.obtenerEstadisticasRifa(userId, rifaId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    // Rifas
    crearRifa,
    obtenerRifas,
    obtenerRifa,
    obtenerRifaActiva,
    activarRifa,
    eliminarRifa,

    // Registros
    registrarCompradorMultiplesTickets,
    obtenerRegistrosDeRifa,
    eliminarRegistroDeRifa,


    // Estadísticas
    obtenerEstadisticas,

    // Estado
    error,
    loading,
    userId
  };
}