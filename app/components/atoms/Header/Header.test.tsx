/* eslint-disable react/display-name */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import Title from '../Title/Title';

// Mock the Title component
jest.mock('../title/Title', () => () => <div data-testid="mock-title">My App Title</div>);

describe('Header', () => {
    test('renders Header component', () => {
        render(<Header />);

        // Check if the Header's container div is rendered
        const headerDiv = screen.getByText(/My App Title/i).closest('div');

        // Check if the Title component is rendered
        const titleElement = screen.getByTestId('mock-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('My App Title');
    });
});