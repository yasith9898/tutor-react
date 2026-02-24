import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, describe, beforeEach } from "vitest";
import { ToggleButton } from "@/features/dark-light-toggle";
import { ThemeProvider } from "../model/theme-provider";

const renderWithTheme = () => {
  return render(
    <ThemeProvider>
      <ToggleButton />
    </ThemeProvider>
  );
};

describe("DarkLightToggle", () => {

  // Reset DOM state before each test
  beforeEach(() => {
    document.documentElement.classList.remove("dark", "light");
    localStorage.clear();
  });

  test("renders the toggle button", () => {
    renderWithTheme();
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  test("is in light mode by default", () => {
    renderWithTheme();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  test("switches to dark mode when clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme();

    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  test("switches back to light mode on second click", async () => {
    const user = userEvent.setup();
    renderWithTheme();

    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button); // → dark
    await user.click(button); // → light

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

});
