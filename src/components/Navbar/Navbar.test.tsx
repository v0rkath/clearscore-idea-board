import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { Navbar } from ".";
import { userEvent } from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

describe("Navbar", () => {
  it("should render the top left text on the navbar", () => {
    render(<Navbar setSort={vi.fn()} />);

    expect(screen.getByText("Clearscore Idea Board")).toBeInTheDocument();
  });

  it("should render the Sort Ideas dropdown button", () => {
    render(<Navbar setSort={vi.fn()} />);

    expect(screen.getByRole("button", { expanded: false })).toBeInTheDocument();
  });

  it("should open the dropdown menu when clicked", async () => {
    const user = userEvent.setup();

    render(<Navbar setSort={vi.fn()} />);
    const sortBtn = screen.getByText("Sort Ideas");
    await user.click(sortBtn);

    await waitFor(() => {
      expect(sortBtn).toHaveAttribute("aria-expanded", "true");
    });
  });
});
