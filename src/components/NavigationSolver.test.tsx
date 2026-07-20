import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { NavigationSolver } from './NavigationSolver';

describe('NavigationSolver', () => {
  const sampleInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

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
  });

  it('disables solve when the input is empty', () => {
    render(<NavigationSolver />);

    expect(
      screen.getByRole('button', { name: /solve/i }),
    ).toBeDisabled();
  });

  it('allows the user to enter navigation commands', () => {
    render(<NavigationSolver />);

    const textbox = screen.getByRole('textbox');

    fireEvent.change(textbox, {
      target: { value: sampleInput },
    });

    expect(textbox).toHaveValue(sampleInput);
  });

  it('solves the sample using the part one strategy', () => {
    render(<NavigationSolver />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: sampleInput },
    });

    fireEvent.click(
      screen.getByRole('button', { name: /solve/i }),
    );

    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('solves the sample using the part two strategy', () => {
    render(<NavigationSolver />);

    fireEvent.click(
      screen.getByRole('button', { name: /part two/i }),
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: sampleInput },
    });

    fireEvent.click(
      screen.getByRole('button', { name: /solve/i }),
    );

    expect(screen.getByText('900')).toBeInTheDocument();
  });

  it('shows an error when the input cannot be parsed', () => {
    render(<NavigationSolver />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'forward bananas' },
    });

    fireEvent.click(
      screen.getByRole('button', { name: /solve/i }),
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});