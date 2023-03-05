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
    <div className="h-full bg-[url('./images/bg-main-desktop.png')] bg-no-repeat bg-contain flex">
      <div className="h-full w-1/2">
        <Card side="front" details={details} setDetails={setDetails} />
        <Card side="back" details={details} setDetails={setDetails} />
      </div>
      <div className="h-full w-1/2 flex flex-col items-center justify-center">
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
    <div className="h-full w-full flex justify-center items-center font-display">
      <form className="w-1/2 flex flex-col">
        <label htmlFor="name">CARDHOLDER NAME</label>
        <input
          className={`border h-10 align-middle p-2 rounded-lg border-gray-200 focus:border-[#600594] hover:border-[#6448FE] outline-none ${
            error.name ? "border-red-500" : ""
          }`}
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
          className={`border h-10 align-middle p-2 rounded-lg border-gray-200  focus:border-[#600594] hover:border-[#6448FE] outline-none ${
            error.number ? "border-red-500" : ""
          }`}
          id="number"
          name="number"
          placeholder="e.g. 1234 5678 9123 0000"
          type="text"
          onChange={updateHandler}
          value={details.number}
        />
        <p className={error.number ? "error" : "hidden"}>{error.number}</p>
        <div className="flex">
          <div id="expDate" className="flex flex-col w-1/2">
            <label htmlFor="month">EXP. DATE (MM/YY)</label>
            <div>
              <input
                id="m"
                name="month"
                placeholder="MM"
                type="text"
                onChange={updateHandler}
                value={details.month}
                className={`border h-10 align-middle mr-2 p-2 w-20 rounded-lg border-gray-200  focus:border-[#600594] hover:border-[#6448FE] outline-none ${
                  error.month ? "border-red-500" : ""
                }`}
              />
              <label htmlFor="year" className="sr-only">
                year
              </label>
              <input
                className={`border h-10 align-middle p-2 w-20 mr-2 rounded-lg border-gray-200  focus:border-[#600594] hover:border-[#6448FE] outline-none ${
                  error.year ? "border-red-500" : ""
                }`}
                id="y"
                name="year"
                placeholder="YY"
                type="text"
                onChange={updateHandler}
                value={details.year}
              />
            </div>
            <p className={error.month || error.year ? "error" : "hidden"}>
              {error.month} {error.year ? "" : error.year}
            </p>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="cvc">CVC</label>
            <input
              className={`border h-10 align-middle p-2 rounded-lg border-gray-200  focus:border-[#600594] hover:border-[#6448FE] outline-none ${
                error.cvc ? "border-red-500" : ""
              }`}
              id="cvc"
              name="cvc"
              placeholder="e.g. 123"
              onChange={updateHandler}
              value={details.cvc}
            />
            <p className={error.cvc ? "error" : "hidden"}>{error.cvc}</p>
          </div>
        </div>

        <button className="h-12" onClick={submission}>
          Confirm
        </button>
      </form>
    </div>
  );
}

//component for the cards. Will show back or front based on what side prop is passed.
function Card({ side, details, setDetails }) {
  //front side of card
  if (side === "front") {
    return (
      <div className="bg-[url('./images/bg-card-front.png')] bg-no-repeat bg-contain"></div>
    );
  }
  if (side === "back") {
    return <div></div>;
  }
}

//successful submission component
function ThankYou() {}

export default App;
