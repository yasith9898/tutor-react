import { render, screen ,waitFor} from "@testing-library/react";
import { expect, test, describe,vi } from "vitest";
import { AccountSettingsCard } from "./AccountSettingsCard";
import * as handlers from "../api/handlers";

const mockAccountSettings = {
    general: [
        { label: "Timezone", value: "UTC" },
        { label: "Language", value: "English" },
    ],
    notifications: [
        { label: "Email Notifications", description: "Receive email updates", value: "On" },
        { label: "Push Notifications", description: "Receive push notifications", value: "On" },
    ],
};

describe("AccountSettingsCard", () => {
    test("renders account settings sections", async () => {
        vi.spyOn(handlers, "getAccountSettings").mockResolvedValue(mockAccountSettings);

        render(<AccountSettingsCard />);

        expect(screen.getByText("Account Settings")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("General")).toBeInTheDocument();
            expect(screen.getByText("Timezone")).toBeInTheDocument();
            expect(screen.getByText("Language")).toBeInTheDocument();
            expect(screen.getByText("Notifications")).toBeInTheDocument();
        });
    });
});
