'use strict';

const numberButton = document.querySelectorAll("#data-number");
const operationButton = document.querySelectorAll("#data-operation");
const equalButton = document.querySelector("#data-equal");
const deleteButton = document.querySelector("#data-delete");
const allClearButton = document.querySelector("#data-allClear");
const previousText = document.querySelector("#data-previous");
const currentText = document.querySelector("#data-current");

class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
    }

    clear() {
        this.current = ""
        this.previous = ""
        this.operation = undefined 
    }

    delete() {
        this.current = ""
    }

    appendNumber(number) {
        if (this.previous === undefined) {
            this.previous = ""
        }
        if(number === "." && this.current.includes(".")) return
        this.current = this.currentText.innerText.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.current === "") return
        if (this.previous != "") {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current + this.operation.toString()
        this.current = "";
    }

    compute() {
        let result;
        const previous = parseFloat(this.previous)
        const current = parseFloat(this.current)
        if (isNaN(previous) || isNaN(current)) return
        switch(this.operation) {
            case "+" :
                result = previous + current
            break;

            case "-" :
                result = previous - current
            break;

            case "*" :
                result = previous * current
            break;

            case "÷" :
                result = previous / current
            break;
        }
        this.current = result
        this.previous = ""
        this.operation = undefined
    }

    updateDisplay() {
        this.currentText.innerText = this.current
        this.previousText.innerText = this.previous
    }
} 


const calculator = new Calculator(previousText, currentText);

numberButton.forEach(item => {
    item.addEventListener("click", () => {
        calculator.appendNumber(item.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(item => {
    item.addEventListener("click", () => {
        calculator.chooseOperation(item.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

