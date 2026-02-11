
# Manual de Sincronización Táctica - AEGIS

Este documento detalla los pasos para actualizar tu repositorio de GitHub y mantener la integridad del sistema.

## 🛰️ Sincronización con GitHub

Para subir todos los cambios actuales a tu repositorio, ejecuta los siguientes comandos en tu terminal:

```bash
# 1. Preparar los archivos (Asegúrate de estar en la carpeta raíz)
git add .

# 2. Crear el commit de consolidación
git commit -m "Build: Aegis Tactical Grid v2.5.0 - Full Tactical Suite & AI Integration"

# 3. Empujar los datos al satélite (GitHub)
git push origin main
```

## 🔑 Configuración de Variables (En Replit o Local)

Asegúrate de tener estas variables en tus **Secrets** (Replit) o `.env`:

1. `GOOGLE_GENAI_API_KEY`: Tu llave de Google AI Studio para el cerebro de AEGIS.
2. `BACKEND_URL`: URL de tu servidor de Python/Go (opcional, el sistema tiene respaldo local).

## 📂 Estructura Crítica
- `src/app/actions.ts`: Orquestador de inteligencia.
- `src/lib/api-bridge.ts`: Punto de conexión para tu backend externo.
- `src/components/cyber-grid/`: Todos los módulos visuales tácticos.

**AEGIS DEFENSE SYSTEMS // 2024**
