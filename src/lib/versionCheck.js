const STORAGE_KEY = 'app_version'

export async function checkAppVersion() {
  try {
    // Cache-bust para que el browser siempre consulte al servidor
    const res = await fetch(`/version.json?_=${Date.now()}`)
    if (!res.ok) return

    const { version } = await res.json()
    const stored = localStorage.getItem(STORAGE_KEY)

    // Primera visita: guarda la versión y sigue
    if (stored === null) {
      localStorage.setItem(STORAGE_KEY, version)
      return
    }

    // Versión diferente → actualiza y recarga para coger el build nuevo
    if (stored !== version) {
      localStorage.setItem(STORAGE_KEY, version)
      window.location.reload(true)
      // Detiene la ejecución mientras se recarga la página
      await new Promise(() => {})
    }
  } catch {
    // Sin conexión o falla el fetch → no bloquear la app
  }
}
