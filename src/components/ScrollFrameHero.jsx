const STORAGE_KEY = 'app_version'

export async function checkAppVersion() {
  try {
    // Cache-bust para que el browser siempre consulte al servidor
    const res = await fetch(`/version.json?_=${Date.now()}`)
    if (!res.ok) return

    const { version } = await res.json()
    const stored = localStorage.getItem(STORAGE_KEY)

    console.log(`%c En Tus Manos Estoy %c v${version} `,
      'background:#1f1a16;color:#faf7f2;padding:2px 0;border-radius:3px 0 0 3px;font-weight:600',
      'background:#6f5440;color:#faf7f2;padding:2px 6px;border-radius:0 3px 3px 0;font-weight:600'
    )

    // Primera visita: guarda la versión y sigue
    if (stored === null) {
      localStorage.setItem(STORAGE_KEY, version)
      return
    }

    // Versión diferente → actualiza y recarga para coger el build nuevo
    if (stored !== version) {
      console.log(`[Version] Actualización detectada: ${stored} → ${version}. Recargando...`)
      localStorage.setItem(STORAGE_KEY, version)
      window.location.reload(true)
      // Detiene la ejecución mientras se recarga la página
      await new Promise(() => {})
    }
  } catch {
    // Sin conexión o falla el fetch → no bloquear la app
  }
}
