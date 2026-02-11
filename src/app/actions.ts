
"use server";

import { generateColorPalette, GenerateColorPaletteInput } from '@/ai/flows/generate-color-palette';
import { proceduralAnimationSuggestions, AnimationSuggestionInput } from '@/ai/flows/procedural-animation-suggestions';
import { tacticalChat, TacticalChatInput } from '@/ai/flows/tactical-chat';
import { fetchExternalAIResponse } from '@/lib/api-bridge';

/**
 * Server Action Principal para la IA Táctica AEGIS.
 * Orquestador de inteligencia: Intenta primero el Backend Externo, 
 * luego usa Genkit/Gemini como respaldo.
 */
export async function sendTacticalCommand(input: TacticalChatInput) {
  try {
    // 1. INTENTO DE CONEXIÓN CON BACKEND EXTERNO
    const externalResponse = await fetchExternalAIResponse(input.message, input.systemStatus);
    
    if (externalResponse) {
      console.log(">>> AEGIS_SUCCESS: Conectado exitosamente con BACKEND_EXTERNO.");
      return { 
        response: externalResponse,
        source: 'EXTERNAL' as const
      };
    }

    // 2. RESPALDO LOCAL: Si no hay backend externo o falla, usamos Genkit
    console.log(">>> AEGIS_FALLBACK: Usando núcleo local (Genkit/Gemini).");
    const result = await tacticalChat(input);
    return {
      ...result,
      source: 'LOCAL' as const
    };

  } catch (error) {
    console.error(">>> AEGIS_CRITICAL_FAILURE:", error);
    return { 
      response: "ERROR_CRÍTICO: FALLO EN EL ENLACE DE DATOS. ACTIVANDO PROTOCOLO DE EMERGENCIA LOCAL.",
      source: 'ERROR' as const
    };
  }
}

export async function generateColors(input: GenerateColorPaletteInput) {
  try {
    return await generateColorPalette(input);
  } catch (error) {
    console.error("Error generating color palette:", error);
    return { error: "Failed to generate color palette." };
  }
}

export async function suggestAnimation(input: AnimationSuggestionInput) {
  try {
    return await proceduralAnimationSuggestions(input);
  } catch (error) {
    console.error("Error suggesting animation:", error);
    return { error: "Failed to suggest animation." };
  }
}
