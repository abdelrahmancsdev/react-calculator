import React, { Component } from "react";
import "./styles/App.css";
import Display from "./components/Display";
export class App extends Component {
  state = {
    inputs: "",
    operation: "",
    result: "",
    solved: false,
  };
  addOperator = (op) => {
    let inputs = this.state.inputs;
    let operation = this.state.operation;
    if (!inputs.slice(-1).match(/\+|−|×|÷|-/) && inputs !== "") {
      this.setState({
        inputs: inputs + op,
        operation: operation + op,
        result: "" + op,
      });
    } else if (op === "−" && inputs.slice(-1).match(/\+|−|×|÷/)) {
      this.setState({
        inputs: inputs + "-",
        operation: operation + "-",
        result: "-",
      });
    } else if (inputs.slice(-1).match(/-/)) {
      this.setState({
        inputs: inputs.slice(0, -2) + op,
        operation: operation.slice(0, -2) + op,
        result: "" + op,
      });
    } else if (inputs.slice(-1).match(/\+|−|×|÷/)) {
      this.setState({
        inputs: inputs.slice(0, -1) + op,
        operation: operation.slice(0, -1) + op,
        result: "" + op,
      });
    }
  };
  addDecimal = () => {
    let inputs = this.state.inputs;
    let operation = this.state.operation;
    let inputsArr = inputs.split(/\+|−|×|÷/);
    let lastNum = inputsArr[inputsArr.length - 1];
    if (!this.state.solved) {
      if (lastNum === "") {
        this.setState({
          inputs: inputs + "0.",
          operation: operation + "0.",
          result: "0.",
        });
      } else if (!lastNum.includes(".")) {
        this.setState({
          inputs: inputs + ".",
          operation: operation + ".",
          result: this.state.result + ".",
        });
      }
    } else {
      this.setState({
        inputs: "0.",
        operation: "0.",
        result: "0.",
        solved: false,
      });
    }
  };
  displayResult = () => {
    let inputs = this.state.inputs;
    console.log(this.state.operation);
    if (inputs.slice(-1).match(/\+|−|×|÷/)) {
      this.setState({
        result: eval(this.state.operation.slice(0, -1)),
        solved: true,
      });
    } else if (inputs.slice(-1).match(/-/)) {
      this.setState({
        result: eval(this.state.operation.slice(0, -2)),
        solved: true,
      });
    } else {
      this.setState({
        result: eval(this.state.operation),
        solved: true,
      });
    }
  };
  componentDidMount() {
    let btns = document.querySelectorAll("button");
    btns.forEach((btn) => {
      btn.onclick = (e) => {
        switch (btn.textContent) {
          case "AC":
            this.setState({
              inputs: "",
              operation: "",
              result: "",
              solved: false,
            });
            break;
          case "":
            this.setState({
              inputs: this.state.inputs.slice(0, -1),
              operation: this.state.operation.slice(0, -1),
              solved: false,
            });
            break;
          case "+":
          case "−":
          case "×":
          case "÷":
            if (this.state.solved) {
              this.setState({
                inputs: this.state.result + btn.textContent,
                operation: this.state.result + btn.textContent,
                solved: false,
              });
            } else {
              this.addOperator(btn.textContent);
            }
            break;
          case ".":
            this.addDecimal();
            break;
          case "0":
            if (!this.state.solved) {
              if (
                this.state.inputs.split(/\+|−|×|÷/)[
                  this.state.inputs.split(/\+|−|×|÷/).length - 1
                ] !== "0"
              ) {
                this.setState({
                  inputs: this.state.inputs + "0",
                  operation: this.state.inputs + "0",
                  result: this.state.result + "0",
                });
              }
            } else {
              this.setState({
                inputs: "0",
                operation: "0",
                result: "0",
                solved: false,
              });
            }
            break;
          case "=":
            this.displayResult();
            break;
          default:
            let inputsArr = this.state.inputs.split(/\+|−|×|÷/);
            let lastNum = inputsArr[inputsArr.length - 1];
            if (
              this.state.inputs.slice(-1).match(/\+|−|×|÷/) ||
              this.state.solved
            ) {
              this.setState({
                result: "" + btn.textContent,
                solved: false,
              });
            } else {
              this.setState({
                result: this.state.result + btn.textContent,
              });
            }
            if (!this.state.solved) {
              if (lastNum !== "0") {
                this.setState({
                  inputs: this.state.inputs + btn.textContent,
                  operation: this.state.operation + btn.textContent,
                });
              } else {
                this.setState({
                  inputs: this.state.inputs.slice(0, -1) + btn.textContent,
                  operation:
                    this.state.operation.slice(0, -1) + btn.textContent,
                  result: this.state.result.slice(0, -1) + btn.textContent,
                });
              }
            } else {
              this.setState({
                inputs: "" + btn.textContent,
                operation: "" + btn.textContent,
                solved: false,
              });
            }
            break;
        }
      };
    });
  }
  componentDidUpdate(previousProps, previousState) {
    if (this.state.inputs !== previousState.inputs) {
      let validOp = {
        "×": "*",
        "÷": "/",
        "−": "-",
        "--": "+",
      };
      let operation = this.state.operation;
      this.setState({
        operation: operation.replace(/−|×|÷|--/gi, function (op) {
          return validOp[op];
        }),
      });
    }
  }
  render() {
    return (
      <div id="app">
        <h1 id="app-name">React Calculator</h1>
        <Display
          inputs={this.state.inputs}
          result={this.state.result}
          solved={this.state.solved}
        />
        <div id="buttons">
          <button id="clear">AC</button>
          <button id="delete">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
          </button>
          <button id="divide">÷</button>
          <button id="seven">7</button>
          <button id="eight">8</button>
          <button id="nine">9</button>
          <button id="multiply">×</button>
          <button id="four">4</button>
          <button id="five">5</button>
          <button id="six">6</button>
          <button id="subtract">−</button>
          <button id="one">1</button>
          <button id="two">2</button>
          <button id="three">3</button>
          <button id="add">+</button>
          <button id="zero">0</button>
          <button id="decimal">.</button>
          <button id="equals">=</button>
        </div>
      </div>
    );
  }
}

export default App;
