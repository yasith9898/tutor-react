import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { AccountSettingsCard } from "./AccountSettingsCard";

describe("AccountSettingsCard", () => {
    test("renders account settings sections", async () => {
        render(<AccountSettingsCard />);

        expect(screen.getByText("Account Settings")).toBeInTheDocument();
        const generalElement = await screen.findByText("General");
        expect(generalElement).toBeInTheDocument();
        expect(screen.getByText("Timezone")).toBeInTheDocument();
        expect(screen.getByText("Language")).toBeInTheDocument();
        expect(screen.getByText("Notifications")).toBeInTheDocument();
    });
});
