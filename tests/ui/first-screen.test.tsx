import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import App from "../../src/app/App";

describe("first screen", () => {
  test("shows 0 min and pass button, click advances counter", async () => {
    localStorage.clear();
    render(<App />);
    expect(screen.getByText("PASSER UNE MINUTE")).toBeInTheDocument();
    const time = screen.getByTestId("lived-time");
    expect(time).toHaveTextContent("0");
    await userEvent.click(screen.getByText("PASSER UNE MINUTE"));
    expect(screen.getByTestId("lived-time")).toHaveTextContent("1");
  });

  test("no late-game elements at start", () => {
    localStorage.clear();
    render(<App />);
    expect(screen.queryByText(/temps restant/i)).toBeNull();
    expect(screen.queryByText(/arrêter/i)).toBeNull();
    expect(screen.queryByText(/immortal/i)).toBeNull();
  });
});
