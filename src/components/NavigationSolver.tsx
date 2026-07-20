import './NavigationSolver.css';

export function NavigationSolver() {
  return (
    <main className="navigation-solver">
      <header>
        <h1>Navigation Solver</h1>
        <p>
          Solve Advent of Code navigation puzzles using interchangeable
          navigation strategies.
        </p>
      </header>

      <section className="controls">
        <label>
          Navigation Strategy
          <select>
            <option>Part One</option>
            <option>Part Two</option>
          </select>
        </label>

        <label>
          Navigation Input
          <textarea />
        </label>

        <button>Solve</button>
      </section>

      <section className="result">
        <h2>Result</h2>
        <p>--</p>
      </section>
    </main>
  );
}