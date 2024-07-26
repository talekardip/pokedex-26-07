import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title', () => {
    test('renders Title component', () => {
        render(<Title />);
        
        // Check if the main container is rendered with the correct class
        const mainContainer = screen.getByText('Pokédex').closest('div');
       
        // Check if the title text is rendered correctly
        const titleText = screen.getByText('Pokédex');
        expect(titleText).toBeInTheDocument();
        expect(titleText).toHaveClass('text-indigo-950 flex items-center h-[60%] font-bold text-2xl pb-4 md:pb-0');

        // Check if the subtitle text is rendered correctly
        const subtitleText = screen.getByText('Search for any Pokemon that exists on the planet');
        expect(subtitleText).toBeInTheDocument();
        expect(subtitleText).toHaveClass('pt-4 md:pt-0 flex h-[40px] items-center md:pl-4 border-t md:border-t-0 md:border-l border-black md:mt-0 m-0 text-indigo');
    });
});