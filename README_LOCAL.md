
# Aegis Tactical Grid - Guía de Ejecución Local

Este proyecto está diseñado para funcionar como un sistema distribuido:

## 1. Frontend (React/Next.js)
Ya está configurado para conectarse a `ws://localhost:8080/ws`.
- Ejecuta: `npm install` y luego `npm run dev`.

## 2. Backend de Captura (Go)
Ubicación: `src/backend/go/main.go`
- Requiere Go instalado.
- Instala dependencias: `go get github.com/gorilla/websocket`.
- Ejecuta: `go run main.go`.
- Este servidor enviará los datos de tráfico y logs a la UI.

## 3. Backend de Inteligencia (Python)
Ubicación: `src/backend/python/intelligence.py`
- Requiere Python 3.x y OpenCV.
- Instala dependencias: `pip install opencv-python requests`.
- Ejecuta: `python intelligence.py`.

## 4. Comunicación (gRPC)
Para producción, utiliza el archivo `aegis.proto` (que debes crear según tus necesidades) para generar los stubs de comunicación entre Go y Python.
