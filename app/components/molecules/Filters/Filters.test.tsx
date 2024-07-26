/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';

// Mock the imported components
jest.mock('../../atoms/Dropdown/Dropdown', () => ({ label, isOpen, onToggle }) => (
  <div data-testid={`dropdown-${label.toLowerCase()}`} onClick={onToggle}>
    {label} {isOpen ? 'Open' : 'Closed'}
  </div>
));

jest.mock('../Slider/Slider', () => ({ isOpen, onToggle }) => (
  <div data-testid="slider" onClick={onToggle}>
    Slider {isOpen ? 'Open' : 'Closed'}
  </div>
));

jest.mock('../SearchBox/SearchBox', () => () => <div data-testid="search-box">SearchBox</div>);

jest.mock('../Hamburger/Hamburger', () => () => <div data-testid="hamburger">Hamburger</div>);

describe('Filters Component', () => {
  test('renders all components correctly', () => {
    render(<Filters />);
    
    expect(screen.getByTestId('search-box')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-type')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-gender')).toBeInTheDocument();
    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });

  test('toggles Type dropdown', () => {
    render(<Filters />);
    
    const typeDropdown = screen.getByTestId('dropdown-type');
    expect(typeDropdown).toHaveTextContent('Type Closed');
    
    fireEvent.click(typeDropdown);
    expect(typeDropdown).toHaveTextContent('Type Open');
    
    fireEvent.click(typeDropdown);
    expect(typeDropdown).toHaveTextContent('Type Closed');
  });

  test('toggles Gender dropdown', () => {
    render(<Filters />);
    
    const genderDropdown = screen.getByTestId('dropdown-gender');
    expect(genderDropdown).toHaveTextContent('Gender Closed');
    
    fireEvent.click(genderDropdown);
    expect(genderDropdown).toHaveTextContent('Gender Open');
    
    fireEvent.click(genderDropdown);
    expect(genderDropdown).toHaveTextContent('Gender Closed');
  });

  test('toggles Slider', () => {
    render(<Filters />);
    
    const slider = screen.getByTestId('slider');
    expect(slider).toHaveTextContent('Slider Closed');
    
    fireEvent.click(slider);
    expect(slider).toHaveTextContent('Slider Open');
    
    fireEvent.click(slider);
    expect(slider).toHaveTextContent('Slider Closed');
  });

  test('closes other components when one is opened', () => {
    render(<Filters />);
    
    const typeDropdown = screen.getByTestId('dropdown-type');
    const genderDropdown = screen.getByTestId('dropdown-gender');
    const slider = screen.getByTestId('slider');

    fireEvent.click(typeDropdown);
    expect(typeDropdown).toHaveTextContent('Type Open');
    expect(genderDropdown).toHaveTextContent('Gender Closed');
    expect(slider).toHaveTextContent('Slider Closed');

    fireEvent.click(genderDropdown);
    expect(typeDropdown).toHaveTextContent('Type Closed');
    expect(genderDropdown).toHaveTextContent('Gender Open');
    expect(slider).toHaveTextContent('Slider Closed');

    fireEvent.click(slider);
    expect(typeDropdown).toHaveTextContent('Type Closed');
    expect(genderDropdown).toHaveTextContent('Gender Closed');
    expect(slider).toHaveTextContent('Slider Open');
  });

  test('renders hamburger menu on mobile', () => {
    render(<Filters />);
    
    const hamburger = screen.getByTestId('hamburger');
    expect(hamburger).toBeInTheDocument();
  });
});

