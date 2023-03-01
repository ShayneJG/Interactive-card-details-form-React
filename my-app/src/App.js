import "./App.css";
import { useState } from "react";
import errorHandler from "./common/errorHandler";
//top level component

function App() {
  const template = {
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  };
  const [details, setDetails] = useState(template);
  const [complete, setComplete] = useState(false);

  return (
    <div>
      <div className="cardContainer">
        <Card side="front" details={details} setDetails={setDetails} />
        <Card side="back" details={details} setDetails={setDetails} />
      </div>
      <div>
        {complete ? (
          <ThankYou />
        ) : (
          <Form
            details={details}
            setDetails={setDetails}
            setComplete={setComplete}
          />
        )}
      </div>
    </div>
  );
}

//main form.
function Form({ details, setDetails, setComplete }) {
  //default error object used to initialize and reset error checking.
  const defaultError = {
    numError: "",
    mmError: "",
    yyError: "",
    cvcError: "",
  };
  //form state to manage whether or not error messages display.
  const [error, setError] = useState(defaultError);
  //
  //handler functions
  //
  const updateHandler = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const submission = (event) => {
    event.preventDefault();

    if (errorHandler(setError, defaultError, details, error)) {
      setComplete(true);
    }
  };
  return (
    <div className="form">
      <form>
        <label for="name">CARDHOLDER NAME</label>
        <input
          id="name"
          name="name"
          placeholder="e.g. Jane Appleseed"
          type="text"
          onChange={updateHandler}
          value={details.name}
        />
        <label for="number">CARD NUMBER</label>
        <input
          id="number"
          name="number"
          placeholder="e.g. 1234 5678 9123 0000"
          type="text"
          onChange={updateHandler}
          value={details.number}
        />
        <p className={error.numError ? "error" : "hidden"}>{error.numError}</p>
        <label for="month">EXP. DATE (MM/YY)</label>
        <input
          id="month"
          name="month"
          placeholder="MM"
          type="text"
          onChange={updateHandler}
          value={details.month}
        />
        <label for="year" className="sr-only">
          year
        </label>
        <input
          id="year"
          name="year"
          placeholder="YY"
          type="text"
          onChange={updateHandler}
          value={details.year}
        />
        <p className={error.mmError || error.yyError ? "error" : "hidden"}>
          Can't be blank
        </p>
        <label for="cvc">CVC</label>
        <input
          id="cvc"
          name="cvc"
          placeholder="e.g. 123"
          onChange={updateHandler}
          value={details.cvc}
        />
        <p className={error.cvcError ? "error" : "hidden"}>Can't be blank</p>

        <button onClick={submission}>Confirm</button>
      </form>
    </div>
  );
}

//component for the cards. Will show back or front based on what side prop is passed.
function Card({ side, details, setDetails }) {
  return <div></div>;
}

//successful submission component
function ThankYou() {}

export default App;
