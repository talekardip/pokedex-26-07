
import { getRequest } from '../utils/request';
import { fetchPokemonAllList, fetchPokemonDescription, fetchPokemonModal, fetchPokemonSpecies, fetchPokemonWeakAgainst } from './pokemonServices';

jest.mock('../utils/request');

describe('Pokemon API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPokemonAllList', () => {
    it('should fetch pokemon list successfully', async () => {
      const mockResponse = { results: [{ name: 'bulbasaur' }] };
      (getRequest as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchPokemonAllList(0, 20);
      expect(result).toEqual(mockResponse);
      expect(getRequest).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    });

    it('should handle errors', async () => {
      const mockError = new Error('Network error');
      (getRequest as jest.Mock).mockRejectedValue(mockError);

      console.error = jest.fn();
      
      await fetchPokemonAllList(0, 20);
      expect(console.error).toHaveBeenCalledWith('Error in fetchPokemonAllList:', mockError);
    });
  });

  describe('fetchPokemonModal', () => {
    it('should fetch pokemon modal successfully', async () => {
      const mockResponse = { name: 'bulbasaur', id: '1' };
      (getRequest as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchPokemonModal('1');
      expect(result).toEqual(mockResponse);
      expect(getRequest).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1/');
    });

    it('should handle errors silently', async () => {
      const mockError = new Error('Network error');
      (getRequest as jest.Mock).mockRejectedValue(mockError);

      const result = await fetchPokemonModal('1');
      expect(result).toBeUndefined();
    });
  });

  describe('fetchPokemonSpecies', () => {
    it('should fetch pokemon species successfully', async () => {
      const mockResponse = { name: 'bulbasaur', id: '1' };
      (getRequest as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchPokemonSpecies('1');
      expect(result).toEqual(mockResponse);
      expect(getRequest).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/1');
    });

    it('should handle errors silently', async () => {
      const mockError = new Error('Network error');
      (getRequest as jest.Mock).mockRejectedValue(mockError);

      const result = await fetchPokemonSpecies('1');
      expect(result).toBeUndefined();
    });
  });

  describe('fetchPokemonWeakAgainst', () => {
    it('should fetch pokemon weaknesses successfully', async () => {
      const mockPokemonResponse = {
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
      };
      const mockTypeResponse = {
        damage_relations: {
          double_damage_from: [{ name: 'fire' }, { name: 'psychic' }]
        }
      };
      (getRequest as jest.Mock)
        .mockResolvedValueOnce(mockPokemonResponse)
        .mockResolvedValueOnce(mockTypeResponse)
        .mockResolvedValueOnce(mockTypeResponse);

      const result = await fetchPokemonWeakAgainst('bulbasaur');
      expect(result).toEqual(['fire', 'psychic']);
      expect(getRequest).toHaveBeenCalledTimes(3);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Network error');
      (getRequest as jest.Mock).mockRejectedValue(mockError);

      await expect(fetchPokemonWeakAgainst('bulbasaur')).rejects.toThrow('Network error');
    });
  });

  describe('fetchPokemonDescription', () => {
    it('should fetch pokemon description successfully', async () => {
      const mockResponse = {
        flavor_text_entries: [
          { language: { name: 'en' }, flavor_text: 'Description 1\n' },
          { language: { name: 'en' }, flavor_text: 'Description 2\f' },
          { language: { name: 'ja' }, flavor_text: 'Japanese description' },
        ]
      };
      (getRequest as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchPokemonDescription('1');
      expect(result).toBe('Description 1 Description 2');
      expect(getRequest).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/1');
    });

    it('should handle errors', async () => {
      const mockError = new Error('Network error');
      (getRequest as jest.Mock).mockRejectedValue(mockError);

      await expect(fetchPokemonDescription('1')).rejects.toThrow('Network error');
    });
  });
});