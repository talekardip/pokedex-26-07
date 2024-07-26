import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import CloseButton from './CancelButton';

describe('CloseButton', () => {
  test('renders the close button', () => {
    render(<CloseButton />);
    const buttonElement = screen.getByRole('button', { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('button has the correct class', () => {
    render(<CloseButton />);
    const buttonElement = screen.getByRole('button', { name: /close/i });
    expect(buttonElement).toHaveClass('text-gray-500 hover:text-gray-700 focus:outline-none mr-2');
  });

});