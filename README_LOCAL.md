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

## 🚀 Cómo Actualizar tu GitHub (Paso a Paso)

Si ya tienes el repositorio vinculado y solo quieres subir los nuevos cambios:

1. **Abrir Terminal** en la carpeta raíz del proyecto.
2. **Ejecutar estos comandos**:

```bash
# Prepara todos los archivos actualizados
git add .

# Crea la etiqueta de versión (cambia el mensaje según lo que hayas hecho)
git commit -m "Update: Sincronización de módulos tácticos y seguridad"

# Envía los cambios a la nube
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
