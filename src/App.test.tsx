import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Neon Labyrinth game shell and controls', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /neon labyrinth/i })).toBeInTheDocument();
  expect(
    screen.getByLabelText(/neon labyrinth.+retro first-person shooter/i)
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/game controls/i)).toHaveTextContent(/w\/s or ↑\/↓ move/i);
  expect(screen.getByText(/space or click fire/i)).toBeInTheDocument();
  expect(screen.getByText(/f or enter interact/i)).toBeInTheDocument();
});
