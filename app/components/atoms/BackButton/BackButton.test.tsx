import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackButton from './BackButton';

// Mock the useRouter hook
const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('BackButton', () => {
  it('renders the back button', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  it('calls router.back when clicked', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('has the correct aria-label', () => {
    render(<BackButton />);
    const button = screen.getByLabelText('Close');
    expect(button).toBeInTheDocument();
  });

  it('has the correct CSS classes', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toHaveClass('text-gray-500', 'hover:text-gray-700', 'mx-2');
  });


});