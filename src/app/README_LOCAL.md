# Aegis Tactical Grid - Manual de Operación y Migración

Este manual contiene las instrucciones para operar el sistema localmente, actualizar GitHub y migrar a plataformas como Replit.

## 📂 Estructura de Archivos Necesarios
Si vas a copiar el proyecto manualmente a Replit o a otra carpeta local, **DEBES** incluir estos archivos:

- **Configuración Core:** `package.json`, `tsconfig.json`, `tailwind.config.ts`, `components.json`.
- **Variables de Entorno:** `.env` (Asegúrate de configurar tu `GOOGLE_GENAI_API_KEY`).
- **Código Fuente:** Toda la carpeta `/src` (contiene el Frontend, los componentes visuales y la IA).
- **Backends:** `/src/backend/go` (ahora incluye `go.mod`) y `/src/backend/python`.

---

## 🚀 Migración a Replit
1. Entra a [Replit](https://replit.com).
2. Haz clic en **"Create Repl"** y selecciona **"Import from GitHub"**.
3. Pega el enlace: `https://github.com/jcbtech1/AEGIS-TACTICAL-GRID.git`.
4. En la sección de **Secrets (Herramientas > Secrets)** de Replit, añade tu llave:
   - Key: `GOOGLE_GENAI_API_KEY`
   - Value: `tu_llave_aqui`
5. **Para el Backend de Go:**
   Si Replit te pide inicializar el módulo, abre la Shell y ejecuta:
   ```bash
   cd src/backend/go
   go mod tidy
   go run main.go
   ```
6. Haz clic en **Run**. Replit instalará las dependencias de Node.js automáticamente.

---

## 🛠 Ejecución Local (PC)
Si ya tienes los archivos en tu PC:
1. Instala las librerías de Node: `npm install`.
2. Instala las librerías de Go: `cd src/backend/go && go mod tidy`.
3. Inicia el sistema: `npm run dev` (desde la raíz).
4. El sistema estará disponible en `http://localhost:9002`.

---

## 🧹 Limpieza y Actualización de GitHub
Si quieres que tu GitHub se vea exactamente como tu carpeta local (borrando cualquier desorden previo):

```bash
# 1. Asegurar la ruta correcta
git remote set-url origin https://github.com/jcbtech1/AEGIS-TACTICAL-GRID.git

# 2. Registrar el estado actual
git add -A

# 3. Crear el commit
git commit -m "Build: Sincronización limpia y organizada"

# 4. SOBRESCRIBIR GitHub (Borra lo viejo y deja solo lo nuevo)
git push origin main --force
```

---
**Desarrollado para Aegis Defense Systems**
