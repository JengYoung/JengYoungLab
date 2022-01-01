import { render, screen } from "@testing-library/react";
import App from "./App";
import Logo from "./Logo";
import logoSvg from "./logo.svg";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("<Logo />", () => {
  it("renders an image", () => {
    render(<Logo />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", logoSvg);
    expect(logo).toHaveAttribute("alt", "logo");
  });
});
