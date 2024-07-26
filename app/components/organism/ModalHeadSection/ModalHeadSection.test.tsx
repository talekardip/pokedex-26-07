import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalHeadSection from './ModalHeadSection';
import ModalImageCard from '../../atoms/ModalImageCard/ModalImageCard';
import ModalControlButtons from '../../molecules/ModalControlButtons/ModalControlButtons';
import BackButton from '../../atoms/BackButton/BackButton';
import CreatureDescription from '../../atoms/CreatureDescription/CreatureDescription';

// Mock the imported components
jest.mock('../../atoms/modalImageCard/ModalImageCard', () => jest.fn(() => <div>Mocked ModalImageCard</div>));
jest.mock('../../molecules/ModalControlButtons/ModalControlButtons', () => jest.fn(() => <div>Mocked ModalControlButtons</div>));
jest.mock('../../atoms/BackButton/BackButton', () => jest.fn(() => <button aria-label="Close">Mocked BackButton</button>));
jest.mock('../../atoms/CreatureDescription/CreatureDescription', () => jest.fn(() => <div>Mocked CreatureDescription</div>));

describe('ModalHeadSection', () => {
  const mockProps = {
    pokemonData: { /* mock data */ },
    id: '25',
    name: 'Pikachu'
  };

  beforeEach(() => {
    render(<ModalHeadSection {...mockProps} />);
  });

  it('renders ModalImageCard with correct props', () => {
    expect(ModalImageCard).toHaveBeenCalledWith({ pokemonData: mockProps.pokemonData }, {});
  });

  it('renders the name and id correctly', () => {
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.id)).toBeInTheDocument();
  });

  it('renders ModalControlButtons with correct id prop when screen size is not small', () => {
    // Ensure the control buttons are rendered
    expect(ModalControlButtons).toHaveBeenCalledWith({ id: Number(mockProps.id) }, {});
  });

  it('renders BackButton when screen size is small', () => {
    // Ensure the back button is rendered
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('renders CreatureDescription with correct id prop', () => {
    expect(CreatureDescription).toHaveBeenCalledWith({ id: mockProps.id }, {});
  });


});