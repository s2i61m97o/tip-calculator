const billInput = document.querySelector(".bill-input");
const tipSelectContainer = document.querySelector(".tip-select");
const tipSelectInputs = tipSelectContainer.querySelectorAll("input");
const numberPeople = document.querySelector(".people-input");
const tipOutput = document.querySelector(".tip-pp");
const totalOutput = document.querySelector(".total-pp");
const resetButton = document.querySelector(".reset");

let tipPercentValue = 0;
let billTotal = 0;
let numberOfPeople = 0;

billInput.addEventListener("input", (event) => {
  event.preventDefault();
  billTotal = Number(event.target.value);

  calcTotals(billTotal, tipPercentValue, numberOfPeople);
});

tipSelectInputs.forEach((input) => {
  if (input.type === "button") {
    input.addEventListener("click", (event) => {
      event.preventDefault();
      const eventTarget = event.target;
      tipPercentValue = Number(eventTarget.value.slice(0, -1));
      setActive(eventTarget);
      calcTotals(billTotal, tipPercentValue, numberOfPeople);
    });
  } else {
    input.addEventListener("input", (event) => {
      event.preventDefault();
      const eventTarget = event.target;
      tipPercentValue = eventTarget.value;
      removeActive(eventTarget);
      calcTotals(billTotal, tipPercentValue, numberOfPeople);
    });
  }
});

numberPeople.addEventListener("input", (event) => {
  event.preventDefault();
  numberOfPeople = event.target.value;
  calcTotals(billTotal, tipPercentValue, numberOfPeople);
});


resetButton.addEventListener("click", () => {
  formReset();
})

function calcTotals(bill, percent, tip) {
  if (bill <= 0 || percent <= 0 || tip <= 0) {
    tipOutput.textContent = "$0.00";
    totalOutput.textContent = "$0.00";
  } else {
    resetButton.removeAttribute("disabled");
    const tipTotal = calcTip(billTotal, tipPercentValue);
    const perPersonTip = tipTotal / numberOfPeople;
    const perPersonTotal = totalPerPerson(billTotal, tipTotal, numberOfPeople);
    tipOutput.textContent = "$" + perPersonTip;
    totalOutput.textContent = "$" + perPersonTotal;
  }
}

function calcTip(bill, percent) {
  return bill * (percent / 100);
}

function totalPerPerson(bill, tip, people) {
  return (bill + tip) / people;
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
  billInput.reset();
  removeActive(null);
  tipSelectInputs[5].value = "";
  numberPeople.reset();
  tipPercentValue = 0;
  billTotal = 0;
  numberOfPeople = 0;
  resetButton.setAttribute("disabled", "")
}
