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

export async function sendTacticalCommand(input: TacticalChatInput) {
  try {
    return await tacticalChat(input);
  } catch (error) {
    console.error("Error in tactical chat:", error);
    return { response: "ERROR_CRÍTICO: FALLO EN EL NÚCLEO DE RAZONAMIENTO. REINTENTE." };
  }
}
