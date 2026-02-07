# Aegis Tactical Grid - Manual de Operación Local

Este manual te guiará para limpiar tu repositorio de GitHub y organizar tus proyectos en carpetas.

## 🧹 Cómo Limpiar tu GitHub (Borrón y Cuenta Nueva)
Si tu repositorio de GitHub está desordenado y quieres que se vea **exactamente igual** a tu carpeta local actual, usa el comando de "Fuerza".

### Paso 1: Configurar el Repositorio Correcto
Asegúrate de que tu carpeta local apunte al link que me diste:
```bash
git remote set-url origin https://github.com/jcbtech1/AEGIS-TACTICAL-GRID.git
```

### Paso 2: Sincronización Total
Este comando le dice a Git: "Olvida lo que hay en la nube, lo que tengo aquí es la única verdad". Ejecuta esto en tu terminal:

```bash
# 1. Registra todos los archivos y detecta los que fueron movidos o borrados
git add -A

# 2. Crea el commit de limpieza
git commit -m "Build: Reinicio organizado del repositorio"

# 3. SOBRESCRIBE GitHub con tu versión actual
# ¡ATENCIÓN! Esto borrará cualquier archivo en GitHub que no esté en tu PC.
git push origin main --force
```

---

## 📂 Estructura del Sistema
Para mantener el orden, el sistema Aegis utiliza esta jerarquía profesional:

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
