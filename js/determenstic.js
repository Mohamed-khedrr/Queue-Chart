"use strict"
export class Determenstic {
    lamda;
    meu;
    serviceTime;
    arrivalTime;
    capacity;
    ti;
    period = 100;


    constructor(arrivalTime, serviceTime, capacity) {
        this.arrivalTime = arrivalTime;
        this.serviceTime = serviceTime;
        this.capacity = capacity;
        this.lamda = (1 / arrivalTime);
        this.meu = (1 / serviceTime);
        // this.ti = this.getTi();
    }


    // FUNCTION TO CALCULATE CUSTOMERS WITHE THE OFFICAL EQ
    getCustomersNumberUsingEq(time) {
        let leftSide = Math.floor(time / this.arrivalTime)
        let rightSide = Math.floor((time / this.serviceTime) - (this.arrivalTime / this.serviceTime));
        return (leftSide - rightSide);
    }

    //HANDLE THE EQUATION THAT SET VALUES AND SET CONFIG DATA
    getCustomers(period) {
        let waiting = 0;
        let arr = [];
        for (let i = 0; i < this.arrivalTime; i++) {
            arr.push(0);
        }
        for (let i = this.arrivalTime; i <= period; i++) {
            if ((i - this.arrivalTime) % this.serviceTime == 0 && i > this.serviceTime && waiting > 0) waiting--;
            if (i % this.arrivalTime == 0 && waiting < this.capacity) waiting++;
            arr[i] = waiting;
        }
        return arr;
    }


    // Function to get Customers at Spacific
    getCustomersAtSpecificTime(t) {
        let ans = this.getCustomers(t);
        let l = ans.length
        // return (ans[l - 1]);
        ans = ans[l - 1]
        return `
        <div class=" text-light p-2 bg-dark text-center rounded-2"> 
        N(${t}) = ${ans}
        </div>;
        `
    }




    // FUNCTION THAT GET TI USING TRIAL AND ERROR
    getTi() {
        let i = 0;
        let n = 0;
        while (true) {
            n = this.getCustomersNumberUsingEq(i)
            if (n >= (this.capacity + 1)) {
                return i;
            }
            i++;
        }
    }






    // FUNCTION TO CALC WQ
    calcWq(n) {
        let wq = this.serviceTime - this.arrivalTime
        let ti = this.getTi()
        if (n < (ti * (this.lamda))) {
            wq *= (n - 1);
            wq = (wq < 0) ? 0 : wq;
            return `
            <div class=" text-light p-2 bg-dark text-center rounded-2"> 
            Wq(${n}) = ${wq}
            </div>`;
        } else {
            let wq1 = wq, wq2 = wq;
            wq1 *= ((ti * (this.lamda)) - 3);
            wq2 *= ((ti * (this.lamda)) - 2);
            return `
            <div class=" text-light p-2 bg-dark text-center rounded-2"> 
            Wq(${n}) = ${wq1} <b>OR</b> ${wq2}
            </div>`;
        }

    }









    drawChart() {
        let labels = [];
        let values = this.getCustomers(this.period);

        // LOOP TO PUSH THE TIME LINE VALUES
        for (let i = 0; i <= this.period; i++) {
            labels.push(i);
        }


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













}







