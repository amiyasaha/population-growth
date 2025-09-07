function projectPopulation(pop, rate, time) {
    return pop*Math.exp(rate/100*time);
}

function yearsToCarryingCapacity(pop, rate, cap) {

}

window.onload = function () {
    let button = document.getElementById("calculate");
    let result = document.getElementById("result");

    button.onclick = function() {
        let country = document.getElementById("countries").value;
        let mode = document.getElementById("mode").value;

        let rate = document.getElementById("rate").value;
        let time = document.getElementById("time").value; 

        if (mode == "proj") {
            console.log("hello")
            let pop = projectPopulation(country, rate, time);
            result.innerHTML = pop;
            
        }

        else if (mode == "cap") {
            let years = yearsToCarryingCapacity(country, rate, time);
            result.innerHTML = years;
        }

        else {
            console.log("mode")
            result.innerHTML = "Please select a mode!";
        }
    }

}