import {
  Boxes,
  Code2,
  Database,
  Hexagon,
  Layers,
  Network,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillIcons } from "../data/skillIcons";

const conceptIcons: Record<string, LucideIcon> = {
  "Hexagonal architecture": Hexagon,
  Microservices: Network,
  "Domain modeling": Boxes,
  "CI/CD": Workflow,
  "Layered architecture": Layers,
  SQL: Database,
};

export function SkillIcon({ name }: { name: string }) {
  const asset = skillIcons[name];
  if (asset)
    return (
      <span
        className="skill-icon brand-skill-icon"
        aria-hidden="true"
        style={{
          maskImage: `url("${asset}")`,
          WebkitMaskImage: `url("${asset}")`,
        }}
      />
    );
  const Icon = conceptIcons[name] ?? Code2;
  return (
    <Icon
      className="skill-icon"
      size={20}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}
