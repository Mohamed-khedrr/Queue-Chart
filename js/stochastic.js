"use strict"
export class Stochastic {
    lamda;
    meu;
    serviceTime;
    arrivalTime;
    capacity = 0;
    period = 100;


    constructor(arrivalTime, serviceTime, capacity) {
        this.arrivalTime = arrivalTime;
        this.serviceTime = serviceTime;
        this.capacity = capacity;
        this.lamda = (1 / arrivalTime);
        this.meu = (1 / serviceTime);
    }





    MM1Queue() {
        let l = this.lamda / (this.meu - this.lamda);
        let lq = (this.lamda * this.lamda) / (this.meu * (this.meu - this.lamda));
        let w = 1 / (this.meu - this.lamda);
        let wq = this.lamda / (this.meu * (this.meu - this.lamda));

        l = this.removeNan(l);
        lq = this.removeNan(lq);
        w = this.removeNan(w);
        wq = this.removeNan(wq);


        return `
        <h3 class="d-flex flex-column justify-content-evenly h-100 text-warning text-center">
            <div class="bg-danger p-3 bg-dark rounded-2">L = ${l.toFixed(2)}</div>
            <div class="bg-danger p-3 bg-dark rounded-2">Lq = ${lq.toFixed(2)}</div>
            <div class="bg-danger p-3 bg-dark rounded-2">W = ${w.toFixed(2)}</div>
            <div class="bg-danger p-3 bg-dark rounded-2">Wq = ${wq.toFixed(2)}</div>
        </h3>
        `;
    }


    MM1KQueue() {
        let ru = this.lamda / this.meu;
        let l, pk;
        const k = this.capacity

        console.log(ru)
        console.log(k)
        if (ru == 1) {
            l = k / 2;
            pk = 1 / (k + 1);
        } else {
            const numerator = 1 - (k + 1) * Math.pow(ru, k) + k * Math.pow(ru, k + 1);
            const denominator = (1 - ru) * (1 - Math.pow(ru, k + 1));
            l = ru * (numerator / denominator);
            pk = Math.pow(ru, k) * ((1 - ru) / (1 - Math.pow(ru, k + 1)));
        }
        let lamdaDash = this.lamda * (1 - pk);
        let w = l / lamdaDash;
        let wq = w - 1 / this.meu;
        let lq = lamdaDash * wq;

        l = this.removeNan(l);
        lq = this.removeNan(lq);
        w = this.removeNan(w);
        wq = this.removeNan(wq);

        return `
        <h3 class="d-flex flex-column justify-content-evenly h-100 text-warning text-center">
            <div class="bg-danger p-3 bg-dark rounded-2">L = ${l.toFixed(2)}</div>
            <div class="bg-danger p-3 bg-dark rounded-2">Lq = ${lq.toFixed(2)}</div>
            <div class="bg-danger p-3 bg-dark rounded-2">W = ${w.toFixed(2)}</div>
            <div class="bg-danger p-3 bg-dark rounded-2">Wq = ${wq.toFixed(2)}</div>
        </h3>
        `;
    }



    // getMmcP0() {
    //     let c = this.capacity;
    //     let r = (this.lamda / this.meu)
    //     let ru = (r / c)
    //     let p0;


    //     if (ru < 1) {

    //     } else {

    //     }

    //     return (1 / p0);
    // }





    mmc() {
        let c = this.capacity;
        let r = (this.lamda / this.meu)
        let ru = (r / c)
        let p0 = (ru < 1) ? this.mmcP0FirstCase() : this.mmcP0secCase();
        let nominator = (Math.pow(r, (c + 1)) / c)
        let denominator = (this.Factorial(c) * Math.pow((1 - (r / c)), 2))
        let lq = (p0 * nominator / denominator)
        let l = (lq + (this.lamda / this.meu));
        let w = ((lq / this.lamda) + (1 / this.meu));
        let wq = (lq / this.lamda);

        l = this.removeNan(l);
        lq = this.removeNan(lq);
        w = this.removeNan(w);
        wq = this.removeNan(wq);

        return `
        <h3 class="d-flex flex-column justify-content-evenly h-100 text-warning text-center">
            <div class="bg-danger p-3 bg-dark rounded-2">L = ${l.toFixed(2)}</div>
            <div class="bg-danger p-3 bg-dark rounded-2">Lq = ${lq.toFixed(2)}</div>
            <div class="bg-danger p-3 bg-dark rounded-2">W = ${w.toFixed(2)}</div>
            <div class="bg-danger p-3 bg-dark rounded-2">Wq = ${wq.toFixed(2)}</div>
        </h3>
        `;
    }




    mmck(c) {
        let k = this.capacity;
        let r = (this.lamda / this.meu)
        let ru = (r / c)
        let p0 = (ru == 1) ? this.mmckP0SecCase(k) : this.mmckP0FirstCase(k);
        let nominator = (ru * Math.pow(r, c) * p0)
        let denominator = (this.Factorial(c) * (Math.pow((1 - ru), 2)))
        let lq = (1 - Math.pow(ru, (k - c + 1)) - (1 - ru) * (k - c + 1) * (Math.pow(ru, (k - c))))
        lq *= (nominator / denominator);
        // let wq = (lq / (this.lamda * ()))

        lq = this.removeNan(lq);

        return `
        <h3 class="d-flex flex-column justify-content-evenly h-100 text-warning text-center">
            <div class="bg-danger p-3 bg-dark rounded-2">Lq = ${lq.toFixed(2)}</div>
        </h3>
        `;
    }







    // ==========================================================
    Factorial(n) {
        if (n <= 1) { return 1 };
        return (n * this.Factorial(n - 1));
    }


    // ========
    // mmcP0FirstCase() {
    //     let r = (this.lamda / this.meu);
    //     let c = this.capacity;
    //     let out = 0;
    //     for (let n = 0; n < c; n++) {
    //         out += ((Math.pow(r, n) / this.Factorial(n)));
    //     }

    //     out += ((c * Math.pow(r, c)) / (this.Factorial(c) * (c - r)));
    //     console.log(out)
    //     return out;
    // }



    //---------------------------------------------------------------------------------------------
    mmcP0secCase() {
        let lam = this.lamda;
        let mu = this.meu;
        let c = this.capacity;
        let out = 0;
        for (let n = 0; n < c; n++) {
            out += (((1 / this.Factorial(n)) * Math.pow((lam / mu), n)));
        }
        out += ((1 / this.Factorial(c)) * (Math.pow((lam / mu), c)) * ((c * mu) / ((c * mu) - lam)));
        return (1 / out);
    }




    mmcP0FirstCase() {
        let r = (this.lamda / this.meu)
        let c = this.capacity;

        let out = ((c * Math.pow(r, c)) / (this.Factorial(c) * (c - r)));
        for (let n = 0; n < c; n++)
            out += (Math.pow(r, n) / this.Factorial(n));
        return (1 / out);
    }



    //-----------------------



    mmckP0FirstCase(c) {
        let k = this.capacity;
        let r = (this.lamda / this.meu);
        let raw = (r / c);
        let out = ((Math.pow(r, c) / this.Factorial(c)) * ((1 - Math.pow(raw, k - c + 1)) / (1 - raw)));
        for (let n = 0; n < c; n++)
            out += (Math.pow(r, n) / this.Factorial(n));
        return (1 / out);
    }

    //---------------------------------------------------------------------------------------------

    mmckP0SecCase(c) {
        let k = this.capacity;
        let r = (this.lamda / this.meu);
        let raw = (r / c);

        let out = ((Math.pow(r, c) / this.Factorial(c)) * (k - c + 1));
        for (let n = 0; n < c; n++)
            out += (Math.pow(r, n) / this.Factorial(n));
        return (1 / out);
    }


    removeNan(x) {
        if (isNaN(x)) {
            return 0;
        } else {
            return x
        }
    }



}