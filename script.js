const SELECTED_DATE = new Date();
const MONTH_DAYS = document.querySelector(".days");
const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const inputDay = document.querySelector(".date-input-day");
const inputMonth = document.querySelector(".date-input-month");
const inputYear = document.querySelector(".date-input-year");

let selectedDay = null;

inputDay.value =
  SELECTED_DATE.getDate() > 9
    ? SELECTED_DATE.getDate()
    : "0" + SELECTED_DATE.getDate();
inputMonth.value =
  SELECTED_DATE.getMonth() > 9
    ? SELECTED_DATE.getMonth() + 1
    : "0" + (SELECTED_DATE.getMonth() + 1);
inputYear.value = SELECTED_DATE.getFullYear();

const renderCalendar = () => {
  SELECTED_DATE.setDate(1);

  const lastDay = new Date(
    SELECTED_DATE.getFullYear(),
    SELECTED_DATE.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    SELECTED_DATE.getFullYear(),
    SELECTED_DATE.getMonth(),
    0
  ).getDate();

  const firstDayIndex = SELECTED_DATE.getDay() - 1;
  const lastDayIndex = new Date(
    SELECTED_DATE.getFullYear(),
    SELECTED_DATE.getMonth() + 1,
    0
  ).getDay();

  const nextMonthDays = 7 - lastDayIndex;

  document.querySelector(".date .year").innerHTML = SELECTED_DATE.getFullYear();
  document.querySelector(".date .month").innerHTML =
    MONTH[SELECTED_DATE.getMonth()];

  let days = "";
  //prev month
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-month">${prevLastDay - x + 1}</div>`;
  }

  //current month
  const today = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  for (let i = 1; i <= lastDay; i++) {
    if (
      i == today &&
      SELECTED_DATE.getMonth() == todayMonth &&
      SELECTED_DATE.getFullYear() == todayYear
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  //next month
  for (let j = 1; j <= nextMonthDays; j++) {
    days += `<div class="next-month">${j}</div>`;
  }
  MONTH_DAYS.innerHTML = days;

  document.querySelectorAll(".prev-month").forEach((day) => {
    day.addEventListener("click", () => {
      SELECTED_DATE.setMonth(SELECTED_DATE.getMonth() - 1);
      renderCalendar();
    });
  });
  document.querySelectorAll(".next-month").forEach((day) => {
    day.addEventListener("click", () => {
      SELECTED_DATE.setMonth(SELECTED_DATE.getMonth() + 1);
      renderCalendar();
    });
  });

  document.querySelectorAll(".days div").forEach((day) => {
    day.addEventListener("click", (e) => {
      console.log(e.target);
      selectedDay && selectedDay.classList.remove("selectedDay");
      e.target.classList.add("selectedDay");
      selectedDay = e.target;
      inputDay.value =
        e.target.innerText > 9 ? e.target.innerText : "0" + e.target.innerText;
      inputMonth.value =
        SELECTED_DATE.getMonth() + 1 > 9
          ? SELECTED_DATE.getMonth() + 1
          : "0" + (SELECTED_DATE.getMonth() + 1);
      inputYear.value = SELECTED_DATE.getFullYear();
    });
  });
};

document.querySelector(".prev").addEventListener("click", () => {
  SELECTED_DATE.setMonth(SELECTED_DATE.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  SELECTED_DATE.setMonth(SELECTED_DATE.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

// ========== Change year and month ==========

const dropdownMonths = document.querySelector(".dropdown__list-month");
const dropdownYears = document.querySelector(".dropdown__list-year");

document.querySelector(".month").addEventListener("click", () => {
  dropdownYears.classList.remove("dropdown__list--visible");
  dropdownMonths.classList.toggle("dropdown__list--visible");
});
document.querySelector(".year").addEventListener("click", () => {
  dropdownMonths.classList.remove("dropdown__list--visible");
  dropdownYears.classList.toggle("dropdown__list--visible");
});

document.querySelectorAll(".dropdown__item-month").forEach((month) => {
  month.addEventListener("click", (e) => {
    inputMonth.value = +e.target.getAttribute("data-date") + 1;
    SELECTED_DATE.setMonth(e.target.getAttribute("data-date"));
    renderCalendar();
  });
});
document.querySelectorAll(".dropdown__item-year").forEach((year) => {
  year.addEventListener("click", (e) => {
    inputYear.value = e.target.getAttribute("data-date");
    SELECTED_DATE.setYear(e.target.getAttribute("data-date"));
    renderCalendar();
  });
});

inputDay.addEventListener("change", (e) => {
  SELECTED_DATE.setDate(e.target.value);
});

inputMonth.addEventListener("change", (e) => {
  if (e.target.value == 0) return;
  if (e.target.value > 12) e.target.value = 12;
  if (e.target.value.length < 2) e.target.value = "0" + e.target.value;
  SELECTED_DATE.setMonth(e.target.value - 1);
  renderCalendar();
});
inputYear.addEventListener("change", (e) => {
  if (e.target.value < 2000) return;
  SELECTED_DATE.setFullYear(e.target.value);
  renderCalendar();
});

document.querySelector(".date-input-submit").addEventListener("click", () => {
  if (inputDay.value < 1 || inputMonth.value < 1 || inputYear.value < 2000) {
    return;
  }
  SELECTED_DATE.setDate(inputDay.value);
  SELECTED_DATE.setMonth(inputMonth.value - 1);
  SELECTED_DATE.setYear(inputYear.value);
  renderCalendar();
});
