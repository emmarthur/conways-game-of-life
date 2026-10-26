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
  type CellState,
  type Cells,
} from "@/lib/conwaysGameOfLife";
import { DemoHelpSection } from "@/components/DemoHelpSection";
import { HelpJumpButton } from "@/components/HelpJumpButton";

const STEP_MS = 1000;

function toggleCell(cells: Cells, x: number, y: number): Cells {
  const next = new Map(cells);
  const key = cellKey(x, y);
  next.set(key, cells.get(key) === ALIVE ? DEAD : ALIVE);
  return next;
}

function LoadingShell() {
  return (
    <div className="life-shell">
      <div className="life-blob life-blob-a" aria-hidden="true" />
      <div className="life-blob life-blob-b" aria-hidden="true" />
      <header className="life-hero">
        <div className="life-hero-icon" aria-hidden="true">
          ◉
        </div>
        <h1 className="life-title">Conway&apos;s Game of Life</h1>
        <p className="mt-2 text-sm text-slate-400">Preparing random grid…</p>
      </header>
    </div>
  );
}

export function ConwaysGameOfLife() {
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
      setCells((prev) => (prev ? toggleCell(prev, x, y) : prev));
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
    return <LoadingShell />;
  }

  return (
    <div className="life-shell">
      <div className="life-blob life-blob-a" aria-hidden="true" />
      <div className="life-blob life-blob-b" aria-hidden="true" />

      <header className="life-hero">
        <div className="life-hero-icon" aria-hidden="true">
          ◉
        </div>
        <h1 className="life-title">Conway&apos;s Game of Life</h1>
        <p className="mt-2 text-sm text-slate-400">
          Cellular automaton — run, step, or draw patterns
        </p>
        <HelpJumpButton />
      </header>

      <div className="life-card mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="life-btn-run"
          >
            {running ? "Pause" : "Run"}
          </button>
          <button
            type="button"
            onClick={stepOnce}
            disabled={running}
            className="life-btn-ghost disabled:opacity-50"
          >
            Step once
          </button>
          <button type="button" onClick={randomize} className="life-btn-ghost">
            Randomize
          </button>
          <span className="life-gen-pill">Gen {generation}</span>
          {!running && (
            <span className="text-xs text-slate-500">
              Click a cell to toggle
            </span>
          )}
        </div>
      </div>

      <div className="life-grid-frame">
        <div className="life-grid-inner">
          <pre className="life-grid-pre" aria-label="Game of Life grid">
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
