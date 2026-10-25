"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ALIVE,
  cellKey,
  computeNextGeneration,
  createRandomCells,
  DEAD,
  HEIGHT,
  rowToString,
  WIDTH,
  type CellState,
  type Cells,
} from "@/lib/conwaysGameOfLife";
import { DemoHelpSection } from "@/components/DemoHelpSection";

const STEP_MS = 1000;

function toggleCell(cells: Cells, x: number, y: number): Cells {
  const next = new Map(cells);
  const key = cellKey(x, y);
  next.set(key, cells.get(key) === ALIVE ? DEAD : ALIVE);
  return next;
}

export function ConwaysGameOfLife() {
  // Random grid is client-only (Math.random differs between SSR and hydration).
  const [cells, setCells] = useState<Cells | null>(null);
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    setCells(createRandomCells());
  }, []);

  const randomize = useCallback(() => {
    setRunning(false);
    setCells(createRandomCells());
    setGeneration(0);
  }, []);

  const stepOnce = useCallback(() => {
    setCells((prev) => (prev ? computeNextGeneration(prev) : prev));
    setGeneration((g) => g + 1);
  }, []);

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (running) return;
      setCells((prev) => toggleCell(prev, x, y));
    },
    [running],
  );

  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      setCells((prev) => (prev ? computeNextGeneration(prev) : prev));
      setGeneration((g) => g + 1);
    }, STEP_MS);

    return () => window.clearInterval(id);
  }, [running]);

  if (cells === null) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Conway&apos;s Game of Life
          </h1>
          <p className="mt-2 text-sm text-slate-600">Preparing random grid…</p>
        </header>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Conway&apos;s Game of Life
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Watch living cells evolve on a {WIDTH}×{HEIGHT} grid, one generation
          per second when running.
        </p>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="rounded bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
        >
          {running ? "Pause" : "Run"}
        </button>
        <button
          type="button"
          onClick={stepOnce}
          disabled={running}
          className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50"
        >
          Step once
        </button>
        <button
          type="button"
          onClick={randomize}
          className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          Randomize
        </button>
        <span className="text-sm text-slate-500">
          Generation {generation}
          {!running && " · click a cell to toggle (web extra)"}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-black p-3 shadow-inner">
        <pre
          className="m-0 font-mono text-[10px] leading-[10px] text-emerald-400 sm:text-xs sm:leading-[14px]"
          aria-label="Game of Life grid"
        >
          {Array.from({ length: HEIGHT }, (_, y) => (
            <GridRow
              key={y}
              y={y}
              cells={cells}
              running={running}
              onToggle={handleCellClick}
            />
          ))}
        </pre>
        <p className="mt-2 font-mono text-xs text-slate-500">
          Press Pause to stop the simulation.
        </p>
      </div>

      <DemoHelpSection />
    </div>
  );
}

function GridRow({
  y,
  cells,
  running,
  onToggle,
}: {
  y: number;
  cells: Cells;
  running: boolean;
  onToggle: (x: number, y: number) => void;
}) {
  const line = rowToString(cells, y);
  return (
    <div className="whitespace-pre">
      {line.split("").map((ch, x) => (
        <CellChar
          key={x}
          x={x}
          y={y}
          ch={ch as CellState}
          running={running}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

function CellChar({
  x,
  y,
  ch,
  running,
  onToggle,
}: {
  x: number;
  y: number;
  ch: CellState;
  running: boolean;
  onToggle: (x: number, y: number) => void;
}) {
  return (
    <span
      role="button"
      tabIndex={running ? -1 : 0}
      onClick={() => onToggle(x, y)}
      onKeyDown={(e) => {
        if (!running && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onToggle(x, y);
        }
      }}
      className={
        running
          ? "cursor-default"
          : "cursor-pointer hover:bg-emerald-900/40 focus:bg-emerald-900/40 focus:outline-none"
      }
    >
      {ch}
    </span>
  );
}
