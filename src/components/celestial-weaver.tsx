"use client";

import { useState, useMemo, useCallback } from 'react';
import type { GalaxyConfig, GalaxyParams } from '@/lib/types';
import CelestialWeaverCanvas from './celestial-weaver-canvas';
import CelestialWeaverControls from './celestial-weaver-controls';
import { generateColors, suggestAnimation } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from '@/components/ui/sidebar';

const INITIAL_CONFIG: GalaxyConfig = {
  seed: 1,
  particles: 200 ** 2,
  branches: 4,
  radius: 0,
  spin: 0,
  randomness: 0,
  pulse: 0,
  timeScale: 0.3,
  innColor: '#ffeeaa',
  outColor: '#aaaaff',
};

export default function CelestialWeaver() {
  const [config, setConfig] = useState<GalaxyConfig>(INITIAL_CONFIG);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleUpdateConfig = useCallback((newParams: Partial<GalaxyParams>) => {
    setConfig(prev => ({ ...prev, ...newParams }));
  }, []);

  const handleGenerateNewSeed = useCallback(() => {
    setConfig(prev => ({ ...prev, seed: Math.floor(Math.random() * 1000000) }));
  }, []);

  const handleGenerateColors = async (theme: string) => {
    setIsGenerating(true);
    const result = await generateColors({ theme });
    if ('error' in result) {
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: result.error,
      });
    } else if (result?.colors) {
      setConfig(prev => ({
        ...prev,
        innColor: result.colors[0],
        outColor: result.colors[4],
      }));
      toast({
        title: "Colores generados por IA",
        description: result.description,
      });
    }
    setIsGenerating(false);
  };

  const handleSuggestAnimation = async (description: string) => {
    setIsGenerating(true);
    const result = await suggestAnimation({ animationDescription: description });
    if ('error' in result) {
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: result.error,
      });
    } else if (result?.uniformsConfig) {
      const { uSpin, uRandomness, uPulse, uTimeScale } = result.uniformsConfig;
      setConfig(prev => ({
        ...prev,
        spin: uSpin ?? prev.spin,
        randomness: uRandomness ?? prev.randomness,
        pulse: uPulse ?? prev.pulse,
        timeScale: uTimeScale ?? prev.timeScale,
      }));
       toast({
        title: "Animación sugerida por IA",
        description: result.explanation,
      });
    }
    setIsGenerating(false);
  };

  const handleSaveConfig = () => {
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'celestial-weaver-config.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Configuración guardada" });
  };

  const handleLoadConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedConfig = JSON.parse(e.target?.result as string);
          // Add validation here if needed
          setConfig(prev => ({ ...prev, ...loadedConfig }));
          toast({ title: "Configuración cargada" });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error al cargar la configuración",
            description: "Archivo de configuración no válido.",
          });
        }
      };
      reader.readAsText(file);
    }
  };


  const galaxyData = useMemo(() => config, [config.seed, config.particles]);

  return (
    <SidebarProvider>
      <div className="relative w-full h-screen overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-1000">
            <div className="text-center">
              <h1 className="text-4xl font-headline text-primary-foreground mb-2">Tejedor Celestial</h1>
              <p className="text-lg text-muted-foreground">Tejiendo el cosmos...</p>
            </div>
          </div>
        )}
        <CelestialWeaverCanvas
          config={config}
          galaxyData={galaxyData}
          setLoading={setLoading}
        />
        <CelestialWeaverControls
          config={config}
          onUpdate={handleUpdateConfig}
          onGenerateNewSeed={handleGenerateNewSeed}
          onGenerateColors={handleGenerateColors}
          onSuggestAnimation={handleSuggestAnimation}
          onSaveConfig={handleSaveConfig}
          onLoadConfig={handleLoadConfig}
          isGenerating={isGenerating}
        />
      </div>
    </SidebarProvider>
  );
}
