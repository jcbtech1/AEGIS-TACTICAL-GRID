# Aegis Tactical Grid - Manual de Operación Local

Este proyecto es una consola de ciberseguridad avanzada. Sigue estos pasos para ejecutarlo y gestionarlo en tu PC.

## 1. Requisitos del Sistema
- **Node.js v18+**: Para el Frontend (Next.js).
- **Go 1.20+**: Para el Backend de Red.
- **Python 3.9+**: Para el Motor de Inteligencia Artificial.
- **Git**: Para el control de versiones.

## 2. Ejecución del Sistema

### Paso A: El Backend de Red (Go)
Este motor gestiona los WebSockets y simula el tráfico cifrado.
```bash
cd src/backend/go
go get github.com/gorilla/websocket
go run main.go
```
*El servidor correrá en `http://localhost:8080`*

### Paso B: La Inteligencia Artificial (Python)
Este motor analiza los datos en busca de intrusos.
```bash
cd src/backend/python
pip install opencv-python
python intelligence.py
```

### Paso C: La Interfaz de Usuario (Next.js)
```bash
npm install
npm run dev
```
*Accede a `http://localhost:9002`*

## 3. Subir el Proyecto a GitHub (Guía Rápida)

Para subir tus archivos actualizados a un repositorio de GitHub, ejecuta estos comandos en la terminal desde la carpeta raíz:

1. **Inicializar Git** (Solo la primera vez):
   ```bash
   git init
   ```

2. **Vincular con GitHub** (Reemplaza la URL con la tuya):
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   ```

3. **Subir Cambios**:
   ```bash
   git add .
   git commit -m "Update: Aegis Tactical Grid Core"
   git branch -M main
   git push -u origin main
   ```

## 4. Notas de Seguridad
- No compartas tu archivo `.env` si contiene claves reales de API.
- La sesión del terminal se mantiene activa localmente mediante `localStorage`.

---
**Desarrollado para Aegis Defense Systems**
