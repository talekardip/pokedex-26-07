import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatureDetails from './CreatureDetail';

describe('CreatureDetails', () => {
  const defaultProps = {
    name: 'Pikachu',
    id: 25,
    height: 4,
    weight: 60,
    eggGroups: [{ name: 'Field' }, { name: 'Fairy' }],
    gender: 4,
  };

  it('renders all sections correctly', () => {
    render(<CreatureDetails {...defaultProps} />);
    
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('Gender(s)')).toBeInTheDocument();
    expect(screen.getByText('Egg Groups')).toBeInTheDocument();
  });



  it('adjusts weight correctly', () => {
    render(<CreatureDetails {...defaultProps} />);
    expect(screen.getByText('6 Kg')).toBeInTheDocument();
  });

  it('displays correct gender for male', () => {
    render(<CreatureDetails {...defaultProps} gender={0} />);
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  it('displays correct gender for female', () => {
    render(<CreatureDetails {...defaultProps} gender={8} />);
    expect(screen.getByText('female')).toBeInTheDocument();
  });

  it('displays correct gender for genderless', () => {
    render(<CreatureDetails {...defaultProps} gender={-1} />);
    expect(screen.getByText('genderless')).toBeInTheDocument();
  });

  it('displays correct gender for both male and female', () => {
    render(<CreatureDetails {...defaultProps} gender={4} />);
    expect(screen.getByText('male, female')).toBeInTheDocument();
  });

  it('displays egg groups correctly', () => {
    render(<CreatureDetails {...defaultProps} />);
    expect(screen.getByText('Field,Fairy')).toBeInTheDocument();
  });

  it('handles empty egg groups', () => {
    render(<CreatureDetails {...defaultProps} eggGroups={[]} />);
    expect(screen.getByText('Egg Groups')).toBeInTheDocument();
  });

  it('handles undefined props gracefully', () => {
    render(<CreatureDetails />);
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('Gender(s)')).toBeInTheDocument();
    expect(screen.getByText('Egg Groups')).toBeInTheDocument();
  });
});