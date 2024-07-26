/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import EvolutionChain from './EvolutionChain';

// Mock the ModalImageCard component
jest.mock('../../atoms/ModalImageCard/ModalImageCard', () => {
  return function MockModalImageCard({ pokemonData }) {
    return <div data-testid="mock-modal-image-card">{pokemonData.name}</div>;
  };
});

// Mock axios
jest.mock('axios');

describe('EvolutionChain', () => {
  const mockChainUrl = 'https://pokeapi.co/api/v2/evolution-chain/1/';
  const mockEvolutionChainData = {
    chain: {
      species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
      evolves_to: [
        {
          species: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
          evolves_to: [
            {
              species: { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon-species/3/' },
              evolves_to: []
            }
          ]
        }
      ]
    }
  };

  const mockPokemonData = {
    sprites: {
      other: {
        dream_world: {
          front_default: 'https://example.com/pokemon.png'
        }
      }
    },
    types: [{ type: { name: 'grass' } }],
    stats: []
  };

  beforeEach(() => {
    axios.get.mockReset();
  });


  it('fetches evolution chain data on mount', async () => {
    axios.get.mockResolvedValueOnce({ data: mockEvolutionChainData });
    axios.get.mockResolvedValue({ data: mockPokemonData });

    render(<EvolutionChain id={1} chainUrl={mockChainUrl} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(mockChainUrl);
    });
  });


  it('fetches Pokemon image data for each species', async () => {
    axios.get.mockResolvedValueOnce({ data: mockEvolutionChainData });
    axios.get.mockResolvedValue({ data: mockPokemonData });

    render(<EvolutionChain id={1} chainUrl={mockChainUrl} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1/');
      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/2/');
      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/3/');
    });
  });

  

  it('handles error when fetching evolution chain data', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'log').mockImplementation();
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<EvolutionChain id={1} chainUrl={mockChainUrl} />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  
});