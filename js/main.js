"use strict"

// INITIALIZE THE GLOBAL VARIABLES 
let period = 100;
let arrivingTime = 0,
    servingTime = 0,
    capacity = 0,
    ti = 0;

// CHART TIME LINE
const labels = [];

// ARRAY OF CHART VALUES
let values = [];

// DOM ELEMENTS
let enterTimeButton = document.querySelector('#enter-time-button')
let drawChartButton = document.querySelector('#draw-chart-btn');
let arrivingTimeInput = document.querySelector('#arriving-time');
let servingTimeInput = document.querySelector('#serving-time');
let capacityInput = document.querySelector('#capacity');
let drawChartModal = document.querySelector('.draw-chart-modal');
let modalDrawChartButton = document.querySelector('#modal-draw-chart-button');
let spacificTimeButton = document.querySelector('#enter-specific-button');
let spacificTimeInput = document.querySelector('#specific-time-input');
let TiButton = document.querySelector('#ti-btn');

enterTimeButton.style.display = "none";
TiButton.style.display = "none";


// Event TO ACTIVE CHART
drawChartButton.addEventListener('click', () => {
    arrivingTime = Number(arrivingTimeInput.value);
    servingTime = Number(servingTimeInput.value);
    capacity = Number(capacityInput.value);
    modalDrawChartButton.style.display = "none"
    drawChart()
    enterTimeButton.style.display = "inline";
    TiButton.style.display = "inline";


})

// Event FOR THE Enter TIME BUTTON 
spacificTimeButton.addEventListener('click', () => {
    let time = Number(spacificTimeInput.value);
    let customers = (getCustomersAtSpecificTime(time));
    document.querySelector('.enter-modal-body').style.display = "none";
    document.querySelector('.enter-modal-content').innerHTML = (`<h3 class="mx-2">At Time (${time}) Customers = ${customers}</h3>`)
    spacificTimeButton.style.display = "none";
    console.log(getTi());

})

// EVENT CLOSE THE ENTER TIME MODAL AND RESTORE CHANGES
document.querySelector('#close-enter-modal').addEventListener('click', () => {
    spacificTimeButton.style.display = "inline";
    document.querySelector('.enter-modal-body').style.display = "block";
    document.querySelector('.enter-modal-content').innerHTML = ""
    document.querySelector('.enter-modal-content').display = "none"
})


//EVENT TO PRINT TI IN IT'S MODAL
TiButton.addEventListener('click', () => {
    document.querySelector('#ti-modal .modal-body').innerHTML = `<h3>Ti = ${getTi()}</h3>`
})


//HANDLE THE EQUATION THAT SET VALUES AND SET CONFIG DATA
function getCustomers(arrivingTime, servingTime, capacity, period) {
    let waiting = 0;
    let arr = [];
    for (let i = 0; i < arrivingTime; i++) {
        arr.push(0);
    }
    for (let i = arrivingTime; i <= period; i++) {
        if ((i - arrivingTime) % servingTime == 0 && i > servingTime && waiting > 0) waiting--;
        if (i % arrivingTime == 0 && waiting < capacity) waiting++;
        arr[i] = waiting;
    }
    return arr;
}

// LOOP TO PUSH THE TIME LINE VALUES
for (let i = 0; i <= period; i++) {
    labels.push(i);
}

// INIT THE CHART 
function drawChart(param) {

    values = getCustomers(arrivingTime, servingTime, capacity, period);

    // DATA OF THE CHART
    let data = {
        labels: labels,
        datasets: [{
            label: 'Customers over time',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values,
            fill: false,
            stepped: true,
            pointStyle: '',
            pointRadius: 0,
            pointBorderColor: 'rgb(0, 0, 0)'
        }]
    };

    // CONFIG OF THE CHART
    let config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                axis: 'x'
            },
            plugins: {
                title: {
                    display: true,
                    text: (ctx) => 'Step ' + ctx.chart.data.datasets[0].stepped + ' Interpolation',
                },
                legend: {
                    labels: {
                        usePointStyle: false,
                    },
                }
            }
        }
    };

    //  initialize Chart
    let myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

// Function to get Customers at Spacific
function getCustomersAtSpecificTime(t) {
    let ans = getCustomers(arrivingTime, servingTime, capacity, t, t);
    let l = ans.length
    return (ans[l - 1]);
}

function getCustomersNumberUsingEq(time) {
    let lefSide = Math.floor(time / arrivingTime)
    let righSide = Math.floor((time / servingTime) - (arrivingTime / servingTime));
    return (lefSide - righSide);
}


function getTi() {
    let i = 0;
    let n = 0;
    while (true) {
        n = getCustomersNumberUsingEq(i)
        if (n >= capacity + 1) {
            return i;
        }
        i++;
    }
}






