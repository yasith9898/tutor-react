import { render, screen,waitFor } from "@testing-library/react";
import { expect, test, describe,vi } from "vitest";
import { UserProfileCard } from "./UserProfileCard";
import * as handlers from "../api/handlers";

const mockProfile = {
    id: "1",
    name: "Alex Johnson",
    role: "Senior Admin & Data Analyst",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Experienced professional",
    initials: "AJ",
};

describe("UserProfileCard", () => {
    test("renders user profile information", async () => {
        vi.spyOn(handlers, "getUserProfile").mockResolvedValue(mockProfile);

        render(<UserProfileCard />);


        
        await waitFor(() => {
            expect(screen.getByText(/Alex Johnson/i)).toBeInTheDocument();
            expect(screen.getByText(/Senior Admin & Data Analyst/i)).toBeInTheDocument();
            expect(screen.getByText(/alex.johnson@example.com/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Edit Profile/i })).toBeInTheDocument();
        });
    });
});
