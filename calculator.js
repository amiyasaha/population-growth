function exponentialProjection(pop, rate, time) {
    return pop*Math.exp(rate/100*time);
}

function logisticProjection(pop, rate, time, cap) {
    return  cap / (1+((cap-pop) / pop) * Math.exp(-rate / 100 * time))
}

window.onload = function () {
    let button = document.getElementById("calculate");
    let result = document.getElementById("result");
    
    let mode = document.getElementById("mode");
    let cap = document.getElementById("capacity");

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
            let expPop = exponentialProjection(country, rate, time);
            result.innerHTML = expPop;
            
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