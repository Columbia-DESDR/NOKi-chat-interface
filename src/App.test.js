import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page', () => {
  window.history.pushState({}, '', '/NOKi-chat-interface/');
  render(<App />);
  expect(screen.getByText(/new chat/i)).toBeInTheDocument();
});
