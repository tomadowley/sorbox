import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PrimeChecker from './components/PrimeChecker';

describe('PrimeChecker component', () => {
  it('checks for prime number and displays correct result', () => {
    render(<PrimeChecker />);
    const input = screen.getByTestId('prime-input') as HTMLInputElement;
    const button = screen.getByTestId('prime-check');

    // Simulate typing 7
    fireEvent.change(input, { target: { value: '7' } });
    expect(input.value).toBe('7');
    // Simulate clicking Check
    fireEvent.click(button);

    // Expect the prime message
    expect(screen.getByText('7 is a prime number')).toBeInTheDocument();
  });

  it('shows warning for empty input', () => {
    render(<PrimeChecker />);
    const button = screen.getByTestId('prime-check');
    fireEvent.click(button);
    expect(screen.getByText('Please enter a positive integer')).toBeInTheDocument();
  });

  it('shows not prime message for non-prime', () => {
    render(<PrimeChecker />);
    const input = screen.getByTestId('prime-input') as HTMLInputElement;
    const button = screen.getByTestId('prime-check');
    fireEvent.change(input, { target: { value: '8' } });
    fireEvent.click(button);
    expect(screen.getByText('8 is not a prime number')).toBeInTheDocument();
  });
});