import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const { container } = render(<Card>Default Card</Card>);
    expect(container.firstChild).toBeTruthy();
  });

  it('calls onClick handler when clicked and clickable', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    
    await user.click(screen.getByText('Clickable Card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('accepts custom className', () => {
    const { container } = render(<Card className="custom-class">Custom Card</Card>);
    expect(container.firstChild).toBeTruthy();
  });
});

describe('CardHeader Component', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header Content</CardHeader>);
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<CardHeader className="custom-header">Header</CardHeader>);
    const header = screen.getByText('Header').closest('div');
    expect(header?.className).toContain('custom-header');
  });
});

describe('CardBody Component', () => {
  it('renders children correctly', () => {
    render(<CardBody>Body Content</CardBody>);
    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<CardBody className="custom-body">Body</CardBody>);
    const body = screen.getByText('Body').closest('div');
    expect(body?.className).toContain('custom-body');
  });
});

describe('CardFooter Component', () => {
  it('renders children correctly', () => {
    render(<CardFooter>Footer Content</CardFooter>);
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<CardFooter className="custom-footer">Footer</CardFooter>);
    const footer = screen.getByText('Footer').closest('div');
    expect(footer?.className).toContain('custom-footer');
  });
});

describe('Card Composition', () => {
  it('renders all sub-components together', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
