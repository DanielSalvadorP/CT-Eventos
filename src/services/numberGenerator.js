/**
 * Number Generator - Versión 2.0
 * 
 * Genera números aleatorios con N dígitos
 * Rellena con ceros a la izquierda
 */

/**
 * Valida el rango (ahora validamos cantidad de dígitos y cantidad de tickets)
 */
export function validarRango(cantidadDigitos, cantidadTickets) {
  if (!cantidadDigitos || cantidadDigitos < 1) {
    return { valido: false, error: 'Cantidad de dígitos debe ser mayor a 0' };
  }

  if (!cantidadTickets || cantidadTickets < 1) {
    return { valido: false, error: 'Cantidad de tickets debe ser mayor a 0' };
  }

  // Validar que la cantidad de tickets no supere el máximo posible para esa cantidad de dígitos
  const maxPosibles = Math.pow(10, cantidadDigitos);
  if (cantidadTickets > maxPosibles) {
    return {
      valido: false,
      error: `Con ${cantidadDigitos} dígitos, máximo ${maxPosibles.toLocaleString('es-ES')} tickets posibles. Solicitaste ${cantidadTickets.toLocaleString('es-ES')}`
    };
  }

  return { valido: true };
}

/**
 * Genera un número aleatorio con N dígitos
 * 
 * @param {number} cantidadDigitos - Cantidad de dígitos (ej: 6)
 * @param {array} numerosUsados - Array de números ya usados
 * @returns {string} Número formateado con ceros a la izquierda (ej: "000523")
 */
export function generarNumeroAleatorio(cantidadDigitos, numerosUsados = []) {
  try {
    // Validar que cantidadDigitos sea un número válido
    const digitos = Number(cantidadDigitos);
    if (!digitos || digitos < 1 || isNaN(digitos)) {
      throw new Error(`cantidadDigitos inválida: ${cantidadDigitos}. Debe ser un número mayor a 0`);
    }

    const max = Math.pow(10, digitos) - 1;
    const numeroMinimo = 0;

    // Asegurar que numerosUsados es un array (Firebase a veces lo convierte a objeto)
    let numerosUsadosArray = [];
    if (Array.isArray(numerosUsados)) {
      numerosUsadosArray = numerosUsados;
    } else if (numerosUsados && typeof numerosUsados === 'object') {
      numerosUsadosArray = Object.values(numerosUsados);
    }

    // Convertir números usados a strings para comparación
    const numerosUsadosStr = new Set(numerosUsadosArray.map(n => String(n).padStart(digitos, '0')));
    // Si ya se usaron todos los números posibles
    if (numerosUsadosStr.size >= max + 1) {
      throw new Error('No hay más números disponibles');
    }

    // Generar número aleatorio único
    let numero;
    let numeroFormateado;
    let intentos = 0;
    const maxIntentos = 10000;

    do {
      numero = Math.floor(Math.random() * (max + 1));
      numeroFormateado = numero.toString().padStart(digitos, '0');
      intentos++;

      if (intentos > maxIntentos) {
        throw new Error('No se pudo generar un número único después de varios intentos');
      }
    } while (numerosUsadosStr.has(numeroFormateado));

    return numeroFormateado;
  } catch (error) {
    throw new Error(`Error al generar número: ${error.message}`);
  }
}

/**
 * Genera múltiples números aleatorios sin repetición
 * 
 * @param {number} cantidadDigitos - Cantidad de dígitos
 * @param {number} cantidad - Cuántos números generar
 * @param {array} numerosUsados - Números ya utilizados
 * @returns {array} Array de números formateados
 */
export function generarMultiplesNumeros(cantidadDigitos, cantidad, numerosUsados = []) {
  try {
    const numerosGenerados = [];

    for (let i = 0; i < cantidad; i++) {
      const numero = generarNumeroAleatorio(
        cantidadDigitos,
        [...numerosUsados, ...numerosGenerados]
      );
      numerosGenerados.push(numero);
    }

    return numerosGenerados;
  } catch (error) {
    throw new Error(`Error al generar múltiples números: ${error.message}`);
  }
}

/**
 * Formatea un número con N dígitos (rellena con ceros)
 * 
 * @param {string|number} numero - El número a formatear
 * @param {number} digitos - Cantidad total de dígitos
 * @returns {string} Número formateado
 */
export function formatearNumero(numero, digitos) {
  return String(numero).padStart(digitos, '0');
}