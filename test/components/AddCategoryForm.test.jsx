import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddCategoryForm } from '../../src/components/AddCategoryForm';

// MIN_CATEGORY_LENGTH is defined in AddCategoryForm.jsx, typically 2
const MIN_CATEGORY_LENGTH = 2;

describe('AddCategoryForm component', () => {
  it('should update input value on change', () => {
    render(<AddCategoryForm onAddCategory={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Search gifs');
    fireEvent.change(inputElement, { target: { value: 'Saitama' } });
    expect(inputElement.value).toBe('Saitama');
  });

  it('should call onAddCategory with trimmed, uppercase category on valid submission', () => {
    const mockOnAddCategory = vi.fn();
    render(<AddCategoryForm onAddCategory={mockOnAddCategory} />);
    const inputElement = screen.getByPlaceholderText('Search gifs');
    const formElement = inputElement.closest('form');

    fireEvent.change(inputElement, { target: { value: '  One Punch Man  ' } });
    fireEvent.submit(formElement);

    expect(mockOnAddCategory).toHaveBeenCalledTimes(1);
    expect(mockOnAddCategory).toHaveBeenCalledWith('ONE PUNCH MAN');
  });

  it('should clear input field after successful submission', () => {
    const mockOnAddCategory = vi.fn();
    render(<AddCategoryForm onAddCategory={mockOnAddCategory} />);
    const inputElement = screen.getByPlaceholderText('Search gifs');
    const formElement = inputElement.closest('form');

    fireEvent.change(inputElement, { target: { value: 'Okabe' } }); // Valid input
    fireEvent.submit(formElement);

    expect(inputElement.value).toBe('');
  });

  it('should not call onAddCategory if input is empty', () => {
    const mockOnAddCategory = vi.fn();
    render(<AddCategoryForm onAddCategory={mockOnAddCategory} />);
    const inputElement = screen.getByPlaceholderText('Search gifs');
    const formElement = inputElement.closest('form');

    fireEvent.change(inputElement, { target: { value: '  ' } }); // Empty after trim
    fireEvent.submit(formElement);

    expect(mockOnAddCategory).not.toHaveBeenCalled();
  });

  it('should not call onAddCategory if input is shorter than MIN_CATEGORY_LENGTH', () => {
    const mockOnAddCategory = vi.fn();
    render(<AddCategoryForm onAddCategory={mockOnAddCategory} />);
    const inputElement = screen.getByPlaceholderText('Search gifs');
    const formElement = inputElement.closest('form');

    const shortCategory = 'A'.repeat(MIN_CATEGORY_LENGTH - 1);
    fireEvent.change(inputElement, { target: { value: shortCategory } });
    fireEvent.submit(formElement);

    expect(mockOnAddCategory).not.toHaveBeenCalled();
  });

   it('should call onAddCategory if input length is exactly MIN_CATEGORY_LENGTH', () => {
    const mockOnAddCategory = vi.fn();
    render(<AddCategoryForm onAddCategory={mockOnAddCategory} />);
    const inputElement = screen.getByPlaceholderText('Search gifs');
    const formElement = inputElement.closest('form');

    const validCategory = 'Go'; // Assuming MIN_CATEGORY_LENGTH is 2
    fireEvent.change(inputElement, { target: { value: validCategory } });
    fireEvent.submit(formElement);

    expect(mockOnAddCategory).toHaveBeenCalledTimes(1);
    expect(mockOnAddCategory).toHaveBeenCalledWith('GO');
  });
});
