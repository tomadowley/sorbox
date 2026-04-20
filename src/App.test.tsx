import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders platformer game heading', () => {
  render(<App />);
  const heading = screen.getByText(/mini platformer/i);
  expect(heading).toBeInTheDocument();
});
