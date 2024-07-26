/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationButtons from './NavigationButtons';
import { endpoints } from '@/app/utils/Endpoints';

// Mock the Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('NavigationButtons', () => {
  it('renders previous and next buttons', () => {
    render(<NavigationButtons id={5} />);
    
    expect(screen.getByText('previous')).toBeInTheDocument();
    expect(screen.getByText('next')).toBeInTheDocument();
  });

  it('sets correct href for previous button', () => {
    render(<NavigationButtons id={5} />);
    
    const prevButton = screen.getByText('previous').closest('a');
    expect(prevButton).toHaveAttribute('href', `${endpoints.navigatePokemonPage}4`);
  });

  it('sets correct href for next button', () => {
    render(<NavigationButtons id={5} />);
    
    const nextButton = screen.getByText('next').closest('a');
    expect(nextButton).toHaveAttribute('href', `${endpoints.navigatePokemonPage}6`);
  });

  it('sets previous button href to 1 when current id is 1', () => {
    render(<NavigationButtons id={1} />);
    
    const prevButton = screen.getByText('previous').closest('a');
    expect(prevButton).toHaveAttribute('href', `${endpoints.navigatePokemonPage}1`);
  });

  it('updates button hrefs when id prop changes', () => {
    const { rerender } = render(<NavigationButtons id={5} />);
    
    rerender(<NavigationButtons id={10} />);
    
    const prevButton = screen.getByText('previous').closest('a');
    const nextButton = screen.getByText('next').closest('a');
    
    expect(prevButton).toHaveAttribute('href', `${endpoints.navigatePokemonPage}9`);
    expect(nextButton).toHaveAttribute('href', `${endpoints.navigatePokemonPage}11`);
  });

  it('sets correct aria-labels for buttons', () => {
    render(<NavigationButtons id={5} />);
    
    expect(screen.getByLabelText('Previous')).toBeInTheDocument();
    expect(screen.getByLabelText('Next')).toBeInTheDocument();
  });
});