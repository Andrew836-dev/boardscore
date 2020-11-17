import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the word \'board\' twice', async () => {
  render(<App />);
  const linkElement = screen.getByText(/board.*board/i);
  expect(linkElement).toBeInTheDocument();
});
