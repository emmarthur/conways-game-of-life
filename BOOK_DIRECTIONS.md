# Book directions — Conway's Game of Life

**Catalog #450** · Al Sweigart, *The Big Book of Small Python Projects*, **Project #13**

- Online chapter: [inventwithpython.com/bigbookpython/project13.html](https://inventwithpython.com/bigbookpython/project13.html)
- Upstream code: [conwaysgameoflife.py](https://github.com/asweigart/the-big-book-of-small-python-projects/blob/main/conwaysgameoflife.py)
- Local reference copy: [`reference/conwaysgameoflife.py`](./reference/conwaysgameoflife.py)

## What the book asks you to build

A **toroidal** (wrap-around) grid of cells. Each step, every cell lives or dies by Conway's rules based on its eight neighbors. The program randomizes the starting grid, prints `O` (alive) and space (dead) to the terminal, waits one second, then repeats until Ctrl-C.

## Constants (from the book)

| Name | Value | Meaning |
|------|-------|---------|
| `WIDTH` | 79 | Columns |
| `HEIGHT` | 20 | Rows |
| `ALIVE` | `'O'` | Living cell character |
| `DEAD` | `' '` | Dead cell character |

## Step order (follow the book's source)

1. **Initialize `nextCells`** — Nested loops over `x` in `range(WIDTH)` and `y` in `range(HEIGHT)`. Each cell is `ALIVE` or `DEAD` with 50/50 `random.randint(0, 1)`.
2. **Main loop** (`while True`):
   - Print blank lines, then **`cells = copy.deepcopy(nextCells)`**.
   - **Draw** — For each row `y`, print each column `x` using `cells[(x, y)]`.
   - Print *Press Ctrl-C to quit.*
   - **Compute next generation** — For each `(x, y)`:
     - Neighbor coords with wrap: `left = (x - 1) % WIDTH`, `right = (x + 1) % WIDTH`, `above = (y - 1) % HEIGHT`, `below = (y + 1) % HEIGHT`.
     - Count neighbors equal to `ALIVE` (eight checks).
     - If alive and neighbors in `{2, 3}` → stay alive; if dead and neighbors `== 3` → alive; else dead.
   - **`time.sleep(1)`** — On `KeyboardInterrupt`, print credit and `sys.exit()`.

## Rules (book explanation)

- Live cell with **2 or 3** live neighbors survives.
- Dead cell with **exactly 3** live neighbors becomes alive.
- All other live cells die; dead cells stay dead.

## Optional experiments (book “Exploring the Program”)

- Change `ALIVE` / `DEAD` characters (e.g. `#` and `.`, or `|` and `-`).
- Adjust `WIDTH` / `HEIGHT`.
- Remove `time.sleep(1)` to run as fast as possible.

## Web version (`web/`)

| Book step | Web equivalent |
|-----------|----------------|
| Random `nextCells` | **Randomize** button → `createRandomCells()` |
| Print grid | Monospace grid (`O` / space) on a dark panel |
| `while True` + `sleep(1)` | **Run** / **Pause** with **1000 ms** between steps |
| Ctrl-C | **Pause** or close tab |
| (not in book) | **Step once** and **click a cell** to toggle alive/dead for demos |

Logic port: [`web/src/lib/conwaysGameOfLife.ts`](./web/src/lib/conwaysGameOfLife.ts) (mirrors [`reference/conwaysgameoflife.py`](./reference/conwaysgameoflife.py)).
