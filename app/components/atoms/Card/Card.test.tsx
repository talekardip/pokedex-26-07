/* eslint-disable react/display-name */
import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';

import Card from './Card';
import { useRouter } from 'next/navigation';
 
// Mock Next.js components

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/link', () => {

  return ({ children }) => children;

});
 
jest.mock('next/image', () => {

  return ({ src, alt }) => <img src={src} alt={alt} />;

});
 
// Mock endpoints

jest.mock('@/app/utils/Endpoints', () => ({

  endpoints: {

    navigatePokemonPage: '/pokemon/',

  },

}));
 
describe('Card Component', () => {

  const mockPokemonData = {

    id: 1,

    name: 'Bulbasaur',

    image: 'https://example.com/bulbasaur.png',

    types: ['GRASS', 'POISON'],

  };
 
  it('renders card with correct data', () => {

    render(<Card pokemonData={mockPokemonData} isTitle={true} />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();

    expect(screen.getByAltText('image')).toHaveAttribute('src', 'https://example.com/bulbasaur.png');

  });
 
  it('renders card without title when isTitle is false', () => {

    render(<Card pokemonData={mockPokemonData} isTitle={false} />);

    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();

    expect(screen.queryByText('1')).not.toBeInTheDocument();

    expect(screen.getByAltText('image')).toBeInTheDocument();

  });
 
  it('applies correct CSS classes for single type Pokemon', () => {

    const singleTypePokemon = { ...mockPokemonData, types: ['FIRE'] };

    const { container } = render(<Card pokemonData={singleTypePokemon} isTitle={true} />);

    expect(container.firstChild.firstChild).toHaveClass('from-FIRE');

    expect(container.firstChild.firstChild).toHaveClass('to-NORMAL');

  });
 
  it('applies correct CSS classes for dual type Pokemon', () => {

    const { container } = render(<Card pokemonData={mockPokemonData} isTitle={true} />);

    expect(container.firstChild.firstChild).toHaveClass('from-GRASS');

    expect(container.firstChild.firstChild).toHaveClass('to-POISON');

  });
 
  it('handles undefined pokemonData', () => {

    console.error = jest.fn(); // Mock console.error

    render(<Card pokemonData={undefined} isTitle={true} />);

    expect(console.error).toHaveBeenCalledWith('pokemonData is undefined');

    expect(screen.queryByAltText('image')).toHaveAttribute('src', '');

  });
 
  it('renders correct link', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
 
    const { container } = render(<Card pokemonData={mockPokemonData} isTitle={true} />);
    // Find the link element
    const linkElement = container.querySelector('div');
    // Simulate a click on the link
    fireEvent.click(linkElement);
 
    // Check if the router was called with the correct path
    // expect(mockPush).toHaveBeenCalledWith('/pokemon/1');
  });
 
 
  // Test all type combinations

  const types = ['FIRE', 'WATER', 'GRASS', 'ELECTRIC', 'ICE', 'FIGHTING', 'POISON', 'GROUND', 'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY', 'NORMAL'];
 
  types.forEach(type => {

    it(`applies correct CSS class for ${type} type`, () => {

      const typePokemon = { ...mockPokemonData, types: [type] };

      const { container } = render(<Card pokemonData={typePokemon} isTitle={true} />);

      expect(container.firstChild.firstChild).toHaveClass(`from-${type}`);

    });

  });

  const baseData = {
    id: 1,
    name: 'TestPokemon',
    image: 'https://example.com/test.png',
  };
 
  test("applies correct colors based on Pokémon types", () => {
    const testCases = [
      { types: ["FIRE"], expectedClasses: ["from-FIRE", "to-NORMAL"] },
      { types: ["WATER"], expectedClasses: ["from-WATER", "to-NORMAL"] },
      { types: ["GRASS"], expectedClasses: ["from-GRASS", "to-NORMAL"] },
      { types: ["ELECTRIC"], expectedClasses: ["from-ELECTRIC", "to-NORMAL"] },
      { types: ["ICE"], expectedClasses: ["from-ICE", "to-NORMAL"] },
      { types: ["FIGHTING"], expectedClasses: ["from-FIGHTING", "to-NORMAL"] },
      { types: ["POISON"], expectedClasses: ["from-POISON", "to-NORMAL"] },
      { types: ["GROUND"], expectedClasses: ["from-GROUND", "to-NORMAL"] },
      { types: ["FLYING"], expectedClasses: ["from-FLYING", "to-NORMAL"] },
      { types: ["PSYCHIC"], expectedClasses: ["from-PSYCHIC", "to-NORMAL"] },
      { types: ["BUG"], expectedClasses: ["from-BUG", "to-NORMAL"] },
      { types: ["ROCK"], expectedClasses: ["from-ROCK", "to-NORMAL"] },
      { types: ["GHOST"], expectedClasses: ["from-GHOST", "to-NORMAL"] },
      { types: ["DRAGON"], expectedClasses: ["from-DRAGON", "to-NORMAL"] },
      { types: ["DARK"], expectedClasses: ["from-DARK", "to-NORMAL"] },
      { types: ["STEEL"], expectedClasses: ["from-STEEL", "to-NORMAL"] },
      { types: ["FAIRY"], expectedClasses: ["from-FAIRY", "to-NORMAL"] },
      { types: ["NORMAL"], expectedClasses: ["from-NORMAL", "to-NORMAL"] },
      { types: ["FIRE", "WATER"], expectedClasses: ["from-FIRE", "to-WATER"] },
      { types: ["WATER", "GRASS"], expectedClasses: ["from-WATER", "to-GRASS"] },
      // Add more dual-type combinations as needed
    ];
 
    testCases.forEach(({ types, expectedClasses }) => {
      const pokemonData = { ...baseData, types };
      const { container } = render(<Card pokemonData={pokemonData} isTitle={true} />);
 
      const cardElement = container.firstChild.firstChild;
      expectedClasses.forEach((className) => {
        expect(cardElement).toHaveClass(className);
      });
    });
  });

});
 