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
    <div className="h-full">
      <div className="h-full grid grid-cols-3">
        <div
          id="backgroundImage"
          className=" h-full col-start-1 col-end-2 bg-[url('./images/bg-main-desktop.png')] bg-no-repeat bg-cover	"
        ></div>
        <div className="col-start-2 col-end-4 flex flex-col items-center justify-center">
          {complete ? (
            <ThankYou />
          ) : (
            <Form
              details={details}
              setDetails={setDetails}
              setComplete={setComplete}
              template={template}
            />
          )}
        </div>
      </div>
      <div></div>

      <div className="">
        <Card side="front" details={details} setDetails={setDetails} />
        <Card side="back" details={details} setDetails={setDetails} />
      </div>
    </div>
  );
}

//main form.
function Form({ details, setDetails, setComplete, template }) {
  //default error object used to initialize and reset error checking.

  //form state to manage whether or not error messages display.
  const [error, setError] = useState(template);
  //
  //handler functions
  //
  const updateHandler = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const submission = (event) => {
    event.preventDefault();

    if (errorHandler(setError, template, details, error)) {
      setComplete(true);
    }
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form className="h-1/2 w-25% flex flex-col">
        <label htmlFor="name">CARDHOLDER NAME</label>
        <input
          className="border h-8 rounded-lg border-gray-200 mb-5 "
          id="name"
          name="name"
          placeholder="e.g. Jane Appleseed"
          type="text"
          onChange={updateHandler}
          value={details.name}
        />
        <p className={error.name ? "error" : "hidden"}>{error.name}</p>

        <label htmlFor="number">CARD NUMBER</label>
        <input
          id="number"
          name="number"
          placeholder="e.g. 1234 5678 9123 0000"
          type="text"
          onChange={updateHandler}
          value={details.number}
        />
        <p className={error.number ? "error" : "hidden"}>{error.number}</p>

        <label htmlFor="month">EXP. DATE (MM/YY)</label>
        <div>
          <input
            id="month"
            name="month"
            placeholder="MM"
            type="text"
            onChange={updateHandler}
            value={details.month}
          />
          <label htmlFor="year" className="sr-only">
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
          <p className={error.month || error.year ? "error" : "hidden"}>
            {error.month} {error.year ? "" : error.year}
          </p>
        </div>
        <label htmlFor="cvc">CVC</label>
        <input
          id="cvc"
          name="cvc"
          placeholder="e.g. 123"
          onChange={updateHandler}
          value={details.cvc}
        />
        <p className={error.cvc ? "error" : "hidden"}>{error.cvc}</p>

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
