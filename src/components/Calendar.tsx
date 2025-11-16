import React, { useState } from "react";
import "./Calendar.css";
import { getCalendarMatrix, getMonthYearLabel } from "../utils/calendar";

export interface CalendarProps {
  date: Date;
}

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function Calendar({ date }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(date);

  const matrix = getCalendarMatrix(currentDate);
  const label = getMonthYearLabel(currentDate);
  const activeDay =
    currentDate.getMonth() === date.getMonth() &&
    currentDate.getFullYear() === date.getFullYear()
      ? date.getDate()
      : null;

  const goPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-nav">
        <button onClick={goPrevMonth} className="nav-btn">{"<"}</button>
        <div className="calendar-header">{label}</div>
        <button onClick={goNextMonth} className="nav-btn">{">"}</button>
      </div>

      <div className="calendar-grid">
        {dayNames.map((d) => (
          <div key={d} className="calendar-day-name">
            {d}
          </div>
        ))}

        {matrix.map((week, i) =>
          week.map((day, j) => (
            <div
              key={`${i}-${j}`}
              className={`calendar-cell ${
                day === activeDay ? "calendar-active" : ""
              }`}
            >
              {day ?? ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
