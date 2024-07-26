// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import FilterModal from './FilterModal';
// import Dropdown from '../../atoms/Dropdown/Dropdown';
// import Slider from '../Slider/Slider';

// // Mock the Dropdown component
// jest.mock('../../atoms/Dropdown/Dropdown', () => jest.fn(() => <div data-testid="dropdown">Mocked Dropdown</div>));

// // Mock the Slider component
// jest.mock('../slider/Slider', () => jest.fn(() => <div data-testid="slider">Mocked Slider</div>));

// describe('FilterModal', () => {
//   const mockOnClose = jest.fn();

//   beforeEach(() => {
//     render(<FilterModal onClose={mockOnClose} />);
//   });

//   it('renders the modal with correct title', () => {
//     expect(screen.getByText('Filters')).toBeInTheDocument();
//   });

//   it('renders the close button and calls onClose when clicked', () => {
//     const closeButton = screen.getByText('×');
//     expect(closeButton).toBeInTheDocument();
//     fireEvent.click(closeButton);
//     expect(mockOnClose).toHaveBeenCalledTimes(1);
//   });

//   it('renders the Dropdown components', () => {
//     expect(screen.getAllByTestId('dropdown')).toHaveLength(2);
//   });

//   it('renders the Slider component', () => {
//     expect(screen.getByTestId('slider')).toBeInTheDocument();
//   });

//   it('renders the reset and apply buttons', () => {
//     expect(screen.getByText('Reset')).toBeInTheDocument();
//     expect(screen.getByText('Apply')).toBeInTheDocument();
//   });

//   it('applies the correct CSS classes for layout and styling', () => {
    
//     const title = screen.getByText('Filters').closest('div');
//     expect(title).toHaveClass('flex', 'justify-between', 'items-center', 'mb-4');

//     const resetButton = screen.getByText('Reset');
//     const applyButton = screen.getByText('Apply');
//     expect(resetButton).toHaveClass('px-4', 'py-2', 'border', 'border-gray-300', 'rounded');
//     expect(applyButton).toHaveClass('px-4', 'py-2', 'bg-SECONDARY', 'text-white', 'rounded');
//   });

//   it('handles reset and apply button clicks', () => {
//     const resetButton = screen.getByText('Reset');
//     fireEvent.click(resetButton);
    

//     const applyButton = screen.getByText('Apply');
//     fireEvent.click(applyButton);
    
//   });
// });


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterModal from './FilterModal';

// Mock the child components
jest.mock('../../atoms/Dropdown/Dropdown', () => {
  return function MockDropdown({ label, isOpen, onToggle }: any) {
    return (
      <div data-testid={`mock-dropdown-${label.toLowerCase()}`}>
        <button onClick={onToggle}>{label}</button>
        {isOpen && <div>Dropdown Content</div>}
      </div>
    );
  };
});

jest.mock('../Slider/Slider', () => {
  return function MockSlider({ isOpen, onToggle }: any) {
    return (
      <div data-testid="mock-slider">
        <button onClick={onToggle}>Stats</button>
        {isOpen && <div>Slider Content</div>}
      </div>
    );
  };
});

describe('FilterModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<FilterModal onClose={mockOnClose} />);
  });

  it('renders the FilterModal component', () => {
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders Type dropdown', () => {
    expect(screen.getByTestId('mock-dropdown-type')).toBeInTheDocument();
  });

  it('renders Gender dropdown', () => {
    expect(screen.getByTestId('mock-dropdown-gender')).toBeInTheDocument();
  });

  it('renders Stats slider', () => {
    expect(screen.getByTestId('mock-slider')).toBeInTheDocument();
  });

  it('toggles Type dropdown when clicked', () => {
    const typeButton = screen.getByText('Type');
    fireEvent.click(typeButton);
    expect(screen.getByText('Dropdown Content')).toBeInTheDocument();
    fireEvent.click(typeButton);
    expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();
  });

  it('toggles Gender dropdown when clicked', () => {
    const genderButton = screen.getByText('Gender');
    fireEvent.click(genderButton);
    expect(screen.getByText('Dropdown Content')).toBeInTheDocument();
    fireEvent.click(genderButton);
    expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();
  });

  it('toggles Stats slider when clicked', () => {
    const statsButton = screen.getByText('Stats');
    fireEvent.click(statsButton);
    expect(screen.getByText('Slider Content')).toBeInTheDocument();
    fireEvent.click(statsButton);
    expect(screen.queryByText('Slider Content')).not.toBeInTheDocument();
  });

  it('closes other components when one is opened', () => {
    const typeButton = screen.getByText('Type');
    const genderButton = screen.getByText('Gender');
    
    fireEvent.click(typeButton);
    expect(screen.getByText('Dropdown Content')).toBeInTheDocument();
    
    fireEvent.click(genderButton);
    expect(screen.queryAllByText('Dropdown Content')).toHaveLength(1);
  });

  it('renders Reset button', () => {
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('renders Apply button', () => {
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });
});