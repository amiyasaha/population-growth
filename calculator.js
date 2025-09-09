/*
This file contains all the Javascript for my population growth calculator.
It holds all the interactivity and behavior for the calculator.
*/

function exponentialProjection(pop, rate, time) {
    return Math.floor(pop * Math.exp(rate / 100 * time));
}

function logisticProjection(pop, rate, time, cap) {
    return Math.floor(cap / (1 + ((cap - pop) / pop) * Math.exp(-rate / 100 * time)));
}

function iterativeExponential(pop, rate, time, result) {
    for (let i = 0; i <= time; i++) {
        result.innerHTML += exponentialProjection(pop, rate, i) + " (" + i + " years) <br>";
    }
}

function iterativeLogistic(pop, rate, time, cap, result) {
    for (let i = 0; i <= time; i++) {
        result.innerHTML += logisticProjection(pop, rate, i, cap) + " (" + i + " years) <br>";
    }
}

function exponentialYears(goal, pop, rate) {
    return Math.round(Math.log(goal / pop) / rate * 100) / 100;
}

function logisticYears(goal, pop, rate, cap) {
    let num = (cap - goal) * pop;
    let den = (cap - pop) * goal;
    return -Math.log(num / den) / rate;
}

// dealing with JSON @ https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON
async function populateCountries() {
    // you can find this data here: https://github.com/samayo/country-json/blob/master/src/country-by-population.json
    const request = new Request('country-by-population.json');
    const response = await fetch(request);
    const countries = await response.json();

    let populations = document.getElementById("countries");

    countries.forEach(function(country) {
        populations.innerHTML += "<option value='" + country.population + "'>" + country.country +
        " (" + country.population + ") </option>";
    });

}

window.onload = function() {
    let button = document.getElementById("calculate");
    let result = document.getElementById("result");

    let mode = document.getElementById("mode");
    let cap = document.getElementById("capacity");

    populateCountries();

    mode.onchange = function() {
        if (mode.value === "logistic") {
            cap.style.visibility = "visible";
        } else {
            cap.style.visibility = "hidden";
        }
    }

    button.onclick = function() {
        result.innerHTML = "";
        let country = document.getElementById("countries").value;
        let current = mode.value;

        let goal = document.getElementById("goal").value;
        let quantity = document.getElementById("quantity").value;

        let rate = document.getElementById("rate").value;
        let time = document.getElementById("time").value;

        if (current === "exponential") {
            if (quantity === "pop") {
                iterativeExponential(country, rate, time, result);
            } else {
                result.innerHTML = exponentialYears(goal, country, rate / 100) + " years.";
            }
        } else if (current === "logistic") {
            if (quantity === "pop") {
                iterativeLogistic(country, rate, time, cap.value, result);
            } else {
                result.innerHTML = logisticYears(goal, country, rate / 100, cap.value) + " years.";
            }
        } else {
            console.log("mode");
            result.innerHTML = "Please select a mode!";
        }
    }

}