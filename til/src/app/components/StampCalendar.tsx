"use client";

import React, { useState } from "react";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";
import styles from "./StampCalendar.module.scss";

const StampCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const getCalendarDays = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const daysInMonth: Dayjs[] = [];

    let day = startOfMonth.startOf("week");
    while (day <= endOfMonth.endOf("week")) {
      daysInMonth.push(day);
      day = day.add(1, "day");
    }
    return daysInMonth;
  };

  const handleMonthChange = (months: number) => {
    setCurrentDate((prevDate) => prevDate.add(months, "month"));
  };

  return (
    <div className={styles["calendar__container"]}>
      <div>
        <div className={styles["calendar__header"]}>
          <button
            className={styles["calendar__button"]}
            type="button"
            onClick={() => handleMonthChange(-12)}
          >
            {"<<"}
          </button>
          <button
            className={styles["calendar__button"]}
            type="button"
            onClick={() => handleMonthChange(-1)}
          >
            {"<"}
          </button>
          <span className={styles["calendar__year-month"]}>
            {currentDate.format("YYYY년 MM월")}
          </span>
          <button
            className={styles["calendar__button"]}
            type="button"
            onClick={() => handleMonthChange(1)}
          >
            {">"}
          </button>
          <button
            className={styles["calendar__button"]}
            type="button"
            onClick={() => handleMonthChange(12)}
          >
            {">>"}
          </button>
        </div>
        <div className={styles["calendar__grid-wrapper"]}>
          <div className={styles["calendar__grid"]}>
            {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
              <div key={index} className={styles["calendar__day-name"]}>
                {day}
              </div>
            ))}
            {getCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`${styles["calendar__day-cell"]} ${
                  day.isSame(currentDate, "month")
                    ? styles["calendar__day-cell--current-month"]
                    : styles["calendar__day-cell--other-month"]
                }`}
              >
                <div className={styles["calendar__date"]}>{day.date()}</div>
                <div className={styles["calendar__stamp"]}>
                  <Image src="/stamp.svg" alt="스탬프" width={30} height={30} />
                </div>
              </div>
            ))}
          </div>

          <div className={styles["calendar__right-column"]}>
            <div>주차 정보</div>
            {["1주", "2주", "3주", "4주", "이번달"].map((label, index) => (
              <div key={index} className={styles["calendar__day-cell"]}>
                <div className={styles["calendar__date"]}>{label}</div>
                <div className={styles["calendar__stamp"]}>
                  <Image src="/stamp.svg" alt="스탬프" width={30} height={30} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampCalendar;
