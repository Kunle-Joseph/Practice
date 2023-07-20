import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import React from "react";

function App() {
  const [expression, setExpression] = React.useState("");
  const [answer, setAnswer] = React.useState(0);

  const calculate = () => {
    setAnswer(eval(expression));
    setExpression((prev) => prev + "=");
  };

  const display = (symbol) => {
    setExpression((prev) => prev + symbol);
    if (expression[expression.length - 1] == "=") {
      if (/[0-9.]/.test(symbol)) {
        setExpression(symbol);
      } else {
        setExpression(answer + symbol);
      }
    }
  };
  const allClear = () => {
    setExpression("");
    setAnswer(0);
  };

  const clear = () => {
    setExpression((prev) => prev.split("").slice(0, -1).join(""));
  };

  return (
    <div className="Calculator">
      <div className="grid">
        <div onClick={allClear} className="padbutton AC tomato">
          AC
        </div>
        <div onClick={clear} className="padbutton C tomato" id="clear">
          C
        </div>
        <div className="dis">
          <input type="text" value={expression} placeholder="0" disabled id="display"/>
          <div className="total">{answer}</div>
        </div>
        <div onClick={() => display("/")} className="padbutton divide" id="divide">
          /
        </div>
        <div onClick={() => display("*")} className="padbutton multiply" id="multiply ">
          x
        </div>
        <div onClick={() => display("7")} className="padbutton seven dark-gray" id="seven">
          7
        </div>
        <div onClick={() => display("8")} className="padbutton eight dark-gray" id="eight">
          8
        </div>
        <div onClick={() => display("9")} className="padbutton nine dark-gray" id="nine">
          9
        </div>
        <div onClick={() => display("-")} className="padbutton subtract" id="subtract">
          -
        </div>
        <div onClick={() => display("4")} className="padbutton four dark-gray" id="four">
          4
        </div>
        <div onClick={() => display("5")} className="padbutton five dark-gray" id="five">
          5
        </div>
        <div onClick={() => display("6")} className="padbutton six dark-gray" id="six">
          6
        </div>
        <div onClick={() => display("+")} className="padbutton add" id="add">
          +
        </div>
        <div onClick={() => display("1")} className="padbutton one dark-gray" id="one">
          1
        </div>
        <div onClick={() => display("2")} className="padbutton two dark-gray" id="two">
          2
        </div>
        <div onClick={() => display("3")} className="padbutton three dark-gray" id="three">
          3
        </div>
        <div onClick={calculate} className="padbutton equals blue" id="equals">
          =
        </div>
        <div onClick={() => display("0")} className="padbutton zero dark-gray" id="zero">
          0
        </div>
        <div onClick={() => display(".")} className="padbutton dot dark-gray" id="decimal">
          .
        </div>
      </div>
    </div>
  );
}

export default App;
