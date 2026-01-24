export type GalaxyParams = {
  branches: number;
  radius: number;
  spin: number;
  randomness: number;
  pulse: number;
  timeScale: number;
  innColor: string;
  outColor: string;
};

export type GalaxyConfig = {
  seed: number;
  particles: number;
} & GalaxyParams;
