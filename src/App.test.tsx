import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders snake game with score and controls', () => {
  render(<App />);
  expect(screen.getByText(/snake/i)).toBeInTheDocument();
  expect(screen.getByLabelText('score')).toBeInTheDocument();
  expect(screen.getByTestId('start-btn')).toBeInTheDocument();
  expect(screen.getByTestId('pause-btn')).toBeInTheDocument();
  expect(screen.getByTestId('restart-btn')).toBeInTheDocument();
});
