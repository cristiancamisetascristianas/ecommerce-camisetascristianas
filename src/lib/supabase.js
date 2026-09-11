import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

const faltantes = [
  !url && 'VITE_SUPABASE_URL',
  !key && 'VITE_SUPABASE_ANON_KEY',
].filter(Boolean)

// Si falta una credencial, createClient lanza al importar el módulo y la
// página entera queda en blanco sin decir por qué. En vez de eso se devuelve
// un cliente inactivo: las consultas resuelven con error, el catálogo muestra
// su aviso y la consola dice exactamente qué variable falta.
function clienteInactivo(motivo) {
  const error = { message: motivo }
  const consulta = {
    select: () => consulta,
    eq: () => consulta,
    order: () => consulta,
    limit: () => consulta,
    then: (cb) => Promise.resolve().then(() => cb({ data: null, error })),
  }
  return { from: () => consulta }
}

let cliente

if (faltantes.length > 0) {
  const motivo =
    `Faltan variables de entorno: ${faltantes.join(', ')}. ` +
    'Revisa el archivo .env en la raíz del proyecto.'
  console.error('[Supabase]', motivo)
  cliente = clienteInactivo(motivo)
} else {
  cliente = createClient(url, key)
}

export const supabase = cliente
