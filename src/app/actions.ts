
"use server";

import { generateColorPalette, GenerateColorPaletteInput } from '@/ai/flows/generate-color-palette';
import { proceduralAnimationSuggestions, AnimationSuggestionInput } from '@/ai/flows/procedural-animation-suggestions';
import { tacticalChat, TacticalChatInput } from '@/ai/flows/tactical-chat';

/**
 * --- GUÍA DE CONEXIÓN BACKEND ---
 * 
 * 1. PERSISTENCIA: Para guardar datos en Firestore desde aquí, puedes importar
 *    la instancia de la base de datos (aunque generalmente las mutaciones se hacen 
 *    en el cliente para mayor velocidad, las acciones de servidor son ideales para
 *    operaciones que requieren secretos o validaciones extra).
 * 
 * 2. INTEGRACIÓN DE API: Si tienes un servidor externo (Python/Go/Node),
 *    sustituye la llamada a 'tacticalChat' por un fetch('https://tu-api.com/v1/chat').
 */

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
 */
export async function sendTacticalCommand(input: TacticalChatInput) {
  try {
    // LLAMADA AL NÚCLEO DE IA (Genkit/Gemini)
    const result = await tacticalChat(input);
    
    // --- PUNTO DE CONEXIÓN BACKEND ---
    // Aquí podrías guardar la respuesta en una DB centralizada para auditoría:
    // await db.collection('global_logs').add({ ...input, response: result.response });

    return result;
  } catch (error) {
    console.error("Error in tactical chat backend logic:", error);
    return { 
      response: "ERROR_CRÍTICO: FALLO EN EL NÚCLEO DE RAZONAMIENTO. PROTOCOLO DE CONTENCIÓN ACTIVADO." 
    };
  }
}
