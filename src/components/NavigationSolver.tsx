import { useState } from 'react';
import './NavigationSolver.css';

import kataInput from '../../docs/kata-materials/input.txt?raw';

import { solveNavigation } from '../application/solveNavigation';
import { PartOneNavigation } from '../domain/navigation/PartOneNavigation';
import { PartTwoNavigation } from '../domain/navigation/PartTwoNavigation';

export function NavigationSolver() {
  const [strategy, setStrategy] = useState<'part-one' | 'part-two'>('part-one');

  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSolve() {
    try {
      const navigation =
        strategy === 'part-one' ? new PartOneNavigation() : new PartTwoNavigation();

      const answer = solveNavigation(input, navigation);

      setResult(answer);
      setError(null);
    } catch (err) {
      setResult(null);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  }

  return (
    <main className="navigation-solver">
      <header className="hero">
        <h1>USS A20 Navigation Console</h1>

        <p>Please chart your navigation below. Sink or swim, but preferably swim.</p>
      </header>

      <section className="panel">
        <h2>Navigation Strategy</h2>

        <div className="strategy-selector">
          <button
            type="button"
            className={strategy === 'part-one' ? 'active' : ''}
            onClick={() => setStrategy('part-one')}
          >
            Part One
          </button>

          <button
            type="button"
            className={strategy === 'part-two' ? 'active' : ''}
            onClick={() => setStrategy('part-two')}
          >
            Part Two
          </button>
        </div>
      </section>

      <section className="panel">
        <h2>Navigation Input</h2>

        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={`forward 5
down 5
forward 8`}
        />

        <div className="input-actions">
          <button type="button" className="secondary-button" onClick={() => setInput(kataInput)}>
            Load Kata Input
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={handleSolve}
            disabled={input.trim() === ''}
          >
            Solve
          </button>
        </div>
      </section>

      {error && (
        <section className="error-panel" role="alert">
          {error.split('\n').map((line, index) => (
            <div key={`${index}-${line}`} className="error-item">
              <span className="error-bullet" aria-hidden="true">
                •
              </span>
              <span>{line}</span>
            </div>
          ))}
        </section>
      )}

      <section className="panel result-panel">
        <h2>Result</h2>

        <div className="result-value">{result ?? '--'}</div>
      </section>
    </main>
  );
}
