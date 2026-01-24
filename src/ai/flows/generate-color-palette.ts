'use server';

/**
 * @fileOverview Generates a harmonious color palette based on a desired mood or theme.
 *
 * - generateColorPalette - A function that generates a color palette.
 * - GenerateColorPaletteInput - The input type for the generateColorPalette function.
 * - GenerateColorPaletteOutput - The return type for the generateColorPalette function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateColorPaletteInputSchema = z.object({
  theme: z
    .string()
    .describe(
      'A description of the desired mood or theme for the color palette (e.g., \'nostalgic sunset\', \'futuristic ice\').'
    ),
});
export type GenerateColorPaletteInput = z.infer<typeof GenerateColorPaletteInputSchema>;

const GenerateColorPaletteOutputSchema = z.object({
  colors: z
    .array(z.string().regex(/^#[0-9A-Fa-f]{6}$/))
    .length(5)
    .describe(
      'An array of 5 hexadecimal color codes representing a harmonious color palette.'
    ),
  description: z
    .string()
    .describe('A description of the generated color palette.'),
});
export type GenerateColorPaletteOutput = z.infer<typeof GenerateColorPaletteOutputSchema>;

export async function generateColorPalette(input: GenerateColorPaletteInput): Promise<GenerateColorPaletteOutput> {
  return generateColorPaletteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateColorPalettePrompt',
  input: {schema: GenerateColorPaletteInputSchema},
  output: {schema: GenerateColorPaletteOutputSchema},
  prompt: `You are an expert color palette generator. You will generate a harmonious color palette consisting of 5 hexadecimal color codes, and you will also provide a short description of the palette.

The user will provide a theme, and you will generate a color palette that matches the theme.

Theme: {{{theme}}}

Output the color palette as a JSON object with the following structure:
{
  "colors": ["#RRGGBB", "#RRGGBB", "#RRGGBB", "#RRGGBB", "#RRGGBB"],
  "description": "A short description of the generated color palette."
}

Make sure the color codes are valid hexadecimal color codes and the array contains exactly 5 colors.
`,
});

const generateColorPaletteFlow = ai.defineFlow(
  {
    name: 'generateColorPaletteFlow',
    inputSchema: GenerateColorPaletteInputSchema,
    outputSchema: GenerateColorPaletteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
