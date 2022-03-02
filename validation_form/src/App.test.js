import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("First simple test", () => {
  test("check title", () => {
    render(<App />);
    const linkElement = screen.getByText(/FORMULARZ DODAWANIA KONTRAHENTA/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("check input", () => {
    render(<App />);
    const linkElement = screen.getByPlaceholderText(/Imię/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe("Integration tests", () => {
  test("check toggle button left makes input with PESEL", () => {
    render(<App />);
    const toggleButtonLeftElement = screen.getByRole("button", {
      name: "left aligned",
    });
    fireEvent.click(toggleButtonLeftElement);
    const inputNipElement = screen.getByPlaceholderText(/PESEL/i);
    expect(inputNipElement).toBeInTheDocument();
  });

  test("check toggle button right makes input with NIP", () => {
    render(<App />);
    const toggleButtonRightElement = screen.getByRole("button", {
      name: "right aligned",
    });
    fireEvent.click(toggleButtonRightElement);
    const inputNipElement = screen.getByPlaceholderText(/NIP/i);
    expect(inputNipElement).toBeInTheDocument();
  });
});
