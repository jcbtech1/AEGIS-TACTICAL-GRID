"use client";

import { useState, useRef } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { GalaxyConfig, GalaxyParams } from '@/lib/types';
import { SlidersHorizontal, Palette, Sparkles, Wand2, Download, Upload, Shuffle, Settings, Loader } from 'lucide-react';

type CelestialWeaverControlsProps = {
  config: GalaxyConfig;
  isGenerating: boolean;
  onUpdate: (newParams: Partial<GalaxyParams>) => void;
  onGenerateNewSeed: () => void;
  onGenerateColors: (theme: string) => Promise<void>;
  onSuggestAnimation: (description: string) => Promise<void>;
  onSaveConfig: () => void;
  onLoadConfig: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ControlSlider = ({ label, value, min, max, step, onValueChange }: { label: string, value: number, min: number, max: number, step: number, onValueChange: (value: number[]) => void }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <Label className="text-sm font-medium">{label}</Label>
      <span className="text-xs text-muted-foreground">{value.toFixed(2)}</span>
    </div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={onValueChange} />
  </div>
);

export default function CelestialWeaverControls({
  config,
  isGenerating,
  onUpdate,
  onGenerateNewSeed,
  onGenerateColors,
  onSuggestAnimation,
  onSaveConfig,
  onLoadConfig
}: CelestialWeaverControlsProps) {
  const [colorTheme, setColorTheme] = useState('Nostalgic sunset');
  const [animDesc, setAnimDesc] = useState('Gentle swirl');
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="absolute top-4 left-4 z-20">
        <SidebarTrigger className="glow" />
      </div>

      <Sidebar>
        <SidebarHeader>
          <div className="flex flex-col items-center group-data-[collapsible=icon]:hidden">
            <h2 className="font-headline text-2xl font-semibold">Celestial Weaver</h2>
            <p className="text-muted-foreground text-sm">Cosmic Playground</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Accordion type="multiple" defaultValue={['shape', 'colors']} className="w-full">
            <AccordionItem value="shape">
              <AccordionTrigger><SlidersHorizontal className="mr-2" />Shape</AccordionTrigger>
              <AccordionContent className="space-y-4 px-2">
                <ControlSlider label="Branches" value={config.branches} min={2} max={12} step={1} onValueChange={([v]) => onUpdate({ branches: v })} />
                <ControlSlider label="Radius" value={config.radius} min={0.1} max={5} step={0.1} onValueChange={([v]) => onUpdate({ radius: v })} />
                <ControlSlider label="Spin" value={config.spin} min={0} max={20} step={0.1} onValueChange={([v]) => onUpdate({ spin: v })} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="colors">
              <AccordionTrigger><Palette className="mr-2" />Colors</AccordionTrigger>
              <AccordionContent className="space-y-4 px-2">
                 <div className="space-y-2">
                  <Label htmlFor="innColor">Inner Color</Label>
                  <Input id="innColor" type="color" value={config.innColor} onChange={(e) => onUpdate({ innColor: e.target.value })} className="p-1 h-10"/>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="outColor">Outer Color</Label>
                  <Input id="outColor" type="color" value={config.outColor} onChange={(e) => onUpdate({ outColor: e.target.value })} className="p-1 h-10"/>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="animation">
              <AccordionTrigger><Sparkles className="mr-2" />Animation</AccordionTrigger>
              <AccordionContent className="space-y-4 px-2">
                <ControlSlider label="Randomness" value={config.randomness} min={0} max={2} step={0.05} onValueChange={([v]) => onUpdate({ randomness: v })} />
                <ControlSlider label="Pulse" value={config.pulse} min={0} max={2} step={0.05} onValueChange={([v]) => onUpdate({ pulse: v })} />
                <ControlSlider label="Time Scale" value={config.timeScale} min={0} max={2} step={0.05} onValueChange={([v]) => onUpdate({ timeScale: v })} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ai">
              <AccordionTrigger><Wand2 className="mr-2" />AI Tools</AccordionTrigger>
              <AccordionContent className="space-y-6 px-2">
                <div className="space-y-2">
                  <Label>Generate Color Theme</Label>
                  <Input placeholder="e.g., 'futuristic ice'" value={colorTheme} onChange={(e) => setColorTheme(e.target.value)} />
                  <Button onClick={() => onGenerateColors(colorTheme)} disabled={isGenerating} className="w-full">
                    {isGenerating ? <Loader className="animate-spin" /> : 'Generate Colors'}
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Suggest Animation Style</Label>
                  <Input placeholder="e.g., 'pulsating waves'" value={animDesc} onChange={(e) => setAnimDesc(e.target.value)} />
                  <Button onClick={() => onSuggestAnimation(animDesc)} disabled={isGenerating} className="w-full">
                     {isGenerating ? <Loader className="animate-spin" /> : 'Suggest Animation'}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="settings">
              <AccordionTrigger><Settings className="mr-2" />Settings</AccordionTrigger>
              <AccordionContent className="space-y-4 px-2 pt-2">
                 <div className="space-y-2">
                    <Label>Random Seed</Label>
                    <div className="flex items-center gap-2">
                        <Input type="text" value={config.seed} onChange={e => onUpdate({seed: Number(e.target.value) || 0})} />
                        <Button variant="outline" size="icon" onClick={onGenerateNewSeed}><Shuffle /></Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Configuration</Label>
                    <div className="flex gap-2">
                        <Button variant="outline" className="w-full" onClick={onSaveConfig}><Download className="mr-2" /> Save</Button>
                        <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}><Upload className="mr-2" /> Load</Button>
                        <Input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={onLoadConfig} />
                    </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
