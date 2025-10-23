import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders input with label', () => {
    render(<Input id="test" label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(<Input id="test" label="Required Field" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies error state styles', () => {
    render(<Input id="test" error="This field is required" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays error message', () => {
    render(<Input id="test" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies success state styles', () => {
    render(<Input id="test" success />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-green-500');
  });

  it('displays helper text', () => {
    render(<Input id="test" helperText="Enter your email" />);
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    const { container } = render(<Input id="password" type="password" />);
    
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByLabelText(/show password/i);
    await user.click(toggleButton);
    
    expect(input).toHaveAttribute('type', 'text');
  });

  it('calls onChange handler when value changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Input id="test" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input id="test" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies fullWidth class when fullWidth is true', () => {
    const { container } = render(<Input id="test" fullWidth />);
    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveClass('w-full');
  });

  it('renders with search icon for search type', () => {
    render(<Input id="search" type="search" />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('type', 'search');
  });

  it('accepts different input types', () => {
    const { rerender } = render(<Input id="test" type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input id="test" type="number" />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');

    rerender(<Input id="test" type="tel" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');

    rerender(<Input id="test" type="url" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input id="test" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Input id="test" className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('links error message with input via aria-describedby', () => {
    render(<Input id="test" error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-error');
  });

  it('links helper text with input via aria-describedby', () => {
    render(<Input id="test" helperText="Helper text" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-helper');
  });
});
