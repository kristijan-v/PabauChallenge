type Grid = string[][];

function parseGrid(input: string): Grid {
  return input.split("\n").map(row => row.split(''));
}

function findStartPosition(grid: Grid): [number, number] {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '>') {
        return [x, y];
      }
    }
  }
  throw new Error("Start position not found");
}

function isLetter(cell: string): boolean {
  return /[A-Z]/.test(cell) && cell !== 'S';
}

function collectLettersAndPath(grid: Grid): { path: string, letters: string } {
  let [x, y] = findStartPosition(grid);
  let path = '>';
  let letters = '';
  let direction = 'right';

  while (true) {
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
      break;
    }

    let current = grid[y][x];
    if (current === 's') {
      break;
    }

    if (current !== '>') {
      path += current;
      if (isLetter(current)) {
        letters += current;
      }
    }

    if (current === '+' || isLetter(current)) {
      let checkLeft = x > 0 && grid[y][x - 1] !== ' ' && direction !== 'right';
      let checkRight = x < grid[y].length - 1 && grid[y][x + 1] !== ' ' && direction !== 'left';
      let checkUp = y > 0 && grid[y - 1][x] !== ' ' && direction !== 'down';
      let checkDown = y < grid.length - 1 && grid[y + 1][x] !== ' ' && direction !== 'up';

      if (checkRight) direction = 'right';
      else if (checkDown) direction = 'down';
      else if (checkLeft) direction = 'left';
      else if (checkUp) direction = 'up';
    }

    switch (direction) {
      case 'right': x++; break;
      case 'left': x--; break;
      case 'up': y--; break;
      case 'down': y++; break;
    }
  }

  return { path, letters };
}

const input = '>---A-@-+\n        |\n+-U-+   C\n|   |   |\ns   C---+';

const grid = parseGrid(input);
const { path, letters } = collectLettersAndPath(grid);
console.log("Path:", path);
console.log("Letters:", letters);
