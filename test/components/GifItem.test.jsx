import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { GifItem } from "../../src/components/GifItem";

describe("GifItem Component", () => {
  const title = "Dragon Ball";
  const url = "https://example.com/goku.gif";

  test("should match snapshot", () => {
    const { container } = render(<GifItem title={title} url={url} />);
    expect(container).toMatchSnapshot();
  });

  test("should render image with correct URL and ALT attributes", () => {
    render(<GifItem title={title} url={url} />);

    const img = screen.getByRole("img");
    expect(img.src).toBe(url);
    expect(img.alt).toBe(title);
  });

  test("should render title in a paragraph", () => {
    render(<GifItem title={title} url={url} />);

    expect(screen.getByText(title)).toBeTruthy();
  });

  test("should have gif-item class", () => {
    render(<GifItem title={title} url={url} />);

    const div = screen.getByRole("img").parentElement;
    expect(div.className).toContain("gif-item");
  });
});
