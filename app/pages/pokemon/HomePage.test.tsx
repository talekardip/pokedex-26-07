/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import * as pokemonServices from '@/app/services/pokemonServices';
import axios from 'axios';
import { generateMetadata } from './HomePage';

jest.mock('axios');
jest.mock('@/app/services/pokemonServices');
jest.mock('../../components/atoms/Header/Header', () => () => <div>Header</div>);
jest.mock('../../components/molecules/CartList/CartList', () => ({ cardList }: { cardList: any[] }) => (
  <div>CardList: {cardList.length}</div>
));
jest.mock('../../components/molecules/Filters/Filters', () => () => <div>Filters</div>);
jest.mock('@/app/components/molecules/Pagination/Pagination', () => () => <div>Pagination</div>);

describe('HomePage', () => {
  const mockPokemonData = {
    name: 'bulbasaur',
    id: 1,
    sprites: { other: { dream_world: { front_default: 'image_url' } } },
    types: [{ type: { name: 'grass' } }],
    stats: [{ base_stat: 45, stat: { name: 'hp' } }],
    abilities: [{ ability: { name: 'overgrow' } }],
    height: 7,
    weight: 69,
  };

  const mockSpeciesData = {
    gender_rate: 1,
  };

  beforeEach(() => {
    (pokemonServices.fetchPokemonAllList as jest.Mock).mockResolvedValue({
      count: 1118,
      results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
    });
    (pokemonServices.fetchPokemonSpecies as jest.Mock).mockResolvedValue(mockSpeciesData);
    (axios.get as jest.Mock).mockResolvedValue({ data: mockPokemonData });
  });

  it('fetches and renders Pokemon list correctly', async () => {
    const result = await HomePage({ page: {} });
    expect(result.props.children).toHaveLength(4); // Header, Filters, CardList, Pagination
    expect(result.props.children[2].props.cardList).toHaveLength(1); // CardList should have 1 Pokemon
  });

  it('handles pagination correctly', async () => {
    const result = await HomePage({ page: { page: '2' } });
    expect(pokemonServices.fetchPokemonAllList).toHaveBeenCalledWith(20, 20);
  });

  it('applies type filter correctly', async () => {
    const result = await HomePage({ page: { type: 'grass' } });
    expect(result.props.children[2].props.cardList).toHaveLength(1);
  });

  it('applies gender filter correctly', async () => {
    const result = await HomePage({ page: { gender: 'male,female' } });
    expect(result.props.children[2].props.cardList).toHaveLength(1);
  });

  it('applies stats filter correctly', async () => {
    const result = await HomePage({ page: { stats: '{"hp":[0,100]}' } });
    expect(result.props.children[2].props.cardList).toHaveLength(1);
  });

  it('applies search filter correctly', async () => {
    const result = await HomePage({ page: { search: 'bulba' } });
    expect(result.props.children[2].props.cardList).toHaveLength(1);
  });

  it('handles invalid stats JSON', async () => {
    console.error = jest.fn();
    await HomePage({ page: { stats: 'invalid_json' } });
    expect(console.error).toHaveBeenCalledWith('Error parsing stats:', expect.any(Error));
  });

  it('handles error in fetchPokemonList', async () => {
    (pokemonServices.fetchPokemonAllList as jest.Mock).mockRejectedValue(new Error('API error'));
    await expect(HomePage({ page: {} })).rejects.toThrow('API error');
  });

  it('generates metadata correctly', async () => {
    const metadata = await generateMetadata({ page: { page: '1' } });
    expect(metadata).toEqual({
      title: 'PokémonList #1 Details',
      description: 'List of pokemon on page no: 1',
    });
  });

  it('handles genderless Pokemon correctly', async () => {
    (pokemonServices.fetchPokemonSpecies as jest.Mock).mockResolvedValue({ gender_rate: -1 });
    const result = await HomePage({ page: {} });
    expect(result.props.children[2].props.cardList[0].gender).toEqual(['genderless']);
  });

  it('handles all male Pokemon correctly', async () => {
    (pokemonServices.fetchPokemonSpecies as jest.Mock).mockResolvedValue({ gender_rate: 0 });
    const result = await HomePage({ page: {} });
    expect(result.props.children[2].props.cardList[0].gender).toEqual(['male']);
  });

  it('handles all female Pokemon correctly', async () => {
    (pokemonServices.fetchPokemonSpecies as jest.Mock).mockResolvedValue({ gender_rate: 8 });
    const result = await HomePage({ page: {} });
    expect(result.props.children[2].props.cardList[0].gender).toEqual(['female']);
  });
});