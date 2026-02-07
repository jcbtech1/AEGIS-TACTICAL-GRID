# Aegis Tactical Grid - Guía de Ejecución Local y GitHub

Este proyecto es una consola de ciberseguridad avanzada distribuida.

## 1. Requisitos Previos
- Node.js v18+
- Go 1.20+
- Python 3.9+ con `pip`

## 2. Preparación del Entorno Local

### Frontend (Next.js)
```bash
npm install
npm run dev
```
La interfaz estará disponible en `http://localhost:3000`.

### Backend de Red (Go)
Ubicación: `src/backend/go/main.go`
```bash
go get github.com/gorilla/websocket
go run src/backend/go/main.go
```

### Inteligencia Artificial (Python)
Ubicación: `src/backend/python/intelligence.py`
```bash
pip install opencv-python requests
python src/backend/python/intelligence.py
```

## 3. Subir a GitHub

Para subir este proyecto a tu propio repositorio de GitHub, sigue estos pasos desde la terminal de tu proyecto local:

1. **Crea un repositorio vacío** en GitHub.com.
2. **Inicializa Git localmente**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Aegis Tactical Grid Core"
   ```
3. **Vincula tu repositorio**:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

## 4. Arquitectura
- **Frontend**: React + Tailwind + Recharts + Framer Motion.
- **Backend Core**: Go (WebSockets para streaming de datos de red).
- **IA Core**: Python (Análisis de patrones y reconocimiento).