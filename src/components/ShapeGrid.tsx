// CSS interpretation of React Bits Shape Grid avoids continuous canvas rendering.
export function ShapeGrid() {
  return (
    <div className="shape-grid" aria-hidden="true">
      <div className="grid-accent" />
    </div>
  );
}
