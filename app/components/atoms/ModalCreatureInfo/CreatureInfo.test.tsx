import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CreatureInfo from './CreatureInfo';
import { fetchPokemonWeakAgainst } from '@/app/services/pokemonServices';

// Mock the imported functions
jest.mock('@/app/services/pokemonServices');
jest.mock('@/app/utils/functions', () => ({
  getColor: jest.fn((type) => {
    const colors = {
      electric: 'yellow-400',
      fire: 'red-400',
      water: 'blue-400',
      grass: 'green-400',
      default: 'gray-400'
    };
    return colors[type] || colors.default;
  }),
}));

describe('CreatureInfo', () => {
  const mockProps = {
    name: 'Pikachu',
    id: 25,
    types: [{ type: { name: 'electric' } }],
    abilities: [{ ability: { name: 'static' } }, { ability: { name: 'lightning-rod' } }],
  };

  beforeEach(() => {
    (fetchPokemonWeakAgainst as jest.Mock).mockResolvedValue(['ground']);
  });

  it('renders creature info correctly', async () => {
    const Component = await CreatureInfo(mockProps);
    render(<>{Component}</>);

    expect(screen.getByText('Abilities')).toBeInTheDocument();
    expect(screen.getByText('Types')).toBeInTheDocument();
    expect(screen.getByText('Weak Against')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('lightning-rod')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
    await screen.findByText('ground');
  });

  it('handles empty arrays for types and abilities', async () => {
    const emptyProps = { name: 'Unknown', id: 0, types: [], abilities: [] };
    const Component = await CreatureInfo(emptyProps);
    render(<>{Component}</>);

    expect(screen.getByText('Abilities')).toBeInTheDocument();
    expect(screen.getByText('Types')).toBeInTheDocument();
    expect(screen.getByText('Weak Against')).toBeInTheDocument();
    expect(screen.queryByText('static')).not.toBeInTheDocument();
    expect(screen.queryByText('electric')).not.toBeInTheDocument();
  });

  it('handles error when fetching weak against types', async () => {
    console.error = jest.fn(); // Mock console.error
    (fetchPokemonWeakAgainst as jest.Mock).mockRejectedValue(new Error('API error'));

    const Component = await CreatureInfo(mockProps);
    render(<>{Component}</>);

    expect(screen.getByText('Abilities')).toBeInTheDocument();

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching weak against types:', expect.any(Error));
    });
  });

  it('handles undefined abilities prop', async () => {
    const propsWithoutAbilities = { ...mockProps, abilities: undefined };
    const Component = await CreatureInfo(propsWithoutAbilities);
    render(<>{Component}</>);

    expect(screen.getByText('Abilities')).toBeInTheDocument();
    expect(screen.queryByText('static')).not.toBeInTheDocument();
  });

  it('renders multiple types correctly', async () => {
    const multiTypeProps = {
      ...mockProps,
      types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }]
    };
    const Component = await CreatureInfo(multiTypeProps);
    render(<>{Component}</>);

    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByText('flying')).toBeInTheDocument();
  });

  it('renders multiple weak against types', async () => {
    (fetchPokemonWeakAgainst as jest.Mock).mockResolvedValue(['water', 'rock']);
    const Component = await CreatureInfo(mockProps);
    render(<>{Component}</>);

    await screen.findByText('water');
    expect(screen.getByText('rock')).toBeInTheDocument();
  });

  it('handles undefined types prop', async () => {
    const propsWithoutTypes = { ...mockProps, types: undefined };
    const Component = await CreatureInfo(propsWithoutTypes);
    render(<>{Component}</>);

    expect(screen.getByText('Types')).toBeInTheDocument();
    expect(screen.queryByText('electric')).not.toBeInTheDocument();
  });
});