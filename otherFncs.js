import { num, arr, objPlain, objNodeList } from "./globalVars.js";

const timesList = arr.timesList;
const timersList = objPlain.timersList;
const data = objNodeList.data;
const rowElementsClasses = arr.rowElementsClasses;
// const newRowElements = objNodeList.newRowElements;

import { stateTrackerFnc } from "./stateTrck.js";

//Get latest data rows
function getDataRowsFnc() {
  const dataRows = document.querySelectorAll(".dataRow");
  return dataRows;
}

//Get parent class list
function getParentClassListFnc(e) {
  return e.target.parentElement.classList;
}

//Find index number of the clicked row
function clickedRowIndexFinderFnc(e) {
  if (rowElementsClasses.some((cls) => e.target.classList.contains(cls))) {
    const parentRow = e.target.parentElement;
    const childRows = Array.from(data.children);
    const clickedRowIndex = childRows.indexOf(parentRow);
    return clickedRowIndex;
  }
}

//Input Class Toggler
function inputClassTogglerFnc(e, clickedRowIndex) {
  if (
    num.activeRow != clickedRowIndex &&
    !getParentClassListFnc(e).contains("inactive") &&
    !getParentClassListFnc(e).contains("active")
  ) {
    getParentClassListFnc(e).toggle("inactive");
  }
}

//time counter
function timerFnc(clickedRowIndex, startTime) {
  let currentTime = new Date();
  timesList[`${clickedRowIndex}`] = currentTime - startTime;
  let eclapsedTime = Math.floor(timesList[`${clickedRowIndex}`] / 1000);

  let hr = Math.floor(eclapsedTime / 3600);
  let mn = Math.floor((eclapsedTime % 3600) / 60);
  let sc = eclapsedTime % 60;
  console.log(`TimerFunction: CLR is ${clickedRowIndex}`);
  getDataRowsFnc()[clickedRowIndex].children[3].innerText = `${hr}:${mn}:${sc}`;
}

function timerManagementFnc(operand, rowIndex) {
  switch (operand) {
    case "DeleteRow":
      getDataRowsFnc()[rowIndex].remove();
      break;
    case "DeleteTimer":
      clearInterval(timersList[`${rowIndex}`]);
      delete timersList[`${rowIndex}`];
      break;
    case "DeleteTime":
      timesList.splice(rowIndex, 1);
      break;
    case "AddTimer":
      let currentTime = new Date();
      let startTime = new Date(
        currentTime.getTime() - timesList[`${rowIndex}`]
      );
      timersList[`${rowIndex}`] = setInterval(() => {
        timerFnc(rowIndex, startTime);
      }, 1000);
      break;
  }
}

export {
  getDataRowsFnc,
  getParentClassListFnc,
  clickedRowIndexFinderFnc,
  inputClassTogglerFnc,
  timerFnc,
  timerManagementFnc,
};

// //Assign random colors
// newRow.style.backgroundColor =
//   newRow.backgroundColor = `rgb(${Math.floor(
//     Math.random() * 256
//   )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
//     Math.random() * 256
//   )})`;
