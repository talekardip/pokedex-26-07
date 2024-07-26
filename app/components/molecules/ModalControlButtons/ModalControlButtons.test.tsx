/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalControlButtons from './ModalControlButtons';
import { endpoints } from '@/app/utils/Endpoints';

// Mock the Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the BackButton component
jest.mock('../../atoms/BackButton/BackButton', () => {
  return () => <button>Back</button>;
});

describe('ModalControlButtons', () => {

  it('renders BackButton component', () => {
    render(<ModalControlButtons id={5} />);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });


  it('renders in a flex container', () => {
    const { container } = render(<ModalControlButtons id={5} />);
    const flexContainer = container.firstChild;
    expect(flexContainer).toHaveClass('flex', 'items-center');
  });
});