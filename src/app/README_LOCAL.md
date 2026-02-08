
# Aegis Tactical Grid - Manual de Operación Frontend

Este manual te guiará para gestionar tu repositorio de GitHub y desplegar la versión 100% Frontend en Replit.

## 🚀 Migración a Replit (Solo Frontend)
El sistema ha sido optimizado para funcionar de forma autónoma. No necesitas configurar servidores de Go o Python.

1. **Importar desde GitHub**: 
   - En Replit, selecciona "Import from GitHub".
   - Pega tu URL: `https://github.com/jcbtech1/AEGIS-TACTICAL-GRID.git`.
2. **Configurar API Key (Gemini)**:
   - Ve a **Tools > Secrets** en Replit.
   - Añade `GOOGLE_GENAI_API_KEY` con tu llave de Google AI Studio. **Este paso es esencial para que el Chat Táctico funcione.**
3. **Ejecutar**:
   - Pulsa **Run**. Replit instalará las dependencias y lanzará el sistema.

---

## 🤖 Integración de IA (Gemini)
El cerebro del sistema es Gemini 2.5 Flash, integrado mediante Genkit. 
- **Chat Táctico**: Disponible en el Dashboard principal.
- **Asesor Estratégico**: Disponible en el panel de Operaciones Avanzadas.
- **Voz**: La IA tiene síntesis de voz activada para mayor inmersión táctica.

---

## 📂 Estructura del Sistema Unificado (Frontend Only)
El proyecto reside completamente en la arquitectura de Next.js:

- **`/src/app`**: Rutas, acciones del servidor y estilos globales.
- **`/src/components/cyber-grid`**: Todos los módulos visuales y dashboards.
- **`/src/ai`**: Motores de Inteligencia Artificial (Genkit) integrados.

---

## 🧹 Cómo Limpiar tu GitHub (Sincronización Total)
Si quieres que tu GitHub se vea exactamente igual a tu carpeta local actual (borrando cualquier rastro de los backends antiguos):

```bash
# 1. Asegurar la ruta correcta
git remote set-url origin https://github.com/jcbtech1/AEGIS-TACTICAL-GRID.git

# 2. Registrar el estado actual (Detecta que borraste las carpetas de backend)
git add -A

# 3. Crear el commit de consolidación
git commit -m "Build: Versión 100% Frontend con Integración Total de IA"

# 4. SOBRESCRIBIR GitHub con tu versión actual
git push origin main --force
```

**Desarrollado para Aegis Defense Systems**
