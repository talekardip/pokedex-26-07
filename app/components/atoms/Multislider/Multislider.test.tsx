/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultiSlider from './MultiSlider';
import ReactSlider from 'react-slider';

// Mock the ReactSlider component
jest.mock('react-slider', () => ({
  __esModule: true,
  default: jest.fn((props) => {
    const { renderThumb, renderTrack, renderMark, ...restProps } = props;
    return (
      <div {...restProps}>
        {renderTrack({ key: 'track-0' }, { index: 0, value: [50], valueNow: 50 })}
        {renderThumb({ key: 'thumb-0' }, { index: 0, valueNow: 50 })}
        {renderMark({ key: 'mark-0' })}
      </div>
    );
  }),
}));

describe('MultiSlider', () => {


  it('renders the thumb with correct classes and value', () => {
    render(<MultiSlider orientation="horizontal" defaultValue={[50]} />);
    const thumb = screen.getByText('50');
    expect(thumb).toHaveClass(
      'aspect-square',
      'h-4',
      'w-6',
      'rounded-md',
      'mt-1',
      'bg-SECONDARY',
      'text-xs',
      'text-white',
      'flex',
      'items-center',
      'justify-center',
      'cursor-grab'
    );
  });





  it('handles vertical orientation correctly', () => {
    render(<MultiSlider orientation="vertical" defaultValue={[50]} />);

    const thumb = screen.getByText('50');
    expect(thumb).toHaveClass('aspect-square h-4 w-6 rounded-md mt-1 bg-SECONDARY text-xs text-white flex items-center justify-center cursor-grab');
  });

  it('renders multiple thumbs correctly', () => {
    ReactSlider.mockImplementation(({ renderThumb, ...props }) => (
      <div {...props}>
        {renderThumb({ key: 'thumb-0' }, { index: 0, valueNow: 25 })}
        {renderThumb({ key: 'thumb-1' }, { index: 1, valueNow: 75 })}
      </div>
    ));
    
    render(<MultiSlider orientation="horizontal" />);
    const thumbs = screen.getAllByText(/25|75/);
    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]).toHaveTextContent('25');
    expect(thumbs[1]).toHaveTextContent('75');
  });

  it('renders multiple tracks correctly', () => {
    ReactSlider.mockImplementation(({ renderTrack, ...props }) => (
      <div {...props}>
        {renderTrack({ key: 'track-0' }, { index: 0, value: [25, 75], valueNow: 25 })}
        {renderTrack({ key: 'track-1' }, { index: 1, value: [25, 75], valueNow: 75 })}
      </div>
    ));
    
    render(<MultiSlider orientation="horizontal" />);

  });
});