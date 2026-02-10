
"use server";

import { generateColorPalette, GenerateColorPaletteInput } from '@/ai/flows/generate-color-palette';
import { proceduralAnimationSuggestions, AnimationSuggestionInput } from '@/ai/flows/procedural-animation-suggestions';
import { tacticalChat, TacticalChatInput } from '@/ai/flows/tactical-chat';

export async function generateColors(input: GenerateColorPaletteInput) {
  try {
    return await generateColorPalette(input);
  } catch (error) {
    console.error("Error generating color palette:", error);
    return { error: "Failed to generate color palette. Please try again." };
  }
}

export async function suggestAnimation(input: AnimationSuggestionInput) {
  try {
    return await proceduralAnimationSuggestions(input);
  } catch (error) {
    console.error("Error suggesting animation:", error);
    return { error: "Failed to suggest animation. Please try again." };
  }
}

/**
 * Server Action Principal para la IA Táctica AEGIS.
 * 
 * --- BACKEND INTEGRATION GUIDE ---
 * Esta función es el punto de entrada para todas las consultas de la IA.
 * 
 * Si deseas conectar tu propio backend personalizado:
 * 1. Modifica la lógica dentro de este bloque try/catch.
 * 2. Puedes usar fetch() para llamar a una API externa (OpenAI, Anthropic, tu propio servidor Python/Go).
 * 3. Puedes consultar bases de datos (Firestore, SQL) para dar contexto real a la respuesta.
 */
export async function sendTacticalCommand(input: TacticalChatInput) {
  try {
    // LLAMADA A GENKIT (Por defecto usa Gemini 2.5 Flash)
    // Puedes personalizar el prompt en src/ai/flows/tactical-chat.ts
    const result = await tacticalChat(input);
    
    // --- INTEGRACIÓN ADICIONAL AQUÍ ---
    // Ejemplo: registrar el comando en un log de base de datos
    // await saveToLog(input.message, result.response);

    return result;
  } catch (error) {
    console.error("Error in tactical chat backend logic:", error);
    
    // Respuesta de respaldo en caso de fallo del backend
    return { 
      response: "ERROR_CRÍTICO: FALLO EN EL NÚCLEO DE RAZONAMIENTO. PROTOCOLO DE CONTENCIÓN ACTIVADO." 
    };
  }
}
