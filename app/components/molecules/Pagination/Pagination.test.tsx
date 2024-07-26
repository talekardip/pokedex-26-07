import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { Pagination } from './Pagination';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Pagination', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockRouter.push.mockClear();
  });

  it('renders the pagination component with correct text', () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('disables the previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('enables the previous button when not on the first page', () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeEnabled();
  });

  it('enables the next button when not on the last page', () => {
    render(<Pagination currentPage={4} totalPages={5} />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeEnabled();
  });

  it('calls handlePageChange with correct page number when previous button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    expect(mockRouter.push).toHaveBeenCalledWith('?page=1');
  });

  it('calls handlePageChange with correct page number when next button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockRouter.push).toHaveBeenCalledWith('?page=3');
  });

  it('updates the URL with the correct query parameter when page changes', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockRouter.push).toHaveBeenCalledWith('?page=4');

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    expect(mockRouter.push).toHaveBeenCalledWith('?page=2');
  });


});