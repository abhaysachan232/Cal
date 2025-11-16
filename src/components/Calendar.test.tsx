import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "./Calendar";

describe("Calendar Component", () => {

  test("renders correct month and year from date prop", () => {
    render(<Calendar date={new Date(2022, 9, 3)} />);

    // October 2022
    const header = screen.getByText("October 2022");
    expect(header).toBeInTheDocument();
  });

  test("renders all weekday headings", () => {
    render(<Calendar date={new Date(2022, 9, 3)} />);

    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    weekdays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test("highlights the correct active date", () => {
    render(<Calendar date={new Date(2022, 9, 3)} />);

    const active = screen.getByText("3");
    expect(active).toHaveClass("calendar-active");
  });

  test("renders correct number of day cells for the month", () => {
    render(<Calendar date={new Date(2022, 9, 3)} />);

    // October 2022 has 31 days
    for (let i = 1; i <= 31; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  test("does not highlight date when navigating to another month", () => {
    render(<Calendar date={new Date(2022, 9, 3)} />);

    const nextBtn = screen.getByText(">");

    // Navigate to November
    fireEvent.click(nextBtn);

    const day3 = screen.getByText("3");
    expect(day3).not.toHaveClass("calendar-active");
  });

  test("previous and next month navigation works correctly", () => {
    render(<Calendar date={new Date(2022, 9, 3)} />);

    const nextBtn = screen.getByText(">");
    const prevBtn = screen.getByText("<");

    // Go to next month → November
    fireEvent.click(nextBtn);
    expect(screen.getByText("November 2022")).toBeInTheDocument();

    // Go back to October
    fireEvent.click(prevBtn);
    expect(screen.getByText("October 2022")).toBeInTheDocument();
  });

});
