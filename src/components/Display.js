import React from "react";

function Display(props) {
  return (
    <div id="operation">
      <div id="inputs">
        {props.inputs}
        {props.solved ? "=" : ""}
      </div>
      <div id="display" className="result">
        {props.result ? props.result : "0"}
      </div>
    </div>
  );
}

export default Display;
