'use server';

/**
 * @fileOverview A Genkit flow for suggesting procedural animation configurations based on user descriptions.
 *
 * - proceduralAnimationSuggestions - A function that suggests animation configurations.
 * - AnimationSuggestionInput - The input type for the proceduralAnimationSuggestions function.
 * - AnimationSuggestionOutput - The return type for the proceduralAnimationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimationSuggestionInputSchema = z.object({
  animationDescription: z
    .string()
    .describe(
      'A description of the desired animation style, e.g., pulsating waves, gentle swirl, chaotic burst.'
    ),
});

export type AnimationSuggestionInput = z.infer<typeof AnimationSuggestionInputSchema>;

const AnimationSuggestionOutputSchema = z.object({
  uniformsConfig: z
    .record(z.number())
    .describe(
      'A JSON object containing suggested values for the shader uniforms to achieve the described animation effect. Keys are the uniform names, and values are the suggested numerical values.'
    ),
  explanation: z
    .string()
    .describe(
      'A brief explanation of how the suggested uniform values will contribute to the described animation effect.'
    ),
});

export type AnimationSuggestionOutput = z.infer<typeof AnimationSuggestionOutputSchema>;

export async function proceduralAnimationSuggestions(
  input: AnimationSuggestionInput
): Promise<AnimationSuggestionOutput> {
  return proceduralAnimationSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'proceduralAnimationSuggestionsPrompt',
  input: {schema: AnimationSuggestionInputSchema},
  output: {schema: AnimationSuggestionOutputSchema},
  prompt: `You are an expert shader developer, skilled in creating mesmerizing animations using shader uniforms.  A user will describe the animation they want, and you will respond with a JSON object containing suggested values for various shader uniforms, and an explanation of how those values contribute to the animation.

User Description: {{{animationDescription}}}

Consider the following shader uniforms, and provide appropriate values to achieve the described animation:

- uSpin: Controls the rotation speed (radians).
- uRandomness: Controls the amount of random displacement of particles.
- uPulse: Controls the intensity of the pulsating effect.
- uTimeScale: Controls the overall animation speed, i.e. time multiplier.

Output the configuration as a JSON object:

{
  "uniformsConfig": {
    "uSpin": 0.0,
    "uRandomness": 0.0,
    "uPulse": 0.0,
    "uTimeScale": 1.0
  },
  "explanation": "Explanation of how the uniforms affect the animation."
}

Make sure to always include the \"explanation\" field in the output describing how the uniform values achieve the desired effect."`,
});

const proceduralAnimationSuggestionsFlow = ai.defineFlow(
  {
    name: 'proceduralAnimationSuggestionsFlow',
    inputSchema: AnimationSuggestionInputSchema,
    outputSchema: AnimationSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
