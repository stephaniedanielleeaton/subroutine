# USS A20 Navigation Console

A React + TypeScript implementation of a submarine based navigation puzzle.

The application parses navigation commands, applies one of two navigation strategies, and displays the resulting answer. Invalid input is validated and reported with descriptive error messages.

## Kata

The original kata can be found in `docs/kata-materials`. Assumptions and design decisions are documented in `docs/assumptions-and-questions.md`.

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm

## Getting Started

Clone the repository (or extract the provided ZIP), then install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal ( http://localhost:5173 ).

## Running Tests

Run the full test suite:

```bash
npm test
```

Generate a coverage report:

```bash
npm run test:coverage
```

## Technologies

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
