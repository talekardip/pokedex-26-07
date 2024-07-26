import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatureDescription from './CreatureDescription';
import { fetchPokemonDescription } from '@/app/services/pokemonServices';

jest.mock('@/app/services/pokemonServices', () => ({
  fetchPokemonDescription: jest.fn(),
}));

describe('CreatureDescription', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

//   it('renders the description and "Read More" button', async () => {
//     (fetchPokemonDescription as jest.Mock).mockResolvedValue('Test description');

//     render(<CreatureDescription id="1" />);

//     await waitFor(() => {
//       expect(screen.getByText('Test description')).toBeInTheDocument();
//       expect(screen.getByText('...Read More')).toBeInTheDocument();
//     });
//   });

//   it('shows full description when "Read More" is clicked', async () => {
//     (fetchPokemonDescription as jest.Mock).mockResolvedValue('Test description');

//     render(<CreatureDescription id="1" />);

//     await waitFor(() => {
//       fireEvent.click(screen.getByText('...Read More'));
//     });

//     expect(screen.getByText('X')).toBeInTheDocument();
//     expect(screen.getByText('Test description')).toBeInTheDocument();
//   });

//   it('hides full description when "X" is clicked', async () => {
//     (fetchPokemonDescription as jest.Mock).mockResolvedValue('Test description');

//     render(<CreatureDescription id="1" />);

//     await waitFor(() => {
//       fireEvent.click(screen.getByText('...Read More'));
//     });

//     fireEvent.click(screen.getByText('X'));

//     expect(screen.queryByText('X')).not.toBeInTheDocument();
//     expect(screen.getByText('...Read More')).toBeInTheDocument();
//   });

  it('handles error when fetching description fails', async () => {
    (fetchPokemonDescription as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
    console.error = jest.fn();

    render(<CreatureDescription id="1" />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching description:', expect.any(Error));
    });
  });

//   it('re-fetches description when id changes', async () => {
//     const mockFetch = fetchPokemonDescription as jest.Mock;
//     mockFetch.mockResolvedValueOnce('Description 1');
//     console.log('Mock set up with Description 1');

//     const { rerender } = render(<CreatureDescription key="1" id="1" />);

//     await waitFor(() => {
//       const descriptionElement = screen.getByTestId('creature-description');
//       expect(descriptionElement).toHaveTextContent('Description 1');
//     }, { timeout: 5000 });

//     console.log('Description 1 found in document');

//     mockFetch.mockResolvedValueOnce('Description 2');
//     console.log('Mock set up with Description 2');

//     rerender(<CreatureDescription key="2" id="2" />);

//     await waitFor(() => {
//       const descriptionElement = screen.getByTestId('creature-description');
//       expect(descriptionElement).toHaveTextContent('Description 2');
//     }, { timeout: 5000 });

//     console.log('Description 2 found in document');

//     expect(mockFetch).toHaveBeenCalledTimes(2);
//   });
});