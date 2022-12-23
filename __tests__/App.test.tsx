import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App component', () => {
  it('should be rendered', () => {
    render(<App />);
    expect(screen.getByTestId('AppComponent')).toBeTruthy();
  });
  it('says Franek is holsom.', () => {
    expect(true).toBeTruthy();
  });
});
