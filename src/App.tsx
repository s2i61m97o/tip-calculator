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
      <img src="assets/images/logo.svg" alt="Splitter logo" className="logo" />

      <section className="app-card">
        <section className="app-inputs">
          <form action="submit" className="bill-input">
            <label htmlFor="bill-total"> Bill </label>
            <div className="input-wrapper">
              <input
                className="bill-total number-input"
                placeholder="0.00"
                id="bill-total"
                inputMode="decimal"
                name="bill-total"
                onKeyDown={getBillTotal}
                pattern="[0-9]*"
                type="text"
                value={displayBill ? displayBill : undefined}
              />
            </div>
          </form>
          <div className="tip">
            <label htmlFor="tip-select">Select Tip %</label>

            <fieldset className="tip-select" id="tip-select">
              <legend>Select Tip %</legend>
              <button
                value={5}
                name="tip"
                className={tipPercent == 5 ? "selected-tip" : undefined}
                onClick={getTip}
              >
                5%
              </button>
              <button
                value={10}
                name="tip"
                className={tipPercent === 10 ? "selected-tip" : undefined}
                onClick={getTip}
              >
                10%
              </button>
              <button
                value={15}
                name="tip"
                className={tipPercent === 15 ? "selected-tip" : undefined}
                onClick={getTip}
              >
                15%
              </button>
              <button
                value={25}
                name="tip"
                className={tipPercent === 25 ? "selected-tip" : undefined}
                onClick={getTip}
              >
                25%
              </button>
              <button
                value={50}
                name="tip"
                className={tipPercent === 50 ? "selected-tip" : undefined}
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
                className="custom-tip"
                onClick={getTip}
                onChange={(e) => {
                  getTip(e);
                  setCustomTipDisplay(e);
                }}
              />
            </fieldset>
          </div>

          <div className="number-of-people">
            <form action="submit" className="people-input">
              <label htmlFor="number-people"> Number of People </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="number-people"
                  step={1}
                  value={people || ""}
                  className="number-input"
                  id="number-people"
                  onChange={getPeople}
                  placeholder="0"
                />
              </div>
            </form>
          </div>
        </section>

        <section className="app-outputs">
          <div className="output">
            <div className="output-label">
              <p className="main-lb">Tip Amount</p>
              <p className="pp">/ person</p>
            </div>
            <p className="tip-pp">
              ${perPersonTip ? (people === 0 ? "0.00" : perPersonTip) : "0.00"}
            </p>
          </div>
          <div className="output">
            <div className="output-label">
              <p className="main-lb">Total</p>
              <p className="pp">/ person</p>
            </div>
            <p className="total-pp">
              $
              {perPersonTotal
                ? people === 0
                  ? "0.00"
                  : perPersonTotal
                : "0.00"}
            </p>
          </div>
          <button
            className="reset"
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
