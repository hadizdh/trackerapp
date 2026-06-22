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

import { stateTrackerFnc } from "./stateTrck.js";

//Delete button: btnDelete
function btnDeleteFnc(clickedRowIndex) {
  getDataRowsFnc()[clickedRowIndex].remove(); //Get the updated data rows and remove the clicked row
  timerManagementFnc("DeleteTimer", clickedRowIndex); //Clear and delete interval from timersList
  timerManagementFnc("DeleteTime", clickedRowIndex); //delete recorded time from timesList

  //Correct activeRow's status
  //If activeRow is being deleted
  if (clickedRowIndex == num.activeRow) {
    num.activeRow = undefined;
    //If the row that is being deleted is above active row
  } else if (clickedRowIndex < num.activeRow) {
    timerManagementFnc("DeleteTimer", num.activeRow);
    num.activeRow--;
    timerManagementFnc("AddTimer", num.activeRow);
  }
}

//Plus button: btnPlus
function btnPlusFnc(clickedRowIndex) {
  if (clickedRowIndex == num.activeRow) {
    timesList[`${clickedRowIndex}`] =
      timesList[`${clickedRowIndex}`] +
      document.querySelectorAll(".input3")[clickedRowIndex].value * 60000;

    timerManagementFnc("DeleteTimer", clickedRowIndex);
    timerManagementFnc("AddTimer", clickedRowIndex);
  } else {
    timesList[`${clickedRowIndex}`] =
      timesList[`${clickedRowIndex}`] +
      document.querySelectorAll(".input3")[clickedRowIndex].value * 60000;
  }
}

//Minus button: btnMinus
function btnMinusFnc(clickedRowIndex) {
  if (clickedRowIndex == num.activeRow) {
    timesList[`${clickedRowIndex}`] =
      timesList[`${clickedRowIndex}`] -
      document.querySelectorAll(".input3")[clickedRowIndex].value * 60000;

    timerManagementFnc("DeleteTimer", clickedRowIndex);
    timerManagementFnc("AddTimer", clickedRowIndex);
  } else {
    timesList[`${clickedRowIndex}`] =
      timesList[`${clickedRowIndex}`] -
      document.querySelectorAll(".input3")[clickedRowIndex].value * 60000;
  }
}

//Timer button: btnTimer
function btnTimerFnc(e, clickedRowIndex) {
  // if the clikedRow is NOT the active row
  if (!getParentClassListFnc(e).contains("active")) {
    //Add Active and remove Inactive classes and change InnerText to Active
    getParentClassListFnc(e).remove("inactive");
    getParentClassListFnc(e).add("active");
    e.target.innerText = "Active";

    // Run an interval calling timerFnc(clickedRowIndex)
    if (!timesList[`${clickedRowIndex}`]) {
      let startTime = new Date();
      timersList[`${clickedRowIndex}`] = setInterval(() => {
        timerFnc(clickedRowIndex, startTime);
      }, 1000);
    } else {
      let currentTime = new Date();
      let startTime = new Date(
        currentTime.getTime() - timesList[`${clickedRowIndex}`]
      );
      timersList[`${clickedRowIndex}`] = setInterval(() => {
        timerFnc(clickedRowIndex, startTime);
      }, 1000);
    }

    // If there is an activeRow
    if (num.activeRow >= 0) {
      //Add Inactive and remove Active classes and change InnerText to Paused
      getDataRowsFnc()[num.activeRow].classList.remove("active");
      getDataRowsFnc()[num.activeRow].classList.add("inactive");
      getDataRowsFnc()[num.activeRow].children[4].innerText = "Paused";
      clearInterval(timersList[`${num.activeRow}`]);
    }
    // set activeRow = clickedRowIndex
    num.activeRow = clickedRowIndex;
  } else {
    //Add Inactive and remove Active classes and change InnerText to Paused
    getParentClassListFnc(e).remove("active");
    getParentClassListFnc(e).add("inactive");
    e.target.innerText = "Paused";
    // Delete the activeRow's interval from timersList
    clearInterval(timersList[`${num.activeRow}`]);
  }
}

//Add Button: Row Generator
function btnAddFnc() {
  const newRow = document.createElement("div");
  newRow.classList.add("dataRow");

  const newRowElements = [
    document.createElement("button"),
    document.createElement("input"),
    document.createElement("input"),
    document.createElement("span"),
    document.createElement("input"),
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button"),
  ];
  //Assign elements to the new row
  newRowElements[0].classList.add("btnDelete");
  newRowElements[0].innerText = "Delete";
  newRow.appendChild(newRowElements[0]);

  newRowElements[1].classList.add("input1");
  newRowElements[1].type = "text";
  newRowElements[1].setAttribute("placeholder", "Add Charge Code");
  newRow.appendChild(newRowElements[1]);

  newRowElements[2].classList.add("input2");
  newRowElements[2].type = "text";
  newRowElements[2].setAttribute("placeholder", "Add GCN");
  newRow.appendChild(newRowElements[2]);

  newRowElements[3].classList.add("timerScrn");
  newRowElements[3].innerText = "H:M:S";
  newRow.appendChild(newRowElements[3]);

  newRowElements[4].classList.add("input3");
  newRowElements[4].type = "text";
  newRowElements[4].setAttribute("placeholder", "Add/Remove Minutes");
  newRow.appendChild(newRowElements[4]);

  newRowElements[5].classList.add("btnPlus");
  newRowElements[5].innerText = "+";
  newRow.appendChild(newRowElements[5]);

  newRowElements[6].classList.add("btnMinus");
  newRowElements[6].innerText = "-";
  newRow.appendChild(newRowElements[6]);

  newRowElements[7].classList.add("btnTimer");
  newRowElements[7].innerText = "Start";
  newRow.appendChild(newRowElements[7]);

  document.querySelector("#data").appendChild(newRow);
}

export { btnDeleteFnc, btnPlusFnc, btnMinusFnc, btnTimerFnc, btnAddFnc };
