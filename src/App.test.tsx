import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders prime checker label', () => {
  render(<App />);
  const label = screen.getByText(/check if a number is prime:/i);
  expect(label).toBeInTheDocument();
});
