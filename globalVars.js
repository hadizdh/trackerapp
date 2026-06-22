const num = {
  activeRow: undefined,
};

const arr = {
  timesList: [],
  rowElementsClasses: [
    "btnDelete",
    "input1",
    "input2",
    "timerScrn",
    "input3",
    "btnPlus",
    "btnMinus",
    "btnTimer",
  ],
};

const objPlain = { timersList: {} };

const objNodeList = {
  data: document.querySelector("#data"),
  action: document.querySelector("#action"),
  // newRowElements: [
  //   document.createElement("button"),
  //   document.createElement("input"),
  //   document.createElement("input"),
  //   document.createElement("span"),
  //   document.createElement("button"),
  // ],
};

// let activeRow;
// const timersList = {};
// const timesList = [];
// const data = document.querySelector("#data");
// const rowElementsClasses = [
//   "btnDelete",
//   "input1",
//   "input2",
//   "timerScrn",
//   "btnTimer",
// ];

export { num, arr, objPlain, objNodeList };
