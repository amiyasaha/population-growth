function exponentialProjection(pop, rate, time) {
    return pop*Math.exp(rate/100*time);
}

function logisticProjection(pop, rate, time, cap) {
    return  cap / (1+((cap-pop) / pop) * Math.exp(-rate / 100 * time))
}

function iterativeExponential(pop, rate, time, result) {
    for(let i = 0; i <= time; i++) {
        result.innerHTML += exponentialProjection(pop, rate, i) + "<br>";
    }
}

function iterativeLogistic() {
    for(let i = 0; i <= time; i++) {
        result.innerHTML += logisticProjection(pop, rate, i, cap) + "<br>";
    }
}

function exponentialYears() {

}

function logisticYears() {

}


// dealing with JSON @ https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON
async function populateCountries()  {
    const request = new Request('country-by-population.json');
    const response = await fetch(request); 
    const countries = await response.json();

    let populations = document.getElementById("countries");

    countries.forEach(function(country) {
        populations.innerHTML += "<option value='" + country.population + "'>" + country.country + " (" + country.population +  ") </option>";
    });

}

window.onload = function () {
    let button = document.getElementById("calculate");
    let result = document.getElementById("result");
    
    let mode = document.getElementById("mode");
    let cap = document.getElementById("capacity");

    populateCountries();

    mode.onchange = function() {
        if (mode.value == "logistic") {
            console.log("logistic");
            cap.style.visibility = "visible"; 
        }

        else {
            cap.style.visibility = "hidden";    
        }
    }   

    button.onclick = function() {
        let country = document.getElementById("countries").value;
        let current = mode.value;

        let rate = document.getElementById("rate").value;
        let time = document.getElementById("time").value; 


        if (current == "exponential") {
            let expPop = iterativeExponential(country, rate, time, result);
            
        }

        else if (current == "logistic") {
            let logPop = logisticProjection(country, rate, time, cap.value);
            result.innerHTML = logPop;
        }

        else {
            console.log("mode")
            result.innerHTML = "Please select a mode!";
        }
    }

}