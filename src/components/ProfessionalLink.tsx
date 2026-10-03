import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
export function ProfessionalLink({
  href,
  children,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  return href ? (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={15} />
    </a>
  ) : (
    <span className={`${className} pending-link`}>{children}</span>
  );
}
