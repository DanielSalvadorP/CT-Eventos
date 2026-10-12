import { database } from './firebase';
import { ref, set, get, update, child, remove } from 'firebase/database';
import { generarNumeroAleatorio, validarRango, generarMultiplesNumeros } from './numberGenerator';

/**
 * Crea una nueva rifa bajo el usuario actual
 */
export async function crearRifa(userId, datosRifa) {
  try {
    if (!userId) throw new Error('Usuario no autenticado');
    if (!datosRifa.nombre || !datosRifa.cantidadDigitos || !datosRifa.cantidadNumeros) {
      throw new Error('Nombre, cantidad de dígitos y cantidad de números son requeridos');
    }
    if (!datosRifa.responsable) {
      throw new Error('El nombre del responsable es requerido');
    }
    if (!datosRifa.fecha) {
      throw new Error('La fecha de la rifa es requerida');
    }

    const validacion = validarRango(datosRifa.cantidadDigitos, datosRifa.cantidadNumeros);
    if (!validacion.valido) {
      throw new Error(validacion.error);
    }

    const rifaId = `rifa_${Date.now()}`;

    const nuevaRifa = {
      id: rifaId,
      nombre: datosRifa.nombre,
      responsable: datosRifa.responsable,
      cantidadDigitos: Number(datosRifa.cantidadDigitos),
      cantidadNumeros: Number(datosRifa.cantidadNumeros),
      fecha: datosRifa.fecha,
      activa: datosRifa.activa || false,
      numerosUsados: [],
      fechaCreacion: new Date().toISOString()
    };

    // ← CAMBIO: guarda bajo usuarios/{userId}/rifas/
    await set(ref(database, `usuarios/${userId}/rifas/${rifaId}`), nuevaRifa);

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
 * Obtiene todas las rifas del usuario actual
 */
export async function obtenerTodasLasRifas(userId) {
  try {
    if (!userId) throw new Error('Usuario no autenticado');

    // ← CAMBIO: lee de usuarios/{userId}/rifas/
    const rifasRef = ref(database, `usuarios/${userId}/rifas`);
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
 * Obtiene una rifa específica
 */
export async function obtenerRifa(userId, rifaId) {
  try {
    if (!userId) throw new Error('Usuario no autenticado');

    const rifaRef = ref(database, `usuarios/${userId}/rifas/${rifaId}`);
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
 * Obtiene la rifa activa del usuario
 */
export async function obtenerRifaActiva(userId) {
  try {
    if (!userId) throw new Error('Usuario no autenticado');

    const rifas = await obtenerTodasLasRifas(userId);
    return rifas.find(r => r.activa) || null;
  } catch (error) {
    throw new Error(`Error al obtener rifa activa: ${error.message}`);
  }
}

/**
 * Marca una rifa como activa (desactiva las demás)
 */
export async function marcarRifaComoActiva(userId, rifaId) {
  try {
    if (!userId) throw new Error('Usuario no autenticado');

    const rifas = await obtenerTodasLasRifas(userId);

    for (const rifa of rifas) {
      if (rifa.id !== rifaId) {
        await update(ref(database, `usuarios/${userId}/rifas/${rifa.id}`), { activa: false });
      }
    }

    await update(ref(database, `usuarios/${userId}/rifas/${rifaId}`), { activa: true });

    return { exito: true };
  } catch (error) {
    throw new Error(`Error al activar rifa: ${error.message}`);
  }
}

/**
 * Elimina una rifa completamente
 */
export async function eliminarRifa(userId, rifaId) {
  try {
    if (!userId) throw new Error('Usuario no autenticado');

    await remove(ref(database, `usuarios/${userId}/rifas/${rifaId}`));
    return { exito: true };
  } catch (error) {
    throw new Error(`Error al eliminar rifa: ${error.message}`);
  }
}

/**
 * Registra múltiples tickets para un comprador
 */
export async function registrarCompradorMultiplesTickets(userId, rifaId, datos, cantidadTickets) {
  try {
    if (!userId) throw new Error('Usuario no autenticado');
    if (!datos.cedula || !datos.nombre || !datos.correo || !datos.telefono) {
      throw new Error('Todos los campos son requeridos');
    }
    if (cantidadTickets <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }

    const rifa = await obtenerRifa(userId, rifaId);
    if (!rifa) {
      throw new Error('Rifa no encontrada');
    }

    const numerosDisponibles = rifa.cantidadNumeros - (rifa.numerosUsados?.length || 0);
    if (cantidadTickets > numerosDisponibles) {
      throw new Error(
        `No hay suficientes números disponibles. Solicitados: ${cantidadTickets}, Disponibles: ${numerosDisponibles}`
      );
    }

    const numerosGenerados = [];
    const numerosActuales = [...(rifa.numerosUsados || [])];

    for (let i = 0; i < cantidadTickets; i++) {
      const numero = generarNumeroAleatorio(rifa.cantidadDigitos, numerosActuales);

      if (!numero) {
        throw new Error(`Error al generar número ${i + 1}`);
      }

      numerosGenerados.push(numero);
      numerosActuales.push(numero);
    }

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
        posicionCompra: i + 1,
        compraTotal: cantidadTickets
      };

      // ← CAMBIO: guarda bajo usuarios/{userId}/rifas/{rifaId}/registros/
      await set(ref(database, `usuarios/${userId}/rifas/${rifaId}/registros/${registroId}`), nuevoRegistro);
      registrosCreados.push({
        id: registroId,
        ...nuevoRegistro
      });
    }

    // ← CAMBIO: actualiza en usuarios/{userId}/rifas/{rifaId}
    await update(ref(database, `usuarios/${userId}/rifas/${rifaId}`), { numerosUsados: numerosActuales });

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
export async function obtenerRegistrosDeRifa(userId, rifaId) {
  try {
    if (!userId) throw new Error('Usuario no autenticado');

    const registrosRef = ref(database, `usuarios/${userId}/rifas/${rifaId}/registros`);
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
 * Elimina un registro de una rifa
 */
export async function eliminarRegistroDeRifa(userId, rifaId, registroId) {
  try {
    if (!userId) throw new Error('Usuario no autenticado');

    const rifa = await obtenerRifa(userId, rifaId);
    const registros = await obtenerRegistrosDeRifa(userId, rifaId);
    const registro = registros.find(r => r.id === registroId);

    if (registro) {
      const numerosUsados = (rifa.numerosUsados || []).filter(n => n !== registro.numeroRifa);
      await update(ref(database, `usuarios/${userId}/rifas/${rifaId}`), { numerosUsados });
    }

    await remove(ref(database, `usuarios/${userId}/rifas/${rifaId}/registros/${registroId}`));

    return { exito: true };
  } catch (error) {
    throw new Error(`Error al eliminar registro: ${error.message}`);
  }
}

/**
 * Obtiene una rifa específica PÚBLICAMENTE (sin autenticación)
 * Usada para la página pública de consulta
 */
export async function obtenerRifaPublica(rifaId, userId = null) {
  try {
    // Primero intenta leer de la ruta pública
    const rifaRef = ref(database, `rifas/${rifaId}`);
    let snapshot = await get(rifaRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    // Si no existe y tenemos userId, intenta la ruta privada
    if (userId) {
      const rifaRefPrivada = ref(database, `usuarios/${userId}/rifas/${rifaId}`);
      snapshot = await get(rifaRefPrivada);
      
      if (snapshot.exists()) {
        return snapshot.val();
      }
    }

    return null;
  } catch (error) {
    throw new Error(`Error al obtener rifa: ${error.message}`);
  }
}

/**
 * Obtiene estadísticas de una rifa
 */
export async function obtenerEstadisticasRifa(userId, rifaId) {
  try {
    if (!userId) throw new Error('Usuario no autenticado');

    const rifa = await obtenerRifa(userId, rifaId);
    const registros = await obtenerRegistrosDeRifa(userId, rifaId);

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

export async function finalizarRifa(userId, rifaId, numeroGanador) {
  const database = getDatabase();
  const rifaRef = ref(database, `usuarios/${userId}/rifas/${rifaId}`);

  const ahora = new Date().toISOString();

  return update(rifaRef, {
    finalizada: true,
    numeroGanador: numeroGanador,
    fechaFinalizacion: ahora,
    modificadoEn: ahora
  });
}