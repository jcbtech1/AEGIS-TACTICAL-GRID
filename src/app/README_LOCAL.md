# Aegis Tactical Grid - Manual de Operación Local

Este proyecto es una consola de ciberseguridad avanzada. Esta guía te ayudará a mantener tus archivos organizados y tu repositorio de GitHub actualizado.

## 📂 Mapa del Proyecto (Estructura Organizada)
Para que no sientas que los archivos están "desparramados", aquí tienes la guía de qué es cada carpeta:

- **`/src/app`**: El corazón del sistema (Páginas y estilos globales).
- **`/src/components/cyber-grid`**: Todos los módulos visuales (Dashboard, Escaneo Visual, Operaciones).
- **`/src/ai`**: El cerebro de Inteligencia Artificial (Genkit/Gemini).
- **`/src/backend`**: Motores externos (Go para redes, Python para IA de visión).
- **`/public`**: Imágenes y recursos estáticos.

---

## 🚀 Cómo Actualizar tu GitHub
Si ya subiste una versión y quieres actualizarla con los nuevos cambios de forma limpia:

1. **Abrir Terminal** en la carpeta raíz del proyecto.
2. **Ejecutar estos comandos en orden**:

```bash
# 1. Preparar todos los cambios nuevos
git add .

# 2. Etiquetar la actualización (pon un nombre a tus cambios)
git commit -m "Update: Implementación de Infraestructura y Bóveda de Evidencias"

# 3. Subir los cambios a tu repositorio existente
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

---
**Desarrollado para Aegis Defense Systems**
