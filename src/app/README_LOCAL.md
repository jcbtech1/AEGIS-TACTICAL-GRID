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

## 🚀 Cómo Limpiar y Actualizar GitHub
Si GitHub tiene archivos viejos que quieres borrar para que se vea como tu carpeta local:

1. **Abrir Terminal** en la carpeta raíz del proyecto.
2. **Ejecutar estos comandos en orden**:

```bash
# Sincroniza archivos borrados y movidos
git add -A

# Etiqueta el cambio
git commit -m "Update: Limpieza y reorganización de carpetas"

# Fuerza la actualización (Borra lo viejo en GitHub)
git push origin main --force
```

---

## 🛠 Ejecución del Sistema

### Paso A: El Backend de Red (Go)
```bash
cd src/backend/go
go run main.go
```

### Paso B: La Interfaz de Usuario (Next.js)
```bash
npm run dev
```

---
**Desarrollado para Aegis Defense Systems**
