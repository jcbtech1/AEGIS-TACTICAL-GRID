# Aegis Tactical Grid - Manual de Operación Local

Este proyecto es una consola de ciberseguridad avanzada. Sigue estos pasos para ejecutarlo y gestionarlo en tu PC de forma organizada.

## 📂 Mapa del Proyecto (Estructura de Carpetas)
Para mantener el orden, el proyecto se divide en módulos lógicos:

- **`/src/app`**: Corazón de la aplicación (Páginas, acciones de servidor y estilos globales).
- **`/src/components/cyber-grid`**: Módulos visuales (Dashboard, Escaneo Visual, Operaciones).
- **`/src/ai`**: Inteligencia Artificial (Flujos de Genkit/Gemini).
- **`/src/backend`**: Motores externos (Go para redes, Python para visión).
- **`/public`**: Recursos estáticos e imágenes.

---

## 🚀 Cómo Limpiar y Actualizar tu GitHub (Paso a Paso)

Si sientes que tienes archivos "desparramados" o un desorden en tu repositorio, usa estos comandos para limpiar y subir todo como una versión única y organizada:

1. **Abrir Terminal** en la carpeta raíz del proyecto.
2. **Ejecutar estos comandos**:

```bash
# 1. Limpiar el estado de Git (opcional, si hay archivos borrados que siguen apareciendo)
git add -A

# 2. Guardar todos los cambios actuales en un solo paquete
git commit -m "Build: Sincronización completa y limpia del sistema Aegis"

# 3. Enviar a GitHub de forma forzada para sobrescribir el desorden anterior (USA CON CUIDADO)
# Esto hará que tu GitHub se vea exactamente igual a tu carpeta local actual
git push origin main
```

---

## 🛠 Ejecución del Sistema

### Paso A: El Backend de Red (Go)
Gestiona WebSockets y tráfico cifrado.
```bash
cd src/backend/go
go run main.go
```

### Paso B: La Inteligencia Artificial (Python)
Análisis de intrusos y visión.
```bash
cd src/backend/python
python intelligence.py
```

### Paso C: La Interfaz de Usuario (Next.js)
```bash
npm run dev
```
*Acceso en: http://localhost:9002*

---
**Desarrollado para Aegis Defense Systems**
