"use strict"

import { Determenstic } from "./determenstic.js";
import { Stochastic } from "./stochastic.js"
// determensticQueue();




// INITIALIZE THE GLOBAL VARIABLES
let queueType,
    queueObject,
    period = 100,
    arrivalTime = 0,
    serviceTime = 0,
    capacity = 0;



// CHART TIME LINE
const labels = [];

// ARRAY OF CHART VALUES
let values = [];

// DOM ELEMENTS

let closeMainModalBtn = document.querySelector('#close-main-modal-btn');
let submitMainModalBtn = document.querySelector('#submit-main-modal-btn');
let serviceTimeInput = document.querySelector('#serving-time-input');
let serviceTimeLabel = document.querySelector('#serving-time-label');
let arrivalTimeInput = document.querySelector('#arriving-time-input');
let arrivalTimeLabel = document.querySelector('#arriving-time-label');
let mainModalLabel = document.querySelector('#main-modal-label');
let hiddenTypeInput = document.querySelector('#hidden-type-input');
let deterministicBtn = document.querySelector('#deterministic-btn');
let capacityLabel = document.querySelector('#capacity-label');
let capacityInput = document.querySelector('#capacity-input');
let NtBtn = document.querySelector('#Nt-btn');
let resultContainer = document.querySelector('#result-container');
let resultHeader = document.querySelector('#result');
let ntInput = document.querySelector('#num-customer');
let ntOutput = document.querySelector('#nt-result');
let wqInput = document.querySelector('#waiting-time');
let wqOutput = document.querySelector('#wq-result');
let tiOutput = document.querySelector('#ti-output');
let outputContainer = document.querySelector('#output-container');
let mm1Btn = document.querySelector('#mm1-btn');
let mm1kBtn = document.querySelector('#mm1k-btn');
let mmcBtn = document.querySelector('#mmc-btn');
let mmckBtn = document.querySelector('#mmck-btn');
let serverContainer = document.querySelector('#server-container');
let serverInput = document.querySelector('#servers-input');
let servingTimeContiner = document.querySelector('#serving-time-container');
let arrivalTimeContiner = document.querySelector('#arrival-time-container');
let capacityContiner = document.querySelector('#capacity-container');


// HIDE OUTPUT CONTAINER 
hideElement(outputContainer)
// HIDE SERVER INPUT
serverContainer.style.display = "none";

// CONTROL DOM FUNCTIONS
function hideElement(element) {
    element.style.display = "none";
}

function showElement(element) {
    element.style.display = "inline";
}

function clearInput(inputElement) {
    inputElement.value = "";
}

function getInputValue(inputElement) {
    return (inputElement.value);
}

// function OneInputModal(labelText, hiddenValue) {
//     hiddenTypeInput.value = hiddenValue;
//     hideElement(serviceTimeInput);
//     hideElement(serviceTimeLabel);
//     hideElement(capacityInput);
//     hideElement(capacityLabel);
//     let originalText = arrivalTimeLabel.value;
//     arrivalTimeLabel.value = labelText;
// }



// SET A DETERMINISTIC QUEUE ON CLICK ON THE DETERMINISTIC BTN
// SET THE HIDDEN VALUE 
deterministicBtn.addEventListener('click', () => {
    hiddenTypeInput.value = 'setDeterministic';
    showElement(capacityContiner);
    hideElement(serverContainer)
    showElement(arrivalTimeContiner);
    showElement(servingTimeContiner);
    setQueue();
})

// MM1 EVENT
mm1Btn.addEventListener('click', () => {
    hiddenTypeInput.value = 'mm1';
    hideElement(capacityContiner);
    hideElement(serverContainer)
    showElement(arrivalTimeContiner);
    showElement(servingTimeContiner);
    setQueue();
})

// MM1K EVENT
mm1kBtn.addEventListener('click', () => {
    hiddenTypeInput.value = 'mm1k';
    hideElement(capacityContiner);
    showElement(serverContainer)
    showElement(arrivalTimeContiner);
    showElement(servingTimeContiner);
    setQueue();
})

mmcBtn.addEventListener('click', () => {
    hiddenTypeInput.value = 'mmc';
    hideElement(capacityContiner);
    showElement(serverContainer)
    showElement(arrivalTimeContiner);
    showElement(servingTimeContiner);
    setQueue();
})


mmckBtn.addEventListener('click', () => {
    hiddenTypeInput.value = 'mmck';
    showElement(capacityContiner);
    showElement(serverContainer)
    showElement(arrivalTimeContiner);
    showElement(servingTimeContiner);
    setQueue();

})


// FUNCTION TO SET AN NEW QUEUE NAD CHECK THE HIDDEN VALUE TO KNOW THE QUEUE TYPE
function setQueue() {
    submitMainModalBtn.addEventListener('click', () => {
        switch (hiddenTypeInput.value) {
            case 'setDeterministic':
                setDeterministicValues();
                break;
            case 'mm1':
                setMM1Queue();
                break;
            case 'mm1k':
                setMM1KQueue();
                break;
            case 'mmc':
                setMMCQueue();
                break;
            case 'mmck':
                setMMCKQueue();
                break;
        }

    })
}

// GET N(T) ON KEYUP AND OUT THE RESULT
ntInput.addEventListener('keyup', () => {
    let time = Number(ntInput.value);
    let nt = queueObject.getCustomersAtSpecificTime(time);
    ntOutput.innerHTML = nt
})

// GET W(q) ON KEYUP AND OUT THE RESULT
wqInput.addEventListener('keyup', () => {
    let customerNum = Number(wqInput.value);
    let wq = queueObject.calcWq(customerNum);
    wqOutput.innerHTML = wq
})


// GET THE INPUT VALUES AND INIT AN OBJECT FROM DETERMINISTIC CLASS
function setDeterministicValues() {
    showElement(outputContainer)
    serviceTime = Number(getInputValue(serviceTimeInput));
    arrivalTime = Number(getInputValue(arrivalTimeInput));
    capacity = Number(getInputValue(capacityInput));
    clearInput(serviceTimeInput);
    clearInput(arrivalTimeInput);
    clearInput(capacityInput);
    queueObject = new Determenstic(arrivalTime, serviceTime, capacity);
    tiOutput.innerHTML = queueObject.getTi()

    //DRAW THE CHART 
    queueObject.drawChart()
}


// GET THE INPUT VALUES AND INIT AN OBJECT FROM DETERMINISTIC CLASS
function setMM1Queue() {
    showElement(outputContainer)
    serviceTime = eval(getInputValue(serviceTimeInput));
    arrivalTime = eval(getInputValue(arrivalTimeInput));
    clearInput(serviceTimeInput);
    clearInput(arrivalTimeInput);
    queueObject = new Stochastic(arrivalTime, serviceTime, 0);
    let output = queueObject.MM1Queue();
    outputContainer.innerHTML = output;
}


// GET THE INPUT VALUES AND INIT AN OBJECT FROM DETERMINISTIC CLASS
function setMM1KQueue() {
    showElement(outputContainer)
    serviceTime = eval(getInputValue(serviceTimeInput));
    arrivalTime = eval(getInputValue(arrivalTimeInput));
    capacity = eval(getInputValue(serverInput));
    clearInput(serviceTimeInput);
    clearInput(arrivalTimeInput);
    clearInput(capacityInput);
    queueObject = new Stochastic(arrivalTime, serviceTime, capacity);
    let output = queueObject.MM1KQueue();
    outputContainer.innerHTML = output;
}



// GET THE INPUT VALUES AND INIT AN OBJECT FROM DETERMINISTIC CLASS
function setMMCQueue() {
    showElement(outputContainer)
    serviceTime = eval(getInputValue(serviceTimeInput));
    arrivalTime = eval(getInputValue(arrivalTimeInput));
    capacity = eval(getInputValue(serverInput));
    // let c = eval(getInputValue(serverInput));
    clearInput(serviceTimeInput);
    clearInput(arrivalTimeInput);
    clearInput(capacityInput);
    clearInput(serverInput);
    queueObject = new Stochastic(arrivalTime, serviceTime, capacity);
    let output = queueObject.mmc();
    outputContainer.innerHTML = output;
}


function setMMCKQueue() {
    showElement(outputContainer)
    serviceTime = eval(getInputValue(serviceTimeInput));
    arrivalTime = eval(getInputValue(arrivalTimeInput));
    capacity = eval(getInputValue(capacityInput));
    let c = eval(getInputValue(serverInput));
    queueObject = new Stochastic(arrivalTime, serviceTime, capacity)
    let output = queueObject.mmck(c)
    outputContainer.innerHTML = output;

}















