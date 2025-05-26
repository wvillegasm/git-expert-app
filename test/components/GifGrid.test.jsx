import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { GifGrid } from "../../src/components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

// Mock the custom hook
vi.mock("../../src/hooks/useFetchGifs");

describe("GifGrid Component", () => {
  const category = "Dragon Ball";

  test("should show loading message initially", () => {
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid category={category} />);
    expect(screen.getByText("Loading...")).toBeTruthy();
    expect(screen.getByText(category)).toBeTruthy();
  });

  test("should show items when images are loaded", () => {
    const gifs = [
      {
        id: "ABC123",
        title: "Goku",
        url: "https://localhost/goku.gif",
      },
      {
        id: "DEF456",
        title: "Vegeta",
        url: "https://localhost/vegeta.gif",
      },
    ];

    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: false,
    });

    render(<GifGrid category={category} />);

    expect(screen.getByText(category)).toBeTruthy();
    expect(screen.getAllByRole("img").length).toBe(2);
    expect(screen.queryByText("Loading...")).toBeNull();
  });

  test("should call useFetchGifs with correct category", () => {
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid category={category} />);
    expect(useFetchGifs).toHaveBeenCalledWith(category);
  });

  test("should match snapshot", () => {
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });

    const { container } = render(<GifGrid category={category} />);
    expect(container).toMatchSnapshot();
  });

  test("should have gif-grid class on container", () => {
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: false,
    });

    render(<GifGrid category={category} />);
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe(
      category
    );
    expect(document.querySelector(".gif-grid")).toBeTruthy();
  });
});
