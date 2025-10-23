import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, formatRelativeDate, capitalize, truncate } from './formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formats currency with default USD locale', () => {
      expect(formatCurrency(99.99)).toBe('$99.99');
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('handles decimal values correctly', () => {
      expect(formatCurrency(10.5)).toBe('$10.50');
      expect(formatCurrency(10.123)).toBe('$10.12');
    });

    it('handles large numbers', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('handles negative numbers', () => {
      expect(formatCurrency(-50)).toBe('-$50.00');
    });
  });

  describe('formatDate', () => {
    it('formats date in default format', () => {
      const date = new Date('2025-10-23T12:00:00Z');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/Oct(ober)?\s+\d{1,2},\s+2025/);
    });

    it('formats date string', () => {
      const formatted = formatDate('2025-10-23T12:00:00Z');
      const formatted2 = formatDate(formatted);
      // Just check it returns a valid date format
      expect(formatted2).toMatch(/\w+\s+\d{1,2},\s+\d{4}/);
    });
  });

  describe('formatRelativeDate', () => {
    it('formats time just now', () => {
      const now = new Date();
      expect(formatRelativeDate(now)).toBe('just now');
    });

    it('formats minutes ago', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
      expect(formatRelativeDate(date)).toBe('5 minutes ago');
    });

    it('formats hours ago', () => {
      const date = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
      expect(formatRelativeDate(date)).toBe('2 hours ago');
    });

    it('formats days ago', () => {
      const date = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
      expect(formatRelativeDate(date)).toBe('3 days ago');
    });

    it('formats old dates with full date', () => {
      const date = new Date(Date.now() - 32 * 24 * 60 * 60 * 1000); // 32 days ago
      const formatted = formatRelativeDate(date);
      expect(formatted).toMatch(/\w+\s+\d+,\s+\d{4}/);
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('tEsT')).toBe('Test');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('truncate', () => {
    it('truncates long strings', () => {
      const longText = 'This is a very long text that needs to be truncated';
      expect(truncate(longText, 20)).toBe('This is a very long ...');
    });

    it('does not truncate short strings', () => {
      const shortText = 'Short text';
      expect(truncate(shortText, 20)).toBe('Short text');
    });

    it('handles exact length', () => {
      const text = 'Exact';
      expect(truncate(text, 5)).toBe('Exact');
    });
  });
});
