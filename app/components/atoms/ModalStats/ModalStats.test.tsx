import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stats from './ModalStats';

const mockStatsData = [
  { stat: { name: 'hp' }, base_stat: 60 },
  { stat: { name: 'attack' }, base_stat: 80 },
  { stat: { name: 'defense' }, base_stat: 70 },
  { stat: { name: 'special-attack' }, base_stat: 90 },
  { stat: { name: 'special-defense' }, base_stat: 85 },
  { stat: { name: 'speed' }, base_stat: 100 },
];

describe('Stats', () => {
  it('renders the component without crashing', () => {
    render(<Stats data={mockStatsData} />);
  });

  it('displays the correct title', () => {
    render(<Stats data={mockStatsData} />);
    expect(screen.getByText('Stats')).toBeInTheDocument();
  });



  it('displays the correct stat names and values', () => {
    render(<Stats data={mockStatsData} />);
    mockStatsData.forEach((stat) => {
      expect(screen.getByText(stat.stat.name)).toBeInTheDocument();
      expect(screen.getByText(stat.base_stat.toString())).toBeInTheDocument();
    });
  });

  

  it('renders correctly when data is empty', () => {
    render(<Stats data={[]} />);
    expect(screen.getByText('Stats')).toBeInTheDocument();
  });

  it('handles undefined data gracefully', () => {
    render(<Stats data={undefined} />);
    expect(screen.getByText('Stats')).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    render(<Stats data={mockStatsData} />);
    const container = screen.getByText('Stats').closest('div');
    expect(container).toHaveClass('p-4', 'bg-PASTELBLUE');


  });
});