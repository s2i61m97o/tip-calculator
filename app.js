// ORIGINAL SOLUTION - pre-migration to React

const billInput = document.querySelector(".bill-input");
const tipSelectContainer = document.querySelector(".tip-select");
const tipSelectInputs = tipSelectContainer.querySelectorAll("input");
const numberPeople = document.querySelector(".people-input");
const tipOutput = document.querySelector(".tip-pp");
const totalOutput = document.querySelector(".total-pp");
const resetButton = document.querySelector(".reset");

// Set starting state

let state = {billTotal: 0, tipPercentValue: 0, numberOfPeople: 0};

billInput.addEventListener("input", (e) => {
  let inputValue = e.target.value;
  // To allow max 2 decimal places:
  // Check to see if value contains decimal places
  if (inputValue.includes(".")) {
    // Split the value before and after . => returns an array
    const values = inputValue.split(".");
    // check if the value after the . is greater than 2 places
    if (values[1]?.length > 2) {
      // if so, remove access and rejoin with rest of number
      inputValue = `${values[0]}.${values[1].slice(0, 2)}`;
      // set the current value to rejoined number, allowing only 2 decimal place input in real time
      e.target.value = inputValue;
    }
  }

  state.billTotal = Number(inputValue);
  calcTotals();
});

tipSelectInputs.forEach((input) => {
  if (input.type === "button") {
    input.addEventListener("click", (event) => {
      const eventTarget = event.target;
      state.tipPercentValue = Number(eventTarget.value.slice(0, -1));
      setActive(eventTarget);
      calcTotals();
    });
  } else {
    input.addEventListener("input", (e) => {
      tipPercentValue = e.target.value;
      if (tipPercentValue.length > 2) {
        state.tipPercentValue = tipPercentValue.slice(0, 2);
        e.target.value = tipPercentValue;
      }
      removeActive(e.target);
      calcTotals();
    });
  }
});

numberPeople.addEventListener("input", (e) => {
  peopleInput = e.target.value;

  if (peopleInput.includes(".")) {
    peopleInputValues = peopleInput.split(".");
    e.target.value = peopleInputValues[0];
  }

  state.numberOfPeople = peopleInput;
  calcTotals();
});

resetButton.addEventListener("click", () => {
  formReset();
});

function calcTotals() {
  const {billTotal, tipPercentValue, numberOfPeople} = state;
  if (billTotal <= 0 || tipPercentValue <= 0 || numberOfPeople <= 0) {
    tipOutput.textContent = "$0.00";
    totalOutput.textContent = "$0.00";
  } else {
    resetButton.disabled = false;

    const tipTotal = billTotal * (tipPercentValue / 100);
    const perPersonTip = tipTotal / numberOfPeople;
    const perPersonTotal = (billTotal + tipTotal) / numberOfPeople;
    tipOutput.textContent = "$" + perPersonTip.toFixed(2);
    totalOutput.textContent = "$" + perPersonTotal.toFixed(2);
  }
}

function setActive(target) {
  target.classList.add("selected-tip");
  removeActive(target);
}

function removeActive(eventTarget) {
  tipSelectInputs.forEach((input) => {
    if (input !== eventTarget) {
      input.classList.remove("selected-tip");
    }
  });
}

function formReset() {
  resetState();
  billInput.reset();
  removeActive(null);
  tipSelectInputs[5].value = "";
  numberPeople.reset();
  resetButton.disabled = true;
}

function resetState() {
  state = {billTotal: 0, tipPercentValue: 0, numberOfPeople: 0};
  calcTotals();
}
