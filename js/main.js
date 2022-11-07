"use strict"

// VARIABLES 
let period = 100;
// the arrival time ratio
// FIX THIS VAR SHOULD BE INPUTS
let lamda = 4,
    meu = 6,
    capacity = 4;
// CHART TIME LINE
const labels = [];

// CHAT VALUES
let values = [];

// EQUATION TO CALCULATE CUSTOMERS AT SPECIFIC TIME
function getCustomers(arrivingTime, servingTime, capacity, period) {

    let waiting = 0;

    let arr = [];
    for (let i = 0; i < arrivingTime; i++) {
        arr.push(0);
        // push the x Axis numbers
        labels.push(i);
    }

    for (let i = arrivingTime; i <= period; i++) {
        if ((i - arrivingTime) % servingTime == 0 && i > servingTime && waiting > 0) waiting--;
        if (i % arrivingTime == 0 && waiting < capacity) waiting++;
        arr[i] = waiting;

        // push the x Axis numbers
        labels.push(i);
    }
    return arr;
}


values = getCustomers(lamda, meu, capacity, period);



// DATA OF THE CHART
const data = {
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
const config = {
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

// =========================================


//  intialize Chart
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

function getCustomersAtSpecificTime(t) {
    let ans = getCustomers(lamda, meu, capacity, t);
    let l = ans.length
    return (ans[l - 1]);
}


