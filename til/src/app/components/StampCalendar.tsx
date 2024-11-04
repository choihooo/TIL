"use client";

import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import styles from "./StampCalendar.module.scss";

const StampCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  // 해당 월의 날짜들을 배열로 반환
  const getCalendarDays = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const daysInMonth: Dayjs[] = [];

    // 첫 주의 시작을 맞추기 위해 이전 달 며칠을 포함
    let day = startOfMonth.startOf("week");

    while (day <= endOfMonth.endOf("week")) {
      daysInMonth.push(day);
      day = day.add(1, "day");
    }

    return daysInMonth;
  };

  // 달 이동 핸들러
  const handleMonthChange = (months: number) => {
    setCurrentDate((prevDate) => prevDate.add(months, "month"));
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button type="button" onClick={() => handleMonthChange(-12)}>
          {"<<"}
        </button>
        <button type="button" onClick={() => handleMonthChange(-1)}>
          {"<"}
        </button>
        <span>{currentDate.format("YYYY년 MM월")}</span>
        <button type="button" onClick={() => handleMonthChange(1)}>
          {">"}
        </button>
        <button type="button" onClick={() => handleMonthChange(12)}>
          {">>"}
        </button>
      </div>

      <div className={styles.calendarGrid}>
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div key={index} className={styles.calendarDayName}>
            {day}
          </div>
        ))}
        {getCalendarDays().map((day, index) => (
          <div
            key={index}
            className={`${styles.calendarDay} ${
              day.isSame(currentDate, "month")
                ? styles.currentMonth
                : styles.otherMonth
            }`}
          >
            <div className={styles.date}>{day.date()}</div>
            <div className={styles.stamp}>도장</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StampCalendar;
