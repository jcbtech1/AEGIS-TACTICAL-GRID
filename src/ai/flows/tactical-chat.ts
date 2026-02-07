'use server';

/**
 * @fileOverview Flujo de IA para el Chat Táctico de Aegis.
 * 
 * - tacticalChat - Función que procesa comandos del operador.
 * - TacticalChatInput - Esquema de entrada (mensaje del usuario).
 * - TacticalChatOutput - Esquema de salida (respuesta de la IA).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TacticalChatInputSchema = z.object({
  message: z.string().describe('El comando o consulta del operador.'),
  systemStatus: z.object({
    threatLevel: z.string(),
    activeNodes: z.number(),
    throughput: z.string(),
  }).optional(),
});

export type TacticalChatInput = z.infer<typeof TacticalChatInputSchema>;

const TacticalChatOutputSchema = z.object({
  response: z.string().describe('Respuesta táctica en formato profesional y conciso.'),
});

export type TacticalChatOutput = z.infer<typeof TacticalChatOutputSchema>;

export async function tacticalChat(input: TacticalChatInput): Promise<TacticalChatOutput> {
  return tacticalChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tacticalChatPrompt',
  input: { schema: TacticalChatInputSchema },
  output: { schema: TacticalChatOutputSchema },
  prompt: `Eres AEGIS TACTICAL AI, un sistema de inteligencia artificial especializado en ciberdefensa y monitoreo de redes.
  
Tu objetivo es asistir al OPERADOR con información técnica, análisis de riesgos y ejecución de protocolos de seguridad.

REGLAS DE RESPUESTA:
1. Responde siempre en ESPAÑOL.
2. Usa un tono de GRADO MILITAR: conciso, directo y profesional.
3. Escribe preferiblemente en MAYÚSCULAS para mantener la estética táctica del terminal.
4. Si el operador te da un comando de "PURGA" o "REINICIO", confirma que has verificado la integridad de los datos.

ESTADO ACTUAL DEL SISTEMA:
- Nivel de Amenaza: {{{systemStatus.threatLevel}}}
- Nodos Activos: {{{systemStatus.activeNodes}}}
- Tráfico: {{{systemStatus.throughput}}}

COMANDO DEL OPERADOR: {{{message}}}`,
});

const tacticalChatFlow = ai.defineFlow(
  {
    name: 'tacticalChatFlow',
    inputSchema: TacticalChatInputSchema,
    outputSchema: TacticalChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('Error al generar respuesta táctica.');
    return output;
  }
);
