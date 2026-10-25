/**
 * Conway's Game of Life — same rules and dimensions as
 * reference/conwaysgameoflife.py (Al Sweigart).
 */

export const WIDTH = 79;
export const HEIGHT = 20;

/** Living cell character in the book terminal output. */
export const ALIVE = "O";
/** Dead cell character in the book terminal output. */
export const DEAD = " ";

export type CellState = typeof ALIVE | typeof DEAD;
export type Cells = Map<string, CellState>;

export function cellKey(x: number, y: number): string {
  return `${x},${y}`;
}

/** All dead — deterministic for SSR (random grid runs only in the browser). */
export function createEmptyCells(
  width = WIDTH,
  height = HEIGHT,
): Cells {
  const cells: Cells = new Map();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      cells.set(cellKey(x, y), DEAD);
    }
  }
  return cells;
}

/** 50/50 random grid — mirrors the book's startup nested loops. */
export function createRandomCells(
  width = WIDTH,
  height = HEIGHT,
): Cells {
  const nextCells: Cells = new Map();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      nextCells.set(
        cellKey(x, y),
        Math.random() < 0.5 ? ALIVE : DEAD,
      );
    }
  }
  return nextCells;
}

/** One simulation step; toroidal edges match Python's `% WIDTH` / `% HEIGHT`. */
export function computeNextGeneration(
  cells: Cells,
  width = WIDTH,
  height = HEIGHT,
): Cells {
  const nextCells: Cells = new Map();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const left = (x - 1 + width) % width;
      const right = (x + 1) % width;
      const above = (y - 1 + height) % height;
      const below = (y + 1) % height;

      const neighborCoords: [number, number][] = [
        [left, above],
        [x, above],
        [right, above],
        [left, y],
        [right, y],
        [left, below],
        [x, below],
        [right, below],
      ];

      let numNeighbors = 0;
      for (const [nx, ny] of neighborCoords) {
        if (cells.get(cellKey(nx, ny)) === ALIVE) {
          numNeighbors += 1;
        }
      }

      const current = cells.get(cellKey(x, y)) ?? DEAD;

      if (
        current === ALIVE &&
        (numNeighbors === 2 || numNeighbors === 3)
      ) {
        nextCells.set(cellKey(x, y), ALIVE);
      } else if (current === DEAD && numNeighbors === 3) {
        nextCells.set(cellKey(x, y), ALIVE);
      } else {
        nextCells.set(cellKey(x, y), DEAD);
      }
    }
  }

  return nextCells;
}

/** Render one row of characters for the terminal-style view. */
export function rowToString(cells: Cells, y: number, width = WIDTH): string {
  let line = "";
  for (let x = 0; x < width; x++) {
    line += cells.get(cellKey(x, y)) ?? DEAD;
  }
  return line;
}
