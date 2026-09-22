/**
 * Number Generator Service
 * 
 * Maneja la lógica de generación de números aleatorios irrepetibles
 * para la rifa, respetando el rango configurado.
 */

/**
 * Genera un número aleatorio irrepetible dentro del rango
 * 
 * @param {number} numeroInicio - Número inicial del rango (ej: 11111)
 * @param {number} cantidadNumeros - Cantidad de números disponibles (ej: 10000)
 * @param {array} numerosUsados - Array de números ya utilizados
 * @returns {number|null} - Número generado o null si no hay disponibles
 */
export function generarNumeroAleatorio(numeroInicio, cantidadNumeros, numerosUsados = []) {
  // Validar entrada
  if (!numeroInicio || !cantidadNumeros || cantidadNumeros <= 0) {
    throw new Error('Configuración de números inválida');
  }

  // Convertir a números (por si vienen como strings)
  const inicio = Number(numeroInicio);
  const cantidad = Number(cantidadNumeros);
  const usados = new Set(numerosUsados);

  // Buscar números disponibles
  const disponibles = [];
  for (let i = 0; i < cantidad; i++) {
    const num = inicio + i;
    if (!usados.has(num)) {
      disponibles.push(num);
    }
  }

  // Si no hay números disponibles
  if (disponibles.length === 0) {
    return null;
  }

  // Generar un índice aleatorio y retornar ese número
  const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
  return disponibles[indiceAleatorio];
}

/**
 * Calcula estadísticas del rango de números
 * 
 * @param {number} cantidadTotal - Total de números en el rango
 * @param {array} numerosUsados - Números ya utilizados
 * @returns {object} - Objeto con estadísticas
 */
export function calcularEstadisticas(cantidadTotal, numerosUsados = []) {
  const usados = numerosUsados.length;
  const disponibles = cantidadTotal - usados;
  const porcentajeUsado = cantidadTotal > 0 ? Math.round((usados / cantidadTotal) * 100) : 0;

  return {
    total: cantidadTotal,
    usados,
    disponibles,
    porcentajeUsado
  };
}

/**
 * Valida si el rango configurado es válido
 * 
 * @param {number} numeroInicio - Número inicial
 * @param {number} cantidadNumeros - Cantidad de números
 * @returns {object} - { valido: boolean, error?: string }
 */
export function validarRango(numeroInicio, cantidadNumeros) {
  if (!numeroInicio || !cantidadNumeros) {
    return { valido: false, error: 'Faltan datos de configuración' };
  }

  if (cantidadNumeros <= 0) {
    return { valido: false, error: 'La cantidad debe ser mayor a 0' };
  }

  if (cantidadNumeros > 999999) {
    return { valido: false, error: 'No puedes generar más de 999.999 números' };
  }

  return { valido: true };
}