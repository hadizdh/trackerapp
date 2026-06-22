import { num, arr, objPlain, objNodeList } from "./globalVars.js";

const timesList = arr.timesList;
const timersList = objPlain.timersList;
const data = objNodeList.data;
const rowElementsClasses = arr.rowElementsClasses;
const newRowElements = objNodeList.newRowElements;

import {
  getDataRowsFnc,
  getParentClassListFnc,
  clickedRowIndexFinderFnc,
  inputClassTogglerFnc,
  timerFnc,
  timerManagementFnc,
} from "./otherFncs.js";

import {
  btnDeleteFnc,
  btnPlusFnc,
  btnMinusFnc,
  btnTimerFnc,
  btnAddFnc,
} from "./mainFncs.js";

//STATE MACHINE
function stateTrackerFnc() {
  let rowsCount = getDataRowsFnc().length;
  const organizedTimesList = {};
  if (timesList) {
    timesList.forEach((value, clickedRowIndex) => {
      organizedTimesList[clickedRowIndex + 1] = value;
    });
  }
  const organizedTimersList = [];
  if (timersList) {
    for (let i in timersList) {
      organizedTimersList.push(Number(i) + 1);
    }
  }

  document.querySelector(
    "#display"
  ).innerText = `Rows count: ${rowsCount}.\nActive row: #${
    num.activeRow + 1
  }.\nActive timers: ${[...organizedTimersList]}.\nTime data: ${Object.entries(
    organizedTimesList
  )} `;

  console.log(
    "ACTIVE ROW:",
    num.activeRow,
    "\n",
    "TIMES LIST:",
    timesList,
    "\n",
    "TIMERS LIST",
    timersList,
    "\n",
    "CONTAINER:",
    data,
    "\n",
    "ROW ELEMENTS CLASSES:",
    rowElementsClasses,
    "\n",
    "NEW ROW ELEMENTS:",
    newRowElements
  );
}

export { stateTrackerFnc };
