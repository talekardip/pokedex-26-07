/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalImageCard from './ModalImageCard';
import { getColor } from '@/app/utils/functions';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('ModalImageCard', () => {
  const mockPokemonData = {
    id: 1,
    name: 'Bulbasaur',
    image: 'https://example.com/bulbasaur.png',
    types: ['Grass', 'Poison'],
  };

  it('renders the card with correct data', () => {
    render(<ModalImageCard pokemonData={mockPokemonData} />);
    
    expect(screen.getByAltText('image')).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
  });

  it('applies correct color classes based on Pokemon types', () => {
    render(<ModalImageCard pokemonData={mockPokemonData} />);
    
    const cardElement = screen.getByRole('link').firstChild;
    expect(cardElement).toHaveClass('from-GRASS', 'to-POISON');
  });

  it('uses the first type for both classes if only one type is provided', () => {
    const singleTypePokemon = { ...mockPokemonData, types: ['Water'] };
    render(<ModalImageCard pokemonData={singleTypePokemon} />);
    
    const cardElement = screen.getByRole('link').firstChild;
    expect(cardElement).toHaveClass('from-WATER', 'to-WATER');
  });

  it('links to the correct Pokemon page', () => {
    render(<ModalImageCard pokemonData={mockPokemonData} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/pokemon/${mockPokemonData.id}`);
  });

  it('handles undefined pokemonData gracefully', () => {
    console.error = jest.fn(); // Mock console.error
    render(<ModalImageCard pokemonData={undefined} />);
    
    expect(console.error).toHaveBeenCalledWith('pokemonData is undefined');
    expect(screen.queryByRole('link')).toBeInTheDocument(); // The link should still be rendered
  });

  it('uses NORMAL color for unknown Pokemon types', () => {
    const unknownTypePokemon = { ...mockPokemonData, types: ['Unknown'] };
    render(<ModalImageCard pokemonData={unknownTypePokemon} />);
    
    const cardElement = screen.getByRole('link').firstChild;
    expect(cardElement).toHaveClass('from-NORMAL', 'to-NORMAL');
  });
});

describe('getColor function', () => {
  const testCases = [
    { input: 'normal', expected: 'NORMAL' },
    { input: 'ice', expected: 'ICE' },
    { input: 'fighting', expected: 'FIGHTING' },
    { input: 'flying', expected: 'FLYING' },
    { input: 'poison', expected: 'POISON' },
    { input: 'ground', expected: 'GROUND' },
    { input: 'rock', expected: 'ROCK' },
    { input: 'bug', expected: 'BUG' },
    { input: 'ghost', expected: 'GHOST' },
    { input: 'steel', expected: 'STEEL' },
    { input: 'fire', expected: 'FIRE' },
    { input: 'water', expected: 'WATER' },
    { input: 'grass', expected: 'GRASS' },
    { input: 'electric', expected: 'ELECTRIC' },
    { input: 'psychic', expected: 'PSYCHIC' },
    { input: 'dragon', expected: 'DRAGON' },
    { input: 'dark', expected: 'DARK' },
    { input: 'fairy', expected: 'FAIRY' },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`returns ${expected} for type ${input}`, () => {
      expect(getColor(input)).toBe(expected);
    });

    it(`returns ${expected} for type ${input.toUpperCase()}`, () => {
      expect(getColor(input.toUpperCase())).toBe(expected);
    });
  });





 
});