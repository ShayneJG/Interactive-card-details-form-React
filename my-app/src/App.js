import "./App.css";
import { useState } from "react";
import errorHandler from "./common/errorHandler";
import cardLogo from "./images/card-logo.svg";
import iconComplete from "./images/icon-complete.svg";

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
  //set details back to default. Done to avoid having to pass down setDetails and template
  function reset() {
    setDetails(template);
  }
  return (
    <div className="h-full w-full  md:grid md:grid-cols-3 font-display">
      <div className="h-1/3 md:h-full relative md:col-start-1 md:col-end-2  flex md:flex-col flex-col-reverse items-center bg-[url('./images/bg-main-mobile.png')] md:bg-[url('./images/bg-main-desktop.png')] bg-no-repeat bg-cover justify-center">
        <Card side="front" details={details} />
        <Card side="back" details={details} />
      </div>
      <div className="md:h-full w-full  md:col-start-2 md:pl-[10vw] lg:pl-0 md:col-end-4 flex flex-col items-center justify-center">
        {complete ? (
          <ThankYou setComplete={setComplete} reset={reset} />
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
    const name = event.target.name;
    let value = event.target.value;
    if (name === "number") {
      value = event.target.value
        .replace(/[^0-9]/gi, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }
    setDetails({ ...details, [name]: value });
  };

  const submission = (event) => {
    event.preventDefault();

    if (errorHandler(setError, template, details, error)) {
      setComplete(true);
    }
  };
  return (
    <form className="md:w-1/3 w-full mt-14 md:mt-0 p-5 md:p-0 flex flex-col">
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
        maxLength="19"
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
              className={`border h-10 align-middle mr-2 p-2 w-2/5 rounded-lg border-gray-200  focus:border-[#600594] hover:border-[#6448FE] outline-none ${
                error.month ? "border-red-500" : ""
              }`}
              maxLength="2"
            />
            <label htmlFor="year" className="sr-only">
              year
            </label>
            <input
              className={`border h-10 align-middle p-2 w-2/5 mr-2 rounded-lg border-gray-200  focus:border-[#600594] hover:border-[#6448FE] outline-none ${
                error.year ? "border-red-500" : ""
              }`}
              id="y"
              name="year"
              placeholder="YY"
              type="text"
              onChange={updateHandler}
              value={details.year}
              maxLength="2"
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
            maxLength="3"
          />
          <p className={error.cvc ? "error" : "hidden"}>{error.cvc}</p>
        </div>
      </div>

      <button className="h-12" onClick={submission}>
        Confirm
      </button>
    </form>
  );
}

//component for the cards. Will show back or front based on what side prop is passed.
function Card({ side, details }) {
  //front side of card
  if (side === "front") {
    return (
      <div
        id="cardFront"
        className="w-[275px] h-[150px] absolute left-5 -bottom-10 md:static  z-50 sm:h-[245px] sm:w-[447px]  rounded-md		 md:ml-[15vw] lg:ml-[26vw] bg-[url('./images/bg-card-front.png')] bg-no-repeat bg-cover pl-6 md:pl-8 pt-6 pr-6 lg:mb-10  drop-shadow-2xl"
      >
        <img
          src={cardLogo}
          alt="cardLogo"
          className="w-11 md:w-[84px] md:h-[47px] mb-8 md:mb-16"
        ></img>
        <div
          id="cardNumberFront"
          className="font-medium text-white  tracking-[3px] text-[15px] md:text-[27px] mb-2	md:mb-5"
        >
          {details.number ? details.number : "0000 0000 0000 0000"}
        </div>
        <div id="bottomRow" className="flex justify-between">
          <span className="font-light text-white tracking-[2px] text-[8px] md:text-[13px]">
            {details.name ? details.name.toUpperCase() : "JANE APPLESEED"}
          </span>
          <span className="font-light	 text-white tracking-[2px] text-[8px] md:text-[13px]">
            {details.month ? details.month : "00"}/
            {details.year ? details.year : "00"}
          </span>
        </div>
      </div>
    );
  }
  if (side === "back") {
    return (
      <div
        id="cardBack"
        className="w-[275px] h-[150px] absolute top-7 right-5 md:static sm:h-[245px] sm:w-[447px] rounded-md md:ml-[20vw] lg:ml-[35vw] bg-[url('./images/bg-card-back.png')] bg-no-repeat bg-cover  drop-shadow-2xl"
      >
        <span className="font-extralight	relative left-[220px]  top-[60px] md:left-[355px] md:top-[109px] text-[9px] text-white tracking-[2px] md:text-[13px]">
          {details.cvc ? details.cvc : "000"}
        </span>
      </div>
    );
  }
}

//successful submission component
function ThankYou({ setComplete, reset }) {
  return (
    <div className="flex flex-col items-center justify-center p-5 mt-10 md:p-0 w-full md:w-1/3">
      <img src={iconComplete} className="h-20 w-20 m-8" alt="card icon"></img>
      <h1 className="text-2xl	tracking-[2px]	font-medium mb-3">THANK YOU!</h1>
      <span className="text-slate-500 ">We've added your card details</span>
      <button
        className="w-full h-12"
        onClick={() => {
          setComplete(false);
          reset();
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default App;
