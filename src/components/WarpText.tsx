// A brief transform-based interpretation of the React Bits Warp Text direction.
export function WarpText({ children }: { children: string }) {
  return <span className="warp-text">{children}</span>;
}
