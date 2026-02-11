/**
 * @fileOverview AEGIS API Bridge - Central de Conexión de Backend
 * 
 * Este archivo gestiona la comunicación con tu servidor externo (Python, Go, etc.).
 * El sistema busca automáticamente la variable BACKEND_URL en tu archivo .env.
 */

// Intentamos obtener la URL desde el entorno. 
// Si usas Replit, añádela en "Secrets" como BACKEND_URL.
const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Envía comandos al cerebro de la IA en tu servidor externo.
 * @param message El comando del operador.
 * @param context El estado actual del sistema para que la IA tenga contexto.
 */
export async function fetchExternalAIResponse(message: string, context: any) {
  if (!BACKEND_URL) {
    console.info("AEGIS_BRIDGE: No se detectó BACKEND_URL en .env. Usando AEGIS_IA local.");
    return null;
  }

  try {
    console.log(`AEGIS_BRIDGE: Intentando conexión con ${BACKEND_URL}...`);
    
    // --- ESTRUCTURA DE PETICIÓN ---
    // Ajusta la ruta '/api/chat' según como esté configurado tu servidor.
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.BACKEND_SECRET_KEY}` // Descomenta si usas token
      },
      body: JSON.stringify({ 
        message, 
        system_context: context,
        timestamp: new Date().toISOString()
      }),
      // Timeout de 10 segundos para no bloquear la UI si el servidor está lento
      signal: AbortSignal.timeout(10000) 
    });
    
    if (!response.ok) {
      console.warn(`AEGIS_BRIDGE: El servidor respondió con error (${response.status}).`);
      return null;
    }

    const data = await response.json();
    
    // El sistema espera que tu JSON tenga un campo 'response' o 'text'
    return data.response || data.text || null;

  } catch (error) {
    console.error("AEGIS_BRIDGE_CONNECTION_FAILED:", error);
    // Retornamos null para que actions.ts use el respaldo de Genkit automáticamente
    return null; 
  }
}

/**
 * Función para sincronizar datos de telemetría con tu base de datos central.
 */
export async function syncTacticalData(payload: any) {
  if (!BACKEND_URL) return;

  try {
    await fetch(`${BACKEND_URL}/api/telemetry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // Silencioso para no interrumpir la experiencia de usuario
  }
}
