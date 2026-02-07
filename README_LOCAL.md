# Aegis Tactical Grid - Manual de Operación Local

Este manual te guiará para limpiar tu repositorio de GitHub y organizar tus proyectos en carpetas.

## 🧹 Cómo Limpiar tu GitHub (Borrón y Cuenta Nueva)
Si tu repositorio de GitHub está desordenado y quieres que se vea **exactamente igual** a tu carpeta local actual, usa el comando de "Fuerza".

### Paso 1: Organiza tus archivos localmente
Asegúrate de que en tu PC todo esté en su lugar (dentro de las carpetas que desees).

### Paso 2: Ejecuta la Limpieza Profunda
Abre la terminal en la raíz del proyecto y ejecuta:

```bash
# Sincroniza el estado local (detecta archivos borrados y movidos)
git add -A

# Etiqueta la nueva estructura
git commit -m "Build: Reinicio organizado del repositorio"

# SOBRESCRIBE GitHub con tu versión limpia
git push origin main --force
```

---

## 📂 Estructura Recomendada
Para que no se vea "desparramado", el sistema Aegis utiliza esta jerarquía:

- **`/src/app`**: Lógica de navegación y páginas.
- **`/src/components/cyber-grid`**: Módulos visuales y widgets.
- **`/src/ai`**: Motores de Inteligencia Artificial (Genkit).
- **`/src/backend`**: Motores de red (Go) y visión (Python).

---

## 🛠 Ejecución del Sistema

### Paso A: Backend de Red (Go)
```bash
cd src/backend/go
go run main.go
```

### Paso B: Inteligencia Artificial (Next.js)
```bash
npm run dev
```

**Desarrollado para Aegis Defense Systems**
