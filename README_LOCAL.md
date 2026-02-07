# Aegis Tactical Grid - Manual de Operación Local

Este proyecto es una consola de ciberseguridad avanzada. Sigue estos pasos para ejecutarlo en tu PC.

## 1. Requisitos
- **Node.js v18+**
- **Go 1.20+**
- **Python 3.9+** con `pip`

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

## 3. Subir a GitHub (Instrucciones para TI)
Para subir este proyecto a tu propio repositorio de GitHub, ejecuta esto en la terminal de tu PC:

1. Crea un repositorio **vacio** en GitHub.
2. En la carpeta de tu proyecto local:
```bash
git init
git add .
git commit -m "Build: Aegis Tactical Grid Core"
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

---
**Desarrollado para Aegis Defense Systems**