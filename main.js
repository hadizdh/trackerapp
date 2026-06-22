import { num, arr, objPlain, objNodeList } from "./globalVars.js";

const timesList = arr.timesList;
const timersList = objPlain.timersList;
const data = objNodeList.data;
const action = objNodeList.action;
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

import { stateTrackerFnc } from "./stateTrck.js";

// Event Listener for Delete and Start Buttons
data.addEventListener("click", function (e) {
  let clickedRowIndex = clickedRowIndexFinderFnc(e);

  for (let i of e.target.classList) {
    switch (i) {
      //If Delete button is pressed
      case "btnDelete":
        btnDeleteFnc(clickedRowIndex);
        break;

      //If Plus button is pressed
      case "btnPlus":
        btnPlusFnc(clickedRowIndex);
        break;

      //If Minus button is pressed
      case "btnMinus":
        btnMinusFnc(clickedRowIndex);
        break;

      //If Timer button is pressed
      case "btnTimer":
        btnTimerFnc(e, clickedRowIndex);
        break;
    }
  }
});

// Event Listener for input1, 2 and 3
data.addEventListener("change", function (e) {
  const clickedRowIndex = clickedRowIndexFinderFnc(e);

  for (let i of e.target.classList) {
    switch (i) {
      case "input1":
      case "input2":
      case "input3": //either case input1 or input2
        inputClassTogglerFnc(e, clickedRowIndex);
        break;
    }
  }
});

//Event Listener for Add, Report, Delete All and Save To File
action.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "btnAdd":
      btnAddFnc();
      break;
    case "btnReport":
      stateTrackerFnc();
      break;
    case "btnDeleteAll":
      console.log("Delete All clicked!");
      break;
    case "btnSaveToFile":
      console.log("Save to File clicked!");
      break;
  }
});
