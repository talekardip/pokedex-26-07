// import React from 'react';
// import { render, fireEvent, screen, act } from '@testing-library/react';
// import { useRouter } from 'next/navigation';
// import Slider from './Slider';

// // Mock the next/navigation hook
// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }));

// // Mock the MultiSlider component
// jest.mock('../../atoms/Multislider/MultiSlider', () => {
//   return function MockMultiSlider({ value, onChange }) {
//     return (
//       <input
//         type="range"
//         min="0"
//         max="200"
//         value={value[0]}
//         onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
//       />
//     );
//   };
// });

// describe('Slider', () => {
//   const mockToggle = jest.fn();
//   const mockPush = jest.fn();
//   let consoleLogSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any>;

//   beforeEach(() => {
//     jest.clearAllMocks();
//     (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
//     Object.defineProperty(window, 'location', {
//       value: { search: '' },
//       writable: true,
//     });
//     consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
//   });

//   afterEach(() => {
//     consoleLogSpy.mockRestore();
//   });

//   it('renders correctly when closed', () => {
//     render(<Slider isOpen={false} onToggle={mockToggle} />);
//     expect(screen.getByText('Stats')).toBeInTheDocument();
//     expect(screen.queryByText('Apply')).not.toBeInTheDocument();
//   });

//   it('renders correctly when open', () => {
//     render(<Slider isOpen={true} onToggle={mockToggle} />);
//     expect(screen.getByText('Stats')).toBeInTheDocument();
//   });

//   it('calls onToggle when button is clicked', () => {
//     render(<Slider isOpen={false} onToggle={mockToggle} />);
//     fireEvent.click(screen.getByText('Stats'));
//     expect(mockToggle).toHaveBeenCalledTimes(1);
//   });

//   it('updates slider values when changed', () => {
//     render(<Slider isOpen={true} onToggle={mockToggle} />);
//     const hpSlider = screen.getAllByRole('slider')[0];
//     fireEvent.change(hpSlider, { target: { value: 100 } });
//     expect(hpSlider).toHaveValue('100');
//   });

//   it('initializes stats from URL parameters', () => {
//     window.location.search = '?stats=%7B%22hp%22%3A%5B50%2C150%5D%7D';
//     render(<Slider isOpen={true} onToggle={mockToggle} />);
//     const hpSlider = screen.getAllByRole('slider')[0];
//     expect(hpSlider).toHaveValue('50');
//   });

//   it('handles invalid URL parameters gracefully', () => {
//     console.error = jest.fn();
//     window.location.search = '?stats=invalid';
//     render(<Slider isOpen={true} onToggle={mockToggle} />);
//     expect(console.error).toHaveBeenCalled();
//     const hpSlider = screen.getAllByRole('slider')[0];
//     expect(hpSlider).toHaveValue('0');
//   });

//   it('renders mobile version on small screens', () => {
//     Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
//     render(<Slider isOpen={true} onToggle={mockToggle} />);
//     expect(screen.getByText('Stats')).toBeInTheDocument();
//   });

//   it('resets stats, clears modified stats, and updates URL when Reset is clicked', () => {
//     window.location.search = '?stats=%7B%22hp%22%3A%5B50%2C150%5D%7D';
//     render(<Slider isOpen={true} onToggle={mockToggle} />);

//     // First, let's verify that the initial state is set from the URL
//     const hpSlider = screen.getAllByRole('slider')[0];
//     expect(hpSlider).toHaveValue('50');

//     // Now, let's reset the stats
//     fireEvent.click(screen.getByText('reset'));

//     expect(mockPush).toHaveBeenCalledWith('?');
//     expect(consoleLogSpy).toHaveBeenCalledWith('stats reset');
//   });
// });

import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Slider from './Slider';

// Mock the next/navigation hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the MultiSlider component
jest.mock('../../atoms/Multislider/MultiSlider', () => {
  return function MockMultiSlider({ value, onChange }) {
    return (
      <input
        type="range"
        min="0"
        max="200"
        value={value[0]}
        onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
      />
    );
  };
});

describe('Slider', () => {
  const mockToggle = jest.fn();
  const mockPush = jest.fn();
  let consoleLogSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any>;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    Object.defineProperty(window, 'location', {
      value: { search: '' },
      writable: true,
    });
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('renders correctly when closed', () => {
    render(<Slider isOpen={false} onToggle={mockToggle} />);
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.queryByText('Apply')).not.toBeInTheDocument();
  });

  it('renders correctly when open', () => {
    render(<Slider isOpen={true} onToggle={mockToggle} />);
    expect(screen.getByText('Stats')).toBeInTheDocument();
  });

  it('calls onToggle when button is clicked', () => {
    render(<Slider isOpen={false} onToggle={mockToggle} />);
    fireEvent.click(screen.getByText('Stats'));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('updates slider values when changed', () => {
    render(<Slider isOpen={true} onToggle={mockToggle} />);
    const hpSlider = screen.getAllByRole('slider')[0];
    fireEvent.change(hpSlider, { target: { value: 100 } });
    expect(hpSlider).toHaveValue('100');
  });

  it('initializes stats from URL parameters', () => {
    window.location.search = '?stats=%7B%22hp%22%3A%5B50%2C150%5D%7D';
    render(<Slider isOpen={true} onToggle={mockToggle} />);
    const hpSlider = screen.getAllByRole('slider')[0];
    expect(hpSlider).toHaveValue('50');
  });

  it('handles invalid URL parameters gracefully', () => {
    console.error = jest.fn();
    window.location.search = '?stats=invalid';
    render(<Slider isOpen={true} onToggle={mockToggle} />);
    expect(console.error).toHaveBeenCalled();
    const hpSlider = screen.getAllByRole('slider')[0];
    expect(hpSlider).toHaveValue('0');
  });

  it('renders mobile version on small screens', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
    render(<Slider isOpen={true} onToggle={mockToggle} />);
    expect(screen.getByText('Stats')).toBeInTheDocument();
  });

  it('resets stats, clears modified stats, and updates URL when Reset is clicked', () => {
    window.location.search = '?stats=%7B%22hp%22%3A%5B50%2C150%5D%7D';
    render(<Slider isOpen={true} onToggle={mockToggle} />);

    // First, let's verify that the initial state is set from the URL
    const hpSlider = screen.getAllByRole('slider')[0];
    expect(hpSlider).toHaveValue('50');

    // Now, let's reset the stats
    fireEvent.click(screen.getByText('reset'));

    expect(mockPush).toHaveBeenCalledWith('?');
    expect(consoleLogSpy).toHaveBeenCalledWith('stats reset');
  });

  it('applies stats, updates URL, and closes dropdown when Apply is clicked', () => {
    render(<Slider isOpen={true} onToggle={mockToggle} />);

    // Modify some stats
    const hpSlider = screen.getAllByRole('slider')[0];
    const attackSlider = screen.getAllByRole('slider')[1];
    
    fireEvent.change(hpSlider, { target: { value: 100 } });
    fireEvent.change(attackSlider, { target: { value: 150 } });

    // Find and click the apply button
    const applyButton = screen.getByText('apply');
    fireEvent.click(applyButton);

    // Check if the URL is updated correctly
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('stats='));
    
    // Check if onToggle was called to close the dropdown
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('removes stats parameter from URL when no stats are modified', () => {
    // Set initial URL with stats
    window.location.search = '?stats=%7B%22hp%22%3A%5B50%2C150%5D%7D';
    
    render(<Slider isOpen={true} onToggle={mockToggle} />);

    // Reset stats to initial values
    const hpSlider = screen.getAllByRole('slider')[0];
    fireEvent.change(hpSlider, { target: { value: 0 } });

    // Find and click the apply button
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

  });
});