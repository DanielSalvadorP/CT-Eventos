/**
 * Rifa Service - Versión 2.0
 * 
 * Maneja múltiples rifas en lugar de una sola
 * Cada rifa tiene su propia configuración y registros
 */

import { database } from './firebase';
import { ref, set, get, update, child, remove } from 'firebase/database';
import { generarNumeroAleatorio, validarRango } from './numberGenerator';

/**
 * RIFAS - CRUD
 */

/**
 * Crea una nueva rifa
 */
export async function crearRifa(datosRifa) {
  try {
    // Validaciones
    if (!datosRifa.nombre || !datosRifa.numeroInicio || !datosRifa.cantidadNumeros) {
      throw new Error('Nombre, número inicial y cantidad son requeridos');
    }

    if (!datosRifa.responsable) {
      throw new Error('El nombre del responsable es requerido');
    }

    if (!datosRifa.fecha) {
      throw new Error('La fecha de la rifa es requerida');
    }

    // Validar rango
    const validacion = validarRango(datosRifa.numeroInicio, datosRifa.cantidadNumeros);
    if (!validacion.valido) {
      throw new Error(validacion.error);
    }

    // Crear ID único para la rifa
    const rifaId = `rifa_${Date.now()}`;

    // Estructura de la rifa
    const nuevaRifa = {
      id: rifaId,
      nombre: datosRifa.nombre,
      responsable: datosRifa.responsable,
      numeroInicio: Number(datosRifa.numeroInicio),
      cantidadNumeros: Number(datosRifa.cantidadNumeros),
      fecha: datosRifa.fecha,
      activa: datosRifa.activa || false,
      numerosUsados: [],
      fechaCreacion: new Date().toISOString()
    };

    // Guardar en Firebase
    await set(ref(database, `rifas/${rifaId}`), nuevaRifa);

    return {
      exito: true,
      rifaId,
      rifa: nuevaRifa
    };
  } catch (error) {
    throw new Error(`Error al crear rifa: ${error.message}`);
  }
}

/**
 * Obtiene todas las rifas
 */
export async function obtenerTodasLasRifas() {
  try {
    const rifasRef = ref(database, 'rifas');
    const snapshot = await get(rifasRef);

    if (snapshot.exists()) {
      const rifas = [];
      snapshot.forEach((child) => {
        rifas.push(child.val());
      });
      return rifas.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    }

    return [];
  } catch (error) {
    throw new Error(`Error al obtener rifas: ${error.message}`);
  }
}

/**
 * Obtiene una rifa específica por ID
 */
export async function obtenerRifa(rifaId) {
  try {
    const rifaRef = ref(database, `rifas/${rifaId}`);
    const snapshot = await get(rifaRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  } catch (error) {
    throw new Error(`Error al obtener rifa: ${error.message}`);
  }
}

/**
 * Obtiene la rifa activa
 */
export async function obtenerRifaActiva() {
  try {
    const rifas = await obtenerTodasLasRifas();
    return rifas.find(r => r.activa) || null;
  } catch (error) {
    throw new Error(`Error al obtener rifa activa: ${error.message}`);
  }
}

/**
 * Actualiza una rifa (marcar activa/inactiva, cambiar nombre, etc)
 */
export async function actualizarRifa(rifaId, datos) {
  try {
    await update(ref(database, `rifas/${rifaId}`), datos);
    return { exito: true };
  } catch (error) {
    throw new Error(`Error al actualizar rifa: ${error.message}`);
  }
}

/**
 * Marca una rifa como activa (desactiva las demás)
 */
export async function marcarRifaComoActiva(rifaId) {
  try {
    // Obtener todas las rifas
    const rifas = await obtenerTodasLasRifas();

    // Desactivar todas excepto la nueva
    for (const rifa of rifas) {
      if (rifa.id !== rifaId) {
        await update(ref(database, `rifas/${rifa.id}`), { activa: false });
      }
    }

    // Activar la seleccionada
    await update(ref(database, `rifas/${rifaId}`), { activa: true });

    return { exito: true };
  } catch (error) {
    throw new Error(`Error al activar rifa: ${error.message}`);
  }
}

/**
 * Elimina una rifa completamente
 */
export async function eliminarRifa(rifaId) {
  try {
    await remove(ref(database, `rifas/${rifaId}`));
    return { exito: true };
  } catch (error) {
    throw new Error(`Error al eliminar rifa: ${error.message}`);
  }
}

/**
 * REGISTROS - por rifa
 */

/**
 * Registra un comprador en una rifa específica
 */
export async function registrarCompradorEnRifa(rifaId, datos) {
  try {
    // Validar datos
    if (!datos.cedula || !datos.nombre || !datos.correo || !datos.telefono) {
      throw new Error('Todos los campos son requeridos');
    }

    // Obtener rifa
    const rifa = await obtenerRifa(rifaId);
    if (!rifa) {
      throw new Error('Rifa no encontrada');
    }

    // Generar número
    const numeroRifa = generarNumeroAleatorio(
      rifa.numeroInicio,
      rifa.cantidadNumeros,
      rifa.numerosUsados || []
    );

    if (!numeroRifa) {
      throw new Error('No hay números disponibles en esta rifa');
    }

    // Crear registro
    const registroId = `${datos.cedula}_${Date.now()}`;
    const nuevoRegistro = {
      cedula: datos.cedula,
      nombre: datos.nombre,
      correo: datos.correo,
      telefono: datos.telefono,
      numeroRifa,
      fecha: new Date().toISOString()
    };

    // Guardar registro
    await set(ref(database, `rifas/${rifaId}/registros/${registroId}`), nuevoRegistro);

    // Actualizar números usados
    const numerosUsados = [...(rifa.numerosUsados || []), numeroRifa];
    await update(ref(database, `rifas/${rifaId}`), { numerosUsados });

    return {
      exito: true,
      registro: nuevoRegistro,
      registroId
    };
  } catch (error) {
    throw new Error(`Error al registrar comprador: ${error.message}`);
  }
}

/**
 * AGREGAR ESTA FUNCIÓN A rifaService.js (después de registrarCompradorEnRifa)
 * 
 * Registra múltiples tickets para un mismo comprador
 */

export async function registrarCompradorMultiplesTickets(rifaId, datos, cantidadTickets) {
  try {
    // Validaciones
    if (!datos.cedula || !datos.nombre || !datos.correo || !datos.telefono) {
      throw new Error('Todos los campos son requeridos');
    }

    if (cantidadTickets <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }

    // Obtener rifa
    const rifa = await obtenerRifa(rifaId);
    if (!rifa) {
      throw new Error('Rifa no encontrada');
    }

    // Validar disponibilidad
    const numerosDisponibles = rifa.cantidadNumeros - (rifa.numerosUsados?.length || 0);
    if (cantidadTickets > numerosDisponibles) {
      throw new Error(
        `No hay suficientes números disponibles. Solicitados: ${cantidadTickets}, Disponibles: ${numerosDisponibles}`
      );
    }

    // Generar N números aleatorios únicos
    const numerosGenerados = [];
    const numerosActuales = [...(rifa.numerosUsados || [])];

    for (let i = 0; i < cantidadTickets; i++) {
      const numero = generarNumeroAleatorio(
        rifa.numeroInicio,
        rifa.cantidadNumeros,
        numerosActuales
      );

      if (!numero) {
        throw new Error(`Error al generar número ${i + 1}`);
      }

      numerosGenerados.push(numero);
      numerosActuales.push(numero);
    }

    // Crear registros
    const registrosCreados = [];
    const timestamps = Date.now();

    for (let i = 0; i < cantidadTickets; i++) {
      const registroId = `${datos.cedula}_${timestamps}_${i}`;
      const nuevoRegistro = {
        cedula: datos.cedula,
        nombre: datos.nombre,
        correo: datos.correo,
        telefono: datos.telefono,
        numeroRifa: numerosGenerados[i],
        fecha: new Date().toISOString(),
        posicionCompra: i + 1, // Para saber cuál fue el ticket 1, 2, 3, etc
        compraTotal: cantidadTickets // Referencia al total comprado
      };

      // Guardar registro
      await set(ref(database, `rifas/${rifaId}/registros/${registroId}`), nuevoRegistro);
      registrosCreados.push({
        id: registroId,
        ...nuevoRegistro
      });
    }

    // Actualizar números usados
    await update(ref(database, `rifas/${rifaId}`), { numerosUsados: numerosActuales });

    return {
      exito: true,
      registrosCreados,
      totalTickets: cantidadTickets,
      numerosAsignados: numerosGenerados
    };
  } catch (error) {
    throw new Error(`Error al registrar comprador: ${error.message}`);
  }
}


/**
 * Obtiene todos los registros de una rifa
 */
export async function obtenerRegistrosDeRifa(rifaId) {
  try {
    const registrosRef = ref(database, `rifas/${rifaId}/registros`);
    const snapshot = await get(registrosRef);

    if (snapshot.exists()) {
      const registros = [];
      snapshot.forEach((child) => {
        registros.push({
          id: child.key,
          ...child.val()
        });
      });
      return registros;
    }

    return [];
  } catch (error) {
    throw new Error(`Error al obtener registros: ${error.message}`);
  }
}

/**
 * Busca un registro en la rifa activa
 */
export async function buscarRegistroEnRifaActiva(tipo, valor) {
  try {
    // Obtener rifa activa
    const rifaActiva = await obtenerRifaActiva();
    if (!rifaActiva) {
      return null;
    }

    // Obtener registros
    const registros = await obtenerRegistrosDeRifa(rifaActiva.id);

    // Buscar
    return registros.find(reg => {
      if (tipo === 'correo') {
        return reg.correo && reg.correo.toLowerCase() === valor.toLowerCase();
      } else if (tipo === 'telefono') {
        return reg.telefono === valor;
      }
      return false;
    }) || null;
  } catch (error) {
    throw new Error(`Error al buscar registro: ${error.message}`);
  }
}


/**
 * AGREGAR ESTA FUNCIÓN A rifaService.js (después de buscarRegistroEnRifaActiva)
 * 
 * Busca todos los tickets de un cliente en la rifa activa
 */

export async function buscarTicketsDelClienteEnRifaActiva(tipo, valor) {
  try {
    // Obtener rifa activa
    const rifaActiva = await obtenerRifaActiva();
    if (!rifaActiva) {
      return [];
    }

    // Obtener registros
    const registros = await obtenerRegistrosDeRifa(rifaActiva.id);

    // Filtrar por tipo (correo o teléfono)
    const ticketsDelCliente = registros.filter(reg => {
      if (tipo === 'correo') {
        return reg.correo && reg.correo.toLowerCase() === valor.toLowerCase();
      } else if (tipo === 'telefono') {
        return reg.telefono === valor;
      }
      return false;
    });

    // Ordenar por fecha y posición de compra
    return ticketsDelCliente.sort((a, b) => {
      if (a.fecha === b.fecha) {
        return (a.posicionCompra || 0) - (b.posicionCompra || 0);
      }
      return new Date(a.fecha) - new Date(b.fecha);
    });
  } catch (error) {
    throw new Error(`Error al buscar tickets: ${error.message}`);
  }
}

/**
 * Elimina un registro de una rifa
 */
export async function eliminarRegistroDeRifa(rifaId, registroId) {
  try {
    // Obtener registro para obtener el número
    const rifa = await obtenerRifa(rifaId);
    const registros = await obtenerRegistrosDeRifa(rifaId);
    const registro = registros.find(r => r.id === registroId);

    if (registro) {
      // Remover número de numerosUsados
      const numerosUsados = (rifa.numerosUsados || []).filter(n => n !== registro.numeroRifa);
      await update(ref(database, `rifas/${rifaId}`), { numerosUsados });
    }

    // Eliminar registro
    await remove(ref(database, `rifas/${rifaId}/registros/${registroId}`));

    return { exito: true };
  } catch (error) {
    throw new Error(`Error al eliminar registro: ${error.message}`);
  }
}

/**
 * ESTADÍSTICAS
 */

/**
 * Obtiene estadísticas de una rifa
 */
export async function obtenerEstadisticasRifa(rifaId) {
  try {
    const rifa = await obtenerRifa(rifaId);
    const registros = await obtenerRegistrosDeRifa(rifaId);

    const totalNumeros = rifa.cantidadNumeros;
    const numerosUsados = rifa.numerosUsados?.length || 0;
    const disponibles = totalNumeros - numerosUsados;

    return {
      totalNumeros,
      numerosUsados,
      disponibles,
      porcentajeUsado: totalNumeros > 0 ? Math.round((numerosUsados / totalNumeros) * 100) : 0,
      totalRegistros: registros.length
    };
  } catch (error) {
    throw new Error(`Error al obtener estadísticas: ${error.message}`);
  }
}