// Mapa de iconos usados por las categorías de CuidoMisPies.
// Evita importar TODA la librería lucide-react (que causa OOM en dev).

import {
  Shield,
  HeartHandshake,
  Droplet,
  Wind,
  Footprints,
  CircleDot,
  Waves,
  Sparkles,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  HeartHandshake,
  Droplet,
  Wind,
  Footprints,
  CircleDot,
  Waves,
  Sparkles,
};

export function getIcon(key: string): LucideIcon {
  return ICON_MAP[key] ?? Sparkles;
}

// Componente estable para renderizar iconos por key.
// Evita el warning de "component created during render".
export function CategoryIcon({ iconKey, ...props }: { iconKey: string } & LucideProps) {
  const Icon = ICON_MAP[iconKey] ?? Sparkles;
  return <Icon {...props} />;
}
