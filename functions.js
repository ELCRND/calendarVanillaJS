export const getPrevMonthDays = (
  quantDaysInPrevMonth,
  lastDay,
  month,
  year
) => {
  let daysInPrevMonth = "";
  if (quantDaysInPrevMonth < 0) quantDaysInPrevMonth = 6; // fix october 23, unknown reason

  for (let i = quantDaysInPrevMonth; i > 0; i--) {
    daysInPrevMonth += `<div class='prev-month' data-date='${month}-${
      lastDay - i + 1
    }-${year}'>${lastDay - i + 1}</div>`;
  }

  return daysInPrevMonth;
};

export const getCurrentMonthDays = (lastDay, month, year) => {
  const today = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  let daysInCurrentMonth = "";
  for (let i = 1; i <= lastDay; i++) {
    if (i == today && month == todayMonth && year == todayYear) {
      daysInCurrentMonth += `<div class='today' data-date='${
        month + 1
      }-${i}-${year}'>${i}</div>`;
    } else {
      daysInCurrentMonth += `<div data-date='${
        month + 1
      }-${i}-${year}'>${i}</div>`;
    }
  }

  return daysInCurrentMonth;
};

export const getNextMonthDays = (quantDaysInNextMonth, month, year) => {
  let daysInNextMonth = "";

  for (let i = 1; i <= quantDaysInNextMonth; i++) {
    daysInNextMonth += `<div class='next-month' data-date='${
      month + 2
    }-${i}-${year}'>${i}</div>`;
  }

  return daysInNextMonth;
};
