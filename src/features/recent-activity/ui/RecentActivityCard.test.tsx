import { render, screen,waitFor } from "@testing-library/react";
import { expect, test, describe,vi } from "vitest";
import { RecentActivityCard } from "./RecentActivityCard";
import * as handlers from "../api/handlers";

const mockActivities = [
    { title: "Updated profile information", date: "2024-01-15" },
    { title: "Changed password", date: "2024-01-14" },
];

describe("RecentActivityCard", () => {
    test("renders recent activities", async () => {
        vi.spyOn(handlers, "getRecentActivities").mockResolvedValue(mockActivities);

        render(<RecentActivityCard />);

        expect(screen.getByText(/Recent Activity/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Updated profile information/i)).toBeInTheDocument();
            expect(screen.getByText(/Changed password/i)).toBeInTheDocument();
        });
    });
});
