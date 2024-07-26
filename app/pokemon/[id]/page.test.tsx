/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';

import * as pokemonServices from '@/app/services/pokemonServices';
import PokemonPage from './page';

jest.mock('@/app/components/atoms/ModalCreatureDetail/CreatureDetail', () => () => <div>CreatureDetails</div>);
jest.mock('@/app/components/atoms/ModalCreatureInfo/CreatureInfo', () => () => <div>CreatureInfo</div>);
jest.mock('@/app/components/atoms/ModalStats/ModalStats', () => () => <div>Stats</div>);
jest.mock('@/app/components/molecules/EvolutionChain/EvolutionChain', () => () => <div>EvolutionChain</div>);
jest.mock('@/app/components/atoms/NavigationButtons/NavigationButtons', () => () => <div>NavigationButtons</div>);
jest.mock('@/app/components/organism/ModalHeadSection/ModalHeadSection', () => () => <div>ModalHeadSection</div>);
jest.mock('@/app/services/pokemonServices');

describe('PokemonPage', () => {
  const mockPokemonData = {
    name: 'bulbasaur',
    id: '1',
    height: 7,
    weight: 69,
    sprites: {
      other: {
        dream_world: {
          front_default: 'image_url'
        }
      }
    },
    types: [{ type: { name: 'grass' } }],
    stats: [{ base_stat: 45, stat: { name: 'hp' } }],
    abilities: [{ ability: { name: 'overgrow' } }],
  };

  const mockSpeciesData = {
    gender_rate: 1,
    egg_groups: [{ name: 'monster' }],
    evolution_chain: { url: 'evolution_url' },
  };

  beforeEach(() => {
    (pokemonServices.fetchPokemonModal as jest.Mock).mockResolvedValue(mockPokemonData);
    (pokemonServices.fetchPokemonSpecies as jest.Mock).mockResolvedValue(mockSpeciesData);
  });

  it('renders PokemonPage correctly', async () => {
    const { container } = render(await PokemonPage({ params: { id: '1' } }));
    expect(container.firstChild).toHaveClass('fixed inset-0 z-50 flex overflow-y-auto justify-center bg-PRIMARY bg-opacity-50');
    expect(screen.getByText('CreatureDetails')).toBeInTheDocument();
    expect(screen.getByText('CreatureInfo')).toBeInTheDocument();
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('EvolutionChain')).toBeInTheDocument();
    expect(screen.getByText('ModalHeadSection')).toBeInTheDocument();
  });

  it('renders NavigationButtons on small screens', async () => {
    global.innerWidth = 500; // Simulating small screen
    global.dispatchEvent(new Event('resize'));
    
    render(await PokemonPage({ params: { id: '1' } }));
    expect(screen.getByText('NavigationButtons')).toBeInTheDocument();
  });



  it('fetches and passes correct data to child components', async () => {
    render(await PokemonPage({ params: { id: '1' } }));
    expect(pokemonServices.fetchPokemonModal).toHaveBeenCalledWith('1');
    expect(pokemonServices.fetchPokemonSpecies).toHaveBeenCalledWith('1');
  });

  it('handles error in fetching Pokemon data', async () => {
    (pokemonServices.fetchPokemonModal as jest.Mock).mockRejectedValue(new Error('API error'));
    await expect(PokemonPage({ params: { id: '1' } })).rejects.toThrow('API error');
  });

  it('handles error in fetching Pokemon species data', async () => {
    (pokemonServices.fetchPokemonSpecies as jest.Mock).mockRejectedValue(new Error('Species API error'));
    await expect(PokemonPage({ params: { id: '1' } })).rejects.toThrow('Species API error');
  });

});