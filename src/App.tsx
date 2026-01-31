import "./App.css";

export default function App() {
  return (
    <>
      <img src="assets/images/logo.svg" alt="Splitter logo" className="logo" />

      <section className="app-card">
        <section className="app-inputs">
          <form action="submit" className="bill-input">
            <label htmlFor="bill-total"> Bill </label>
            <div className="input-wrapper">
              <input
                type="number"
                name="bill-total"
                placeholder="0"
                className="bill-total number-input"
                id="bill-total"
              />
            </div>
          </form>
          <div className="tip">
            <label htmlFor="tip-select">Select Tip %</label>

            <div className="tip-select">
              <input type="button" value="5%" />
              <input type="button" value="10%" />
              <input type="button" value="15%" />
              <input type="button" value="25%" />
              <input type="button" value="50%" />
              <input
                type="number"
                placeholder="Custom"
                name="custom-tip"
                step="1"
                className="custom-tip"
                max="99"
              />
            </div>
          </div>

          <div className="number-of-people">
            <form action="submit" className="people-input">
              <label htmlFor="number-people"> Number of People </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="number-people"
                  placeholder="0"
                  step="1"
                  className="number-input"
                  id="number-people"
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
            <p className="tip-pp">$0.00</p>
          </div>
          <div className="output">
            <div className="output-label">
              <p className="main-lb">Total</p>
              <p className="pp">/ person</p>
            </div>
            <p className="total-pp">$0.00</p>
          </div>
          <button className="reset" disabled>
            Reset
          </button>
        </section>
      </section>
    </>
  );
}
