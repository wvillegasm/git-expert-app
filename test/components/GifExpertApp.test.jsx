import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GifExpertApp } from '../../src/GifExpertApp';
import { AddCategoryForm } from '../../src/components/AddCategoryForm'; // Actual component
import { GifGrid } from '../../src/components/GifGrid'; // Actual component, or mock

// Mock GifGrid to simplify testing and focus on GifExpertApp logic
vi.mock('../../src/components/GifGrid', () => ({
  GifGrid: vi.fn(({ category }) => <div data-testid="gif-grid">{`GifGrid for ${category}`}</div>),
}));

// Mock AddCategoryForm if we want to control its behavior directly,
// but for testing category addition, using the actual form is better.
// For this test, we'll use the actual AddCategoryForm.

describe('GifExpertApp component', () => {
  it('should render the main title "GifExpertApp"', () => {
    render(<GifExpertApp />);
    expect(screen.getByRole('heading', { name: /gifexpertapp/i })).toBeTruthy();
  });

  it('should render AddCategoryForm', () => {
    render(<GifExpertApp />);
    // Check if an element unique to AddCategoryForm is present, e.g., its input field
    expect(screen.getByPlaceholderText('Search gifs')).toBeTruthy();
  });

  it('should add a new category and render a GifGrid for it', async () => {
    render(<GifExpertApp />);
    const inputElement = screen.getByPlaceholderText('Search gifs');
    const formElement = inputElement.closest('form');

    fireEvent.change(inputElement, { target: { value: 'Saitama' } });
    fireEvent.submit(formElement);

    // Wait for the state update and re-render
    await waitFor(() => {
      expect(screen.getByText('GifGrid for SAITAMA')).toBeTruthy();
      expect(GifGrid).toHaveBeenCalledWith(expect.objectContaining({ category: 'SAITAMA' }), {});
    });
  });

  it('should not add the same category twice', async () => {
    render(<GifExpertApp />);
    const inputElement = screen.getByPlaceholderText('Search gifs');
    const formElement = inputElement.closest('form');

    // Add 'Goku'
    fireEvent.change(inputElement, { target: { value: 'Goku' } });
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(screen.getByText('GifGrid for GOKU')).toBeTruthy();
    });

    // Attempt to add 'Goku' again (input will be cleared, so re-type)
    fireEvent.change(inputElement, { target: { value: 'Goku' } });
    fireEvent.submit(formElement);
    
    await waitFor(() => {
      // Check how many times GifGrid was called for 'GOKU'
      // This relies on the mock being called for each unique category rendering
      const gokuGrids = screen.getAllByText('GifGrid for GOKU');
      expect(gokuGrids.length).toBe(1);
    });
    
    // Alternative: Check calls to the mocked GifGrid constructor or its instances
    // This depends on how the mock is set up and how React handles re-renders of lists.
    // A simple way is to check unique category props passed to GifGrid
    const gifGridCalls = GifGrid.mock.calls;
    const gokuCalls = gifGridCalls.filter(call => call[0].category === 'GOKU');
    expect(gokuCalls.length).toBe(1);
  });

  it('should add multiple different categories and render GifGrids for them', async () => {
    render(<GifExpertApp />);
    const inputElement = screen.getByPlaceholderText('Search gifs');
    const formElement = inputElement.closest('form');

    // Add 'Naruto'
    fireEvent.change(inputElement, { target: { value: 'Naruto' } });
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(screen.getByText('GifGrid for NARUTO')).toBeTruthy();
    });

    // Add 'Bleach' (input will be cleared, so re-type)
    fireEvent.change(inputElement, { target: { value: 'Bleach' } });
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(screen.getByText('GifGrid for BLEACH')).toBeTruthy();
    });

    expect(screen.getByText('GifGrid for NARUTO')).toBeTruthy(); // Still there
    expect(screen.getByText('GifGrid for BLEACH')).toBeTruthy(); // Newly added

    // Check calls to GifGrid
    expect(GifGrid).toHaveBeenCalledWith(expect.objectContaining({ category: 'NARUTO' }), {});
    expect(GifGrid).toHaveBeenCalledWith(expect.objectContaining({ category: 'BLEACH' }), {});
  });
});
