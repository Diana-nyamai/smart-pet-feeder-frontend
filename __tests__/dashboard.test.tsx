import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Dashboard } from "../app/components/Dashboard";

describe("Dashboard", () => {
  it("shows the current feeding summary", () => {
    render(
      <Dashboard
        catName="Darc"
        lastFed="Just now"
        mealsToday={3}
        totalPortions={200}
        foodLevel={53}
        isFeeding={false}
        onFeedNow={vi.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: "Darcy" })).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("200g")).toBeDefined();
    expect(screen.getByText("Last fed Just now")).toBeDefined();
  });
});
