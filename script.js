import {
  getCurrentMonthDays,
  getNextMonthDays,
  getPrevMonthDays,
} from "./functions.js";

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

const chooseFromDate = document.querySelector("#chooseFromDate");
const chooseToDate = document.querySelector("#chooseToDate");
const resetInterval = document.querySelector(".resetInterval");

const inputDay = document.querySelector(".date-input-day");
const inputMonth = document.querySelector(".date-input-month");
const inputYear = document.querySelector(".date-input-year");

const inputIntervalDayFrom = document.querySelector(".date-input-day-from");
const inputIntervalMonthFrom = document.querySelector(".date-input-month-from");
const inputIntervalYearFrom = document.querySelector(".date-input-year-from");

const inputIntervalDayTo = document.querySelector(".date-input-day-to");
const inputIntervalMonthTo = document.querySelector(".date-input-month-to");
const inputIntervalYearTo = document.querySelector(".date-input-year-to");

let selectedDay = null;
let selectedDayFrom = null;
let selectedDayTo = null;

inputDay.value = setValueForInput(SELECTED_DATE.getDate());
inputMonth.value = setValueForInput(SELECTED_DATE.getMonth() + 1);
inputYear.value = SELECTED_DATE.getFullYear();

const renderCalendar = () => {
  localStorage.setItem(
    "from",
    `${inputIntervalDayFrom.value}-${inputIntervalMonthFrom.value}-${inputIntervalYearFrom.value}`
  );
  localStorage.setItem(
    "to",
    `${inputIntervalDayTo.value}-${inputIntervalMonthTo.value}-${inputIntervalYearTo.value}`
  );
  MONTH_DAYS.innerHTML = "";
  SELECTED_DATE.setDate(1);

  const calendarMonth = SELECTED_DATE.getMonth();
  const calendarYear = SELECTED_DATE.getFullYear();

  const lastDay = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const prevLastDay = new Date(calendarYear, calendarMonth, 0).getDate();

  const firstDayIndex = SELECTED_DATE.getDay() - 1;
  const lastDayIndex = new Date(calendarYear, calendarMonth + 1, 0).getDay();

  const nextMonthDays = 7 - lastDayIndex;

  document.querySelector(".date .year").innerHTML = SELECTED_DATE.getFullYear();
  document.querySelector(".date .month").innerHTML = MONTH[calendarMonth];

  let days = "";

  //prev month
  days += getPrevMonthDays(
    firstDayIndex,
    prevLastDay,
    calendarMonth,
    calendarYear
  );
  //current month
  days += getCurrentMonthDays(lastDay, calendarMonth, calendarYear);

  //next month

  days += getNextMonthDays(nextMonthDays, calendarMonth, calendarYear);

  MONTH_DAYS.innerHTML = days;
  MONTH_DAYS.addEventListener("click", handleDaysClick);
  MONTH_DAYS.addEventListener("contextmenu", setIntevalDate);
  resetInterval.addEventListener("click", resetIntervalDate);

  const dateIntervalFromLS_from = new Date(localStorage.getItem("from"));
  const dateIntervalFromLS_to = new Date(localStorage.getItem("to"));

  if (dateIntervalFromLS_from.getDate() && dateIntervalFromLS_to.getDate()) {
    MONTH_DAYS.querySelectorAll("div").forEach((day) => {
      const date = new Date(day.getAttribute("data-date"));
      date >= dateIntervalFromLS_from &&
        date <= dateIntervalFromLS_to &&
        day.classList.add("chooseFrom");
    });
  }

  document.querySelectorAll(".prev-month").forEach((day) => {
    day.addEventListener("click", () => {
      SELECTED_DATE.setMonth(calendarMonth - 1);
      renderCalendar();
    });
  });
  document.querySelectorAll(".next-month").forEach((day) => {
    day.addEventListener("click", () => {
      SELECTED_DATE.setMonth(calendarMonth + 1);
      renderCalendar();
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

function handleDaysClick(e) {
  //painting day it yellow
  selectedDay && selectedDay.classList.remove("selectedDay");
  e.target.classList.add("selectedDay");
  selectedDay = e.target;

  inputDay.value =
    e.target.innerText > 9 ? e.target.innerText : "0" + e.target.innerText;
  inputMonth.value = setValueForInput(SELECTED_DATE.getMonth() + 1);
  inputYear.value = SELECTED_DATE.getFullYear();
}

function setValueForInput(value) {
  return value > 9 ? value : "0" + value;
}

// function for right click
function setIntevalDate(e) {
  e.preventDefault();
  const date = e.target.getAttribute("data-date").split("-");
  if (chooseFromDate.checked) {
    //painting day and set values, for first inputs when right click
    selectedDayFrom && selectedDayFrom.classList.remove("chooseFrom");
    e.target.classList.add("chooseFrom");
    selectedDayFrom = e.target;
    inputIntervalDayFrom.value = setValueForInput(date[1]);
    inputIntervalMonthFrom.value = setValueForInput(date[0]);
    inputIntervalYearFrom.value = date[2];

    if (
      inputIntervalDayTo.value &&
      inputIntervalMonthTo.value &&
      inputIntervalYearTo.value
    ) {
      //painting calendar days in between, if second inputs full
      const from = +selectedDayFrom.getAttribute("data-date").split("-")[1];
      const to = +selectedDayTo.getAttribute("data-date").split("-")[1];
      const month = SELECTED_DATE.getMonth() + 1;
      MONTH_DAYS.querySelectorAll("div").forEach((day) => {
        let divDate = day.getAttribute("data-date").split("-");
        day.classList.remove("chooseFrom");
        if (divDate[1] >= from && divDate[1] <= to && month === +divDate[0]) {
          day.classList.add("chooseFrom");
        }
      });
    }
  } else if (chooseToDate.checked) {
    //painting day and set values, for second inputs when right click
    selectedDayTo && selectedDayTo.classList.remove("chooseTo");
    e.target.classList.add("chooseTo");
    selectedDayTo = e.target;
    inputIntervalDayTo.value = setValueForInput(date[1]);
    inputIntervalMonthTo.value = setValueForInput(date[0]);
    inputIntervalYearTo.value = date[2];

    if (
      inputIntervalDayFrom.value &&
      inputIntervalMonthFrom.value &&
      inputIntervalYearFrom.value
    ) {
      //painting calendar days in between, if first inputs full
      const from = +selectedDayFrom.getAttribute("data-date").split("-")[1];
      const to = +selectedDayTo.getAttribute("data-date").split("-")[1];
      const month = SELECTED_DATE.getMonth() + 1;
      MONTH_DAYS.querySelectorAll("div").forEach((day) => {
        let divDate = day.getAttribute("data-date").split("-");
        day.classList.remove("chooseFrom");
        if (divDate[1] >= from && divDate[1] <= to && month === +divDate[0]) {
          day.classList.add("chooseFrom");
        }
      });
    }
  }
}

function resetIntervalDate() {
  inputIntervalDayFrom.value = "";
  inputIntervalMonthFrom.value = "";
  inputIntervalYearFrom.value = "";
  inputIntervalDayTo.value = "";
  inputIntervalMonthTo.value = "";
  inputIntervalYearTo.value = "";

  MONTH_DAYS.querySelectorAll("div").forEach((day) =>
    day.classList.remove("chooseFrom", "chooseTo")
  );
}

// change date interval from inputs when entering
inputIntervalDayFrom.addEventListener("input", getIntervalDateFromInputs);
inputIntervalMonthFrom.addEventListener("input", getIntervalDateFromInputs);
inputIntervalYearFrom.addEventListener("input", (e) => {
  if (e.target.value.length < 4) return;
  getIntervalDateFromInputs();
});
inputIntervalDayTo.addEventListener("input", getIntervalDateFromInputs);
inputIntervalMonthTo.addEventListener("input", getIntervalDateFromInputs);
inputIntervalYearTo.addEventListener("input", (e) => {
  if (e.target.value.length < 4) return;
  getIntervalDateFromInputs();
});

function getIntervalDateFromInputs() {
  //check all field inputs
  if (
    inputIntervalDayFrom.value &&
    inputIntervalMonthFrom.value &&
    inputIntervalYearFrom.value &&
    inputIntervalDayTo.value &&
    inputIntervalMonthTo.value &&
    inputIntervalYearTo.value
  ) {
    //date from first input
    const from = new Date();
    from.setDate(inputIntervalDayFrom.value);
    from.setMonth(inputIntervalMonthFrom.value - 1);
    from.setYear(inputIntervalYearFrom.value);

    //date from second input
    const to = new Date();
    to.setDate(inputIntervalDayTo.value);
    to.setMonth(inputIntervalMonthTo.value - 1);
    to.setYear(inputIntervalYearTo.value);

    //painting calendar days in between
    MONTH_DAYS.querySelectorAll("div").forEach((day) => {
      let divDate = new Date(day.getAttribute("data-date"));
      day.classList.remove("chooseFrom");
      if (divDate >= from && divDate <= to) {
        day.classList.add("chooseFrom");
      }
    });
  }
}
