import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ScoreColumn from "../ScoreColumn";


test("Loads and displays the passed name", async () => {
  const testName = "Andrew";
  render(<ScoreColumn name={testName} />);

  expect(screen.getByText(testName)).toBeInTheDocument();
});

test("Emojis don't cause trouble", async () => {
  const testName = "🎉😢";
  render(<ScoreColumn name={testName} />);

  expect(screen.getByText(testName)).toBeInTheDocument();
});

// test("Has a button to add")
