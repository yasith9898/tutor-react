import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, describe, vi } from "vitest";
import { Register } from "./Register";

// mock global fetch for API call 
global.fetch = vi.fn();

describe("Register Page Integration", () => {
  test("shows error message when passwords do not match", async () => {
    const user = userEvent.setup();
    render(<Register />);
    
    //find input labels (accessibility first approach)
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /create account/i });
    
    //simulate user interaction with mismatched passwords
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmInput, 'wrongpass');
    
    //trigger validation
    await user.click(submitButton);
    
    //verify validation error
    const error = await screen.findByText(/passwords don't match/i);
    expect(error).toBeInTheDocument();
  });

  test("submits form successfully with valid data", async () => {
    const user = userEvent.setup();
    (fetch as any).mockResolvedValue({ ok: true });
    
    render(<Register />);
    
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'Password123!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123!');
    
    await user.click(screen.getByRole('button', { name: /create account/i }));

    //verify API call
    expect(fetch).toHaveBeenCalledWith('/api/auth/register', expect.any(Object));
  });
});