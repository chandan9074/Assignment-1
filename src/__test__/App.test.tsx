import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders router element link', () => {
  render(<App />);
  const routerElement = screen.getByTestId("app");
  expect(routerElement).toBeInTheDocument();
});