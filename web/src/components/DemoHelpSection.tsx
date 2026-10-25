import { HEIGHT, WIDTH } from "@/lib/conwaysGameOfLife";

export function DemoHelpSection() {
  return (
    <section
      className="mt-10 border-t border-slate-200 pt-8 text-sm leading-relaxed text-slate-700"
      aria-labelledby="help-heading"
    >
      <h2 id="help-heading" className="text-lg font-semibold text-slate-900">
        Help
      </h2>
      <h3 className="mt-4 font-medium text-slate-800">About this app</h3>
      <p className="mt-2">
        <strong>Conway&apos;s Game of Life</strong> is a classic cellular
        automaton. Each cell is alive (<code>O</code>) or dead (space). Every
        generation, cells live or die based on how many neighbors they have. The
        grid wraps around the edges so patterns can move off one side and re-enter
        on the other.
      </p>
      <h3 className="mt-4 font-medium text-slate-800">How to play</h3>
      <ul className="mt-2 list-disc space-y-2 pl-5">
        <li>
          The grid starts with a random mix of live and dead cells. Click{" "}
          <strong>Randomize</strong> for a new starting pattern.
        </li>
        <li>
          <strong>Run</strong> advances one generation per second.{" "}
          <strong>Pause</strong> stops the simulation.
        </li>
        <li>
          <strong>Step once</strong> moves a single generation while paused.
        </li>
        <li>
          While paused, <strong>click a cell</strong> to toggle it alive or dead
          so you can draw gliders, still lifes, and other shapes.
        </li>
      </ul>
      <h3 className="mt-4 font-medium text-slate-800">Rules (each step)</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>Live cell with 2 or 3 live neighbors survives.</li>
        <li>Dead cell with exactly 3 live neighbors becomes alive.</li>
        <li>All other live cells die; other dead cells stay dead.</li>
      </ul>
      <p className="mt-3 text-slate-600">
        Grid size: {WIDTH}×{HEIGHT} (columns × rows).
      </p>
    </section>
  );
}
