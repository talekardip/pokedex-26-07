import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBox from './SearchBox';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SearchBox', () => {
  const mockPush = jest.fn();
  const placeholderText = 'Search...';

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    render(<SearchBox />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search input and button', () => {
    const input = screen.getByPlaceholderText(placeholderText);
    const button = screen.getByRole('button');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('updates the query state on input change', () => {
    const input = screen.getByPlaceholderText(placeholderText) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Pikachu' } });
    expect(input.value).toBe('Pikachu');
  });

  it('calls router.push with the correct query string on submit', () => {
    const input = screen.getByPlaceholderText(placeholderText) as HTMLInputElement;
    const button = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'Pikachu' } });
    fireEvent.click(button);
    
    expect(mockPush).toHaveBeenCalledWith('?search=Pikachu');
  });

  it('removes the search parameter from the query string if input is empty', () => {
    const input = screen.getByPlaceholderText(placeholderText) as HTMLInputElement;
    const button = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'Pikachu' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);
    
    expect(mockPush).toHaveBeenCalledWith('?');
  });



  it('has the correct CSS classes for layout and styling', () => {
    const input = screen.getByPlaceholderText(placeholderText);
    const button = screen.getByRole('button');
    
    expect(input).toHaveClass('px-4', 'py-2', 'border', 'w-full', 'border-black-300', 'rounded-l-md', 'focus:outline-none', 'border-r-0');
    expect(button).toHaveClass('px-4', 'py-2', 'h-full', 'border', 'border-black-300', 'bg-DROPDOWNCOLOR', 'text-black', 'rounded-r-md', 'focus:outline-none', 'border-l-0');
  });
});