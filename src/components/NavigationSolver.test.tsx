import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { solveNavigation } from '../application/solveNavigation';
import { NavigationSolver } from './NavigationSolver';
import { ParseException } from '../domain/parsers/ParseException';

vi.mock('../application/solveNavigation', () => ({
  solveNavigation: vi.fn(),
}));

const solveNavigationMock = vi.mocked(solveNavigation);

describe('NavigationSolver', () => {
  beforeEach(() => {
    solveNavigationMock.mockReset();
  });

  function enterInput(input: string) {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: input },
    });
  }

  function clickSolve() {
    fireEvent.click(screen.getByRole('button', { name: /solve/i }));
  }

  function solve(input = 'forward 5') {
    enterInput(input);
    clickSolve();
  }

  it('renders the navigation console', () => {
    render(<NavigationSolver />);

    expect(
      screen.getByRole('heading', {
        name: /uss a20 navigation console/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /part one/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /part two/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /solve/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('--')).toBeInTheDocument();
  });

  it('disables solve when the input is empty', () => {
    render(<NavigationSolver />);

    expect(screen.getByRole('button', { name: /solve/i })).toBeDisabled();
  });

  it('enables solve when input is entered', () => {
    render(<NavigationSolver />);

    enterInput('forward 5');

    expect(screen.getByRole('button', { name: /solve/i })).toBeEnabled();
  });

  it('updates the navigation input', () => {
    render(<NavigationSolver />);

    const textbox = screen.getByRole('textbox');

    fireEvent.change(textbox, {
      target: { value: 'forward 5' },
    });

    expect(textbox).toHaveValue('forward 5');
  });

  it('displays the result returned by the application', () => {
    solveNavigationMock.mockReturnValue(1234);

    render(<NavigationSolver />);

    solve();

    expect(solveNavigationMock).toHaveBeenCalledTimes(1);
    expect(solveNavigationMock).toHaveBeenCalledWith(
      'forward 5',
      expect.anything(),
    );

    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('clears a previous error after a successful solve', () => {
    solveNavigationMock
      .mockImplementationOnce(() => {
        throw new Error('Regular failure');
      })
      .mockReturnValueOnce(1234);

    render(<NavigationSolver />);

    solve();

    expect(screen.getByRole('alert')).toHaveTextContent('Regular failure');

    solve();

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  it('clears the previous result when solving fails', () => {
    solveNavigationMock
      .mockReturnValueOnce(1234)
      .mockImplementationOnce(() => {
        throw new Error('Regular failure');
      });

    render(<NavigationSolver />);

    solve();

    expect(screen.getByText('1234')).toBeInTheDocument();

    solve();

    expect(screen.queryByText('1234')).not.toBeInTheDocument();
    expect(screen.getByText('--')).toBeInTheDocument();
  });

  it('shows parse exception messages', () => {
    solveNavigationMock.mockImplementation(() => {
      throw new ParseException([
        {
          line: 1,
          message: 'Invalid distance: bananas',
        },
      ]);
    });

    render(<NavigationSolver />);

    solve();

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Line 1: Invalid distance: bananas',
    );
  });

  it('shows regular error messages', () => {
    solveNavigationMock.mockImplementation(() => {
      throw new Error('Regular failure');
    });

    render(<NavigationSolver />);

    solve();

    expect(screen.getByRole('alert')).toHaveTextContent('Regular failure');
  });

  it('shows a fallback message for non-error exceptions', () => {
    solveNavigationMock.mockImplementation(() => {
      throw 'Unknown failure';
    });

    render(<NavigationSolver />);

    solve();

    expect(screen.getByRole('alert')).toHaveTextContent(
      'An unexpected error occurred.',
    );
  });

  it('allows switching back to part one', () => {
  render(<NavigationSolver />);

  fireEvent.click(screen.getByRole('button', { name: /part two/i }));
  fireEvent.click(screen.getByRole('button', { name: /part one/i }));

  expect(
    screen.getByRole('button', { name: /part one/i }),
  ).toHaveClass('active');

  expect(
    screen.getByRole('button', { name: /part two/i }),
  ).not.toHaveClass('active');
});

});