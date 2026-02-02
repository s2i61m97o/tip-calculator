import clsx from "clsx";
import "./App.css";
import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

export default function App() {
  const [billTotal, setBillTotal] = useState<number>(0);
  const [tipPercent, setTipPercent] = useState<number>(0);
  const [displayTip, setDisplayTip] = useState<number>(0);
  const [people, setPeople] = useState<number>(0);

  const MAX_BILL = 9999999999;
  const MAX_TIP = 100;
  const MAX_PEOPLE = 100;

  const displayBill = (billTotal / 100).toFixed(2);

  const perPersonTip: number =
    Math.round((billTotal * (tipPercent / 100)) / people) / 100;
  const perPersonTotal: number =
    Math.round(billTotal / people + perPersonTip * 100) / 100;

  const numRegex = /^\d+$/;

  function getBillTotal(e: KeyboardEvent<HTMLInputElement>) {
    const input = e.key;
    if (input === "Backspace") {
      if (billTotal <= 0.1) {
        setBillTotal(0);
      } else {
        setBillTotal((prev) => Math.floor(prev / 10));
      }
    }
    if (!numRegex.test(input)) {
      return;
    }
    const newTotal = billTotal * 10 + parseInt(input);

    if (newTotal <= MAX_BILL) {
      setBillTotal(newTotal);
    } else {
      setBillTotal(MAX_BILL);
    }
  }

  function setCustomTipDisplay(e: ChangeEvent<HTMLInputElement>) {
    const inputTip: number = parseInt(e.currentTarget.value);
    const intTip: number = Math.floor(inputTip);
    if (isNaN(inputTip)) {
      setDisplayTip(0);
    } else if (intTip <= MAX_TIP) {
      setDisplayTip(intTip);
    } else {
      setDisplayTip(MAX_TIP);
    }
  }

  function getTip(
    e:
      | MouseEvent<HTMLButtonElement>
      | ChangeEvent<HTMLInputElement>
      | MouseEvent<HTMLInputElement>,
  ) {
    e.preventDefault();
    const inputTip: number = parseInt(e.currentTarget.value);
    if (isNaN(inputTip)) {
      setTipPercent(0);
    } else if (inputTip <= MAX_TIP) {
      setTipPercent(inputTip);
    } else {
      setTipPercent(MAX_TIP);
    }
  }

  function getPeople(e: ChangeEvent<HTMLInputElement>) {
    const input: number = parseInt(e.currentTarget.value);
    const intPeople: number = Math.floor(input);
    if (isNaN(input)) {
      setPeople(0);
    } else if (intPeople <= MAX_PEOPLE) {
      setPeople(input);
    } else {
      setPeople(MAX_PEOPLE);
    }
  }

  function reset() {
    setBillTotal(0);
    setTipPercent(0);
    setPeople(0);
    setDisplayTip(0);
  }
  return (
    <>
      <img src="images/logo.svg" alt="Splitter logo" className="logo" />

      <section className="card">
        <section className="inputs">
          <form action="submit" className="inputs__form">
            <div className="inputs__bill">
              <label htmlFor="bill-total" className="label">
                Bill
              </label>
              <div className="inputs__inputWrapper">
                <input
                  className="inputs__number"
                  placeholder="0.00"
                  id="bill-total"
                  inputMode="decimal"
                  name="bill-total"
                  onKeyDown={getBillTotal}
                  pattern="[0-9]*"
                  type="text"
                  value={billTotal ? displayBill : ""}
                />
              </div>
            </div>
            <div className="inputs__tipPercent">
              <fieldset className="inputs__selectTip" id="tip-select">
                <legend className="label">Select Tip %</legend>
                <button
                  value={5}
                  name="tip"
                  className={clsx(
                    "input__button",
                    tipPercent == 5 ? "input__button-active" : undefined,
                  )}
                  onClick={getTip}
                >
                  5%
                </button>
                <button
                  value={10}
                  name="tip"
                  className={clsx(
                    "input__button",
                    tipPercent === 10 ? "input__button-active" : undefined,
                  )}
                  onClick={getTip}
                >
                  10%
                </button>
                <button
                  value={15}
                  name="tip"
                  className={clsx(
                    "input__button",
                    tipPercent === 15 ? "input__button-active" : undefined,
                  )}
                  onClick={getTip}
                >
                  15%
                </button>
                <button
                  value={25}
                  name="tip"
                  className={clsx(
                    "input__button",
                    tipPercent === 25 ? "input__button-active" : undefined,
                  )}
                  onClick={getTip}
                >
                  25%
                </button>
                <button
                  value={50}
                  name="tip"
                  className={clsx(
                    "input__button",
                    tipPercent === 50 ? "input__button-active" : undefined,
                  )}
                  onClick={getTip}
                >
                  50%
                </button>
                <input
                  type="number"
                  placeholder="Custom"
                  name="tip"
                  step={1}
                  value={displayTip || ""}
                  className={clsx("inputs__number", "inputs__customTip")}
                  onClick={getTip}
                  onChange={(e) => {
                    getTip(e);
                    setCustomTipDisplay(e);
                  }}
                />
              </fieldset>
            </div>

            <div className="inputs__people">
              <label htmlFor="number-people" className="label">
                Number of People
              </label>
              <div className="inputs__inputWrapper">
                <input
                  type="number"
                  name="number-people"
                  step={1}
                  value={people || ""}
                  className="inputs__number"
                  id="number-people"
                  onChange={getPeople}
                  placeholder="0"
                />
              </div>
            </div>
          </form>
        </section>

        <section className="outputs">
          <div className="outputs__container">
            <div className="outputs__labels">
              <p className="outputs__label-large">Tip Amount</p>
              <p className="outputs__label-sub">/ person</p>
            </div>
            <p className="outputs__data">
              ${perPersonTip ? (people === 0 ? "0.00" : perPersonTip) : "0.00"}
            </p>
          </div>
          <div className="outputs__container">
            <div className="outputs__label">
              <p className="outputs__label-large">Total</p>
              <p className="outputs__label-sub">/ person</p>
            </div>
            <p className="outputs__data">
              $
              {perPersonTotal
                ? people === 0
                  ? "0.00"
                  : perPersonTotal
                : "0.00"}
            </p>
          </div>
          <button
            className="outputs__reset"
            disabled={billTotal || tipPercent || people ? false : true}
            onClick={reset}
          >
            Reset
          </button>
        </section>
      </section>
    </>
  );
}
