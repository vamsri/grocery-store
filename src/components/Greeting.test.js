import React from 'react';
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting Component', () => {
  it('renders a greeting message based on the name prop', () => {
    render(<Greeting name="John" />);
    const greetingMessage = screen.getByText(/hello, john!/i);
    expect(greetingMessage).toBeInTheDocument();
  });
});
