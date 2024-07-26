import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Hamburger from './Hamburger';
import { TbAdjustmentsHorizontal } from "react-icons/tb";

// Mock the FilterModal component
jest.mock('../FilterModal/FilterModal', () => ({
  __esModule: true,
  default: ({ onClose }) => <div data-testid="filter-modal" onClick={onClose}>Mock FilterModal</div>
}));

// Mock the TbAdjustmentsHorizontal icon
jest.mock('react-icons/tb', () => ({
  TbAdjustmentsHorizontal: () => <div data-testid="adjustments-icon">Mock Icon</div>
}));

describe('Hamburger Component', () => {
  test('renders without crashing', () => {
    render(<Hamburger />);
    expect(screen.getByTestId('adjustments-icon')).toBeInTheDocument();
  });

  test('initially does not show the FilterModal', () => {
    render(<Hamburger />);
    expect(screen.queryByTestId('filter-modal')).not.toBeInTheDocument();
  });
  
});
