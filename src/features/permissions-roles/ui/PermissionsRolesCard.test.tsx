import { render, screen,waitFor } from "@testing-library/react";
import { expect, test, describe,vi } from "vitest";
import { PermissionsRolesCard } from "./PermissionsRolesCard";
import * as handlers from "../api/handlers";

const mockRoles = [
    { name: "Administrator", permissions: ["Full Access"] },
    { name: "Data Analyst", permissions: ["View Reports"] },
];

describe("PermissionsRolesCard", () => {
    test("renders roles and permissions", async () => {
        vi.spyOn(handlers, "getPermissionsRoles").mockResolvedValue(mockRoles);

    render(<PermissionsRolesCard />);

        expect(screen.getByText(/Permissions & Roles/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Administrator/i)).toBeInTheDocument();
            expect(screen.getByText(/Data Analyst/i)).toBeInTheDocument();
            expect(screen.getByText(/Full Access/i)).toBeInTheDocument();
        });

    });
});
