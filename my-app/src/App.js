import "./App.css";
import { useState } from "react";
//top level component

function App() {
  const template = {
    name: "",
    number: 0,
    date: {
      month: 0,
      year: 0,
    },
    cvc: 0,
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
  const [error, setError] = useState({
    numError: false,
    mmError: false,
    yyError: false,
    cvcError: false,
  });
  const inputUpdate = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };
  const submission = () => {
    //
    //  TODO: add error handling here.
    //
    setComplete(true);
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
          onChange={inputUpdate}
        />
        <label for="number">CARD NUMBER</label>
        <input
          id="number"
          name="number"
          placeholder="e.g. 1234 5678 9123 0000"
          type="text"
          onChange={inputUpdate}
        />
        <p className="error">Wrong format, numbers only</p>
        <label for="month">EXP. DATE (MM/YY)</label>
        <input
          id="month"
          name="month"
          placeholder="MM"
          type="text"
          onChange={inputUpdate}
        />
        <label for="year" className="sr-only">
          year
        </label>
        <input
          id="year"
          name="year"
          placeholder="YY"
          type="text"
          onChange={inputUpdate}
        />
        <p className="error">Can't be blank</p>
        <label for="cvc">CVC</label>
        <input
          id="cvc"
          name="cvc"
          placeholder="e.g. 123"
          onChange={inputUpdate}
        />
        <p className="error">Wrong format, numbers only</p>
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
