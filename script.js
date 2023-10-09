const buttons = document.querySelectorAll(".button");
const outputNode = document.querySelector(".output");
const timeNode = document.querySelector(".current-time");
const batteryPercentageNode = document.querySelector(".battery-percentage");

let currentInput = "";
let currentOperation = "";
let previousInput = "";
let result = null;

function updateOutput() {
  outputNode.textContent = currentInput;
}

function performOperation() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (currentOperation) {
    case "+":
      currentInput = prev + current;
      break;
    case "-":
      currentInput = prev - current;
      break;
    case "*":
      currentInput = prev * current;
      break;
    case "/":
      currentInput = prev / current;
      break;
  }

  currentOperation = "";
  result = currentInput;
  currentInput = "";
}

function handleButtonClick(event) {
  const value = event.target.textContent;

  if (isNaN(parseInt(value)) && value !== ".") {
    if (value === "C") {
      currentInput = "";
      previousInput = "";
      currentOperation = "";
      result = null;
    } else if (value === "+/-") {
      currentInput = -parseFloat(currentInput);
    } else if (value === "%") {
      currentInput = parseFloat(currentInput) / 100;
    } else if (value === "=") {
      performOperation();
      currentOperation = "";
      currentInput = result;
    } else {
      if (currentInput && previousInput && currentOperation) {
        performOperation();
      }

      currentOperation = value;
      previousInput = currentInput;
      currentInput = "";
    }
  } else {
    currentInput += value;
  }

  updateOutput();
}

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

function showCurrentTimeEuropean() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let timeString = hours + ":" + minutes;
  timeNode.innerHTML = timeString;
}

showCurrentTimeEuropean();

function getBatteryPercentage() {
  if ("getBattery" in navigator) {
    navigator.getBattery().then(function (battery) {
      let batteryPercentage = Math.round(battery.level * 100);
      batteryPercentageNode.innerHTML = batteryPercentage + "%";
    });
  } else {
    console.log("Battery Status API is not supported.");
  }
}

getBatteryPercentage();
