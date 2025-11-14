import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "@/components/products/search-bar";

describe("SearchBar", () => {
  it("renders with placeholder text", () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText("Search products...");
    expect(input).toBeInTheDocument();
  });

  it("displays the provided value", () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="laptop" onChange={mockOnChange} />);

    const input = screen.getByDisplayValue("laptop");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange with debounced value", async () => {
    jest.useFakeTimers();
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} debounceMs={300} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "phone" } });

    // Should not call immediately
    expect(mockOnChange).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("phone");
    });

    jest.useRealTimers();
  });

  it("shows clear button when input has value", () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="test" onChange={mockOnChange} />);

    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="test" onChange={mockOnChange} />);

    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  it("does not show clear button when input is empty", () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const clearButton = screen.queryByLabelText("Clear search");
    expect(clearButton).not.toBeInTheDocument();
  });
});
