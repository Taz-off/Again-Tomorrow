import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test } from "vitest";
import App from "../../src/app/App";
import { useGameStore } from "../../src/game/state/store";

afterEach(() => cleanup());

function freshGame(): void {
  localStorage.clear();
  useGameStore.getState().reset();
}

describe("first screen", () => {
  test("shows 0 min and pass button, click advances counter", async () => {
    freshGame();
    render(<App />);
    expect(screen.getByText("PASSER UNE MINUTE")).toBeInTheDocument();
    const time = screen.getByTestId("lived-time");
    expect(time).toHaveTextContent("0");
    await userEvent.click(screen.getByText("PASSER UNE MINUTE"));
    expect(screen.getByTestId("lived-time")).toHaveTextContent("1");
  });

  test("clicking pass unlocks think after 3 minutes (no soft-lock)", async () => {
    freshGame();
    render(<App />);
    const pass = screen.getByText("PASSER UNE MINUTE");
    await userEvent.click(pass);
    await userEvent.click(pass);
    await userEvent.click(pass);
    expect(await screen.findByText(/Réfléchir/)).toBeInTheDocument();
  });

  test("no late-game elements at start", () => {
    freshGame();
    render(<App />);
    expect(screen.queryByText(/temps restant/i)).toBeNull();
    expect(screen.queryByText(/arrêter/i)).toBeNull();
    expect(screen.queryByText(/immortal/i)).toBeNull();
  });
});
