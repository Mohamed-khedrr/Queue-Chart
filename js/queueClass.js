"use strict"
export class Queue {

    period = 100;
    arrivingTime = 0;
    servingTime = 0;
    capacity = 0;
    ti = 0;

    constructor() {
    }


    //HANDLE THE EQUATION THAT SET VALUES AND SET CONFIG DATA
    getCustomers(arrivingTime, servingTime, capacity, period) {
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


    //HANDLE THE EQUATION THAT SET VALUES AND SET CONFIG DATA
    getCustomers(arrivingTime, servingTime, capacity, period) {
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


    // Function to get Customers at Spacific
    getCustomersAtSpecificTime(t) {
        let ans = getCustomers(arrivingTime, servingTime, capacity, t, t);
        let l = ans.length
        return (ans[l - 1]);
    }


    // FUNCTION TO CALCULATE CUSTOMERS WITHE THE OFFICAL EQ
    getCustomersNumberUsingEq(time) {
        let lefSide = Math.floor(time / arrivingTime)
        let righSide = Math.floor((time / servingTime) - (arrivingTime / servingTime));
        return (lefSide - righSide);
    }


    // FUNCTION THAT GET TI USING TRIAL AND ERROR
    getTi() {
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


    // FUNCTION TO CALC WQ
    calcWq(n) {
        let wq = servingTime - arrivingTime
        let ti = getTi();
        if (n < (ti * (1 / arrivingTime))) {

            wq *= (n - 1);
            return ` Wq(${n}) = ${wq}`;
        } else {
            let wq1 = wq, wq2 = wq;
            wq1 *= ((ti * (1 / arrivingTime)) - 3);
            wq2 *= ((ti * (1 / arrivingTime)) - 2);
            return ` Wq(${n}) = ${wq1} <b>OR</b> ${wq2}`;
        }
    }



}