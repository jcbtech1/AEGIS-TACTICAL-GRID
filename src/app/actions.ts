"use server";

import { generateColorPalette, GenerateColorPaletteInput } from '@/ai/flows/generate-color-palette';
import { proceduralAnimationSuggestions, AnimationSuggestionInput } from '@/ai/flows/procedural-animation-suggestions';
import { tacticalChat, TacticalChatInput } from '@/ai/flows/tactical-chat';
import { fetchExternalAIResponse } from '@/lib/api-bridge';

/**
 * Server Action Principal para la IA Táctica AEGIS.
 * Gestiona la prioridad entre tu Backend Externo y el núcleo local de Genkit.
 */
export async function sendTacticalCommand(input: TacticalChatInput) {
  try {
    // 1. INTENTO DE CONEXIÓN CON TU BACKEND EXTERNO (Python/Go/etc)
    const externalResponse = await fetchExternalAIResponse(input.message, input.systemStatus);
    
    if (externalResponse) {
      return { response: externalResponse };
    }

    // 2. BACKUP: Si no hay backend externo, usamos Genkit (Gemini)
    const result = await tacticalChat(input);
    return result;

  } catch (error) {
    console.error("CRITICAL_LINK_FAILURE:", error);
    return { 
      response: "ERROR_CRÍTICO: FALLO EN EL ENLACE DE DATOS EXTERNO. ACTIVANDO PROTOCOLO DE CONTENCIÓN LOCAL." 
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
