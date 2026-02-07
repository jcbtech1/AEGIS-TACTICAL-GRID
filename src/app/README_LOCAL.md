# Aegis Tactical Grid - Guía de Despliegue Frontend

Esta es la versión final del sistema Aegis, optimizada para ser una aplicación **Frontend Standalone**. Toda la telemetría y el análisis de red se simulan internamente o se procesan a través de la IA de Google.

## 🛠 Requisitos para Despliegue
Para clonar este proyecto en Replit o en otro entorno local, asegúrate de incluir:

- **Configuración:** `package.json`, `tsconfig.json`, `tailwind.config.ts`, `components.json`.
- **Variables:** Archivo `.env` con tu `GOOGLE_GENAI_API_KEY`.
- **Código:** Toda la carpeta `/src` (Frontend, UI y AI).

## 🚀 Pasos para Replit
1. **Importar**: Usa tu link de GitHub.
2. **Secrets**: Configura `GOOGLE_GENAI_API_KEY`.
3. **Start**: El comando `npm run dev` iniciará la consola táctica automáticamente.

## 🛰 Lógica de Datos
- **Telemetría**: Simulada mediante hooks de React en el Dashboard.
- **Inteligencia**: Procesada por Genkit en el servidor de Next.js.
- **Interfaz**: Construida con ShadCN UI y Framer Motion para máxima inmersión.

---
**Operación Segura - Aegis Defense Systems**
