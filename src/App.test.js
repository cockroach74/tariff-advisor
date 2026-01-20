import { render, screen, fireEvent } from '@testing-library/react';
import TariffAdvisor from './App';

test('renders tariff advisor title', () => {
  render(<TariffAdvisor />);
  const titleElement = screen.getByText(/IT Support Tariff Advisor/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders all form fields', () => {
  render(<TariffAdvisor />);
  expect(screen.getByText(/Number of Users/i)).toBeInTheDocument();
  expect(screen.getByText(/Remote Support Only/i)).toBeInTheDocument();
  expect(screen.getByText(/Need After-Hours Support/i)).toBeInTheDocument();
  expect(screen.getByText(/Need Priority/i)).toBeInTheDocument();
  expect(screen.getByText(/Prefer a Fixed Contract/i)).toBeInTheDocument();
  expect(screen.getByText(/Organization Type/i)).toBeInTheDocument();
});

test('renders get recommendation button', () => {
  render(<TariffAdvisor />);
  const buttonElement = screen.getByRole('button', { name: /Get Recommendation/i });
  expect(buttonElement).toBeInTheDocument();
});

test('displays recommendation after clicking button', () => {
  render(<TariffAdvisor />);

  const usersInput = screen.getByPlaceholderText(/Enter number of users/i);
  fireEvent.change(usersInput, { target: { value: '25' } });

  const button = screen.getByRole('button', { name: /Get Recommendation/i });
  fireEvent.click(button);

  expect(screen.getByText(/Recommended Tariff/i)).toBeInTheDocument();
  expect(screen.getByText(/Client Category:/i)).toBeInTheDocument();
  expect(screen.getByText(/SMB/i)).toBeInTheDocument();
});

test('categorizes SOHO correctly for small user count', () => {
  render(<TariffAdvisor />);

  const usersInput = screen.getByPlaceholderText(/Enter number of users/i);
  fireEvent.change(usersInput, { target: { value: '5' } });

  const button = screen.getByRole('button', { name: /Get Recommendation/i });
  fireEvent.click(button);

  expect(screen.getByText(/SOHO/i)).toBeInTheDocument();
});

test('categorizes Enterprise correctly for large user count', () => {
  render(<TariffAdvisor />);

  const usersInput = screen.getByPlaceholderText(/Enter number of users/i);
  fireEvent.change(usersInput, { target: { value: '500' } });

  const button = screen.getByRole('button', { name: /Get Recommendation/i });
  fireEvent.click(button);

  expect(screen.getByText(/Enterprise/i)).toBeInTheDocument();
});
