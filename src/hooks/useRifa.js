/**
 * useRifa Hook - Versión 2.0
 * 
 * Maneja la lógica de rifas múltiples
 */

import { useState } from 'react';
import * as rifaService from '../services/rifaService';

export function useRifa() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * RIFAS
   */

  const crearRifa = async (datos) => {
    try {
      setError(null);
      const resultado = await rifaService.crearRifa(datos);
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const obtenerRifas = async () => {
    try {
      setError(null);
      return await rifaService.obtenerTodasLasRifas();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const obtenerRifa = async (rifaId) => {
    try {
      setError(null);
      return await rifaService.obtenerRifa(rifaId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const obtenerRifaActiva = async () => {
    try {
      setError(null);
      return await rifaService.obtenerRifaActiva();
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const activarRifa = async (rifaId) => {
    try {
      setError(null);
      return await rifaService.marcarRifaComoActiva(rifaId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const eliminarRifa = async (rifaId) => {
    try {
      setError(null);
      return await rifaService.eliminarRifa(rifaId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * REGISTROS
   */

  const registrarCompradorEnRifaActiva = async (rifaId, datos) => {
    try {
      setError(null);
      const resultado = await rifaService.registrarCompradorEnRifa(rifaId, datos);
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const buscarEnRifaActiva = async (tipo, valor) => {
    try {
      setError(null);
      return await rifaService.buscarRegistroEnRifaActiva(tipo, valor);
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
      return await rifaService.obtenerEstadisticasRifa(rifaId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Registra múltiples tickets para un comprador
   */
  const registrarCompradorMultiplesTickets = async (rifaId, datos, cantidadTickets) => {
    try {
      setError(null);
      const resultado = await rifaService.registrarCompradorMultiplesTickets(rifaId, datos, cantidadTickets);
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
 
  /**
   * Busca todos los tickets de un cliente en rifa activa
   */
  const buscarTicketsDelCliente = async (tipo, valor) => {
    try {
      setError(null);
      return await rifaService.buscarTicketsDelClienteEnRifaActiva(tipo, valor);
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
    registrarCompradorEnRifaActiva,
    buscarEnRifaActiva,
    
    // Estadísticas
    obtenerEstadisticas,
    
// NUEVAS:
    registrarCompradorMultiplesTickets,
    buscarTicketsDelCliente,

    // Estado
    error,
    loading
  };
}