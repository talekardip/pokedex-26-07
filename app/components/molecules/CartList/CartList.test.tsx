import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from './CartList';
import Card from '../../atoms/Card/Card';

// Mock the Card component
jest.mock('../../atoms/Card/Card', () => jest.fn(() => <div data-testid="card">Mocked Card</div>));

describe('CardList', () => {
  const mockCardList = [
    { id: 1, name: 'Bulbasaur', image: 'https://example.com/bulbasaur.png', types: ['Grass', 'Poison'] },
    { id: 2, name: 'Ivysaur', image: 'https://example.com/ivysaur.png', types: ['Grass', 'Poison'] },
    { id: 3, name: 'Venusaur', image: 'https://example.com/venusaur.png', types: ['Grass', 'Poison'] },
  ];


  it('renders the correct number of cards', () => {
    render(<CardList cardList={mockCardList} />);
    expect(screen.getAllByTestId('card')).toHaveLength(mockCardList.length);
  });

  it('passes the correct props to each Card component', () => {
    render(<CardList cardList={mockCardList} />);
    
    mockCardList.forEach((pokemon, index) => {
      expect(Card).toHaveBeenNthCalledWith(index + 1, { pokemonData: pokemon, isTitle: true }, {});
    });
  });


  it('handles an empty card list gracefully', () => {
    render(<CardList cardList={[]} />);
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });

});