let celsiusInput = document.querySelector('#celsius');
let fahrenheitInput = document.querySelector('#ferenhite');
let kelvinInput = document.querySelector('#kelvin');

let btn = document.querySelector('.btn button');

function roundNumber(num) {
    return Math.round(num*100)/100;
}

celsiusInput.addEventListener('input', () => {
    let cTemp = parseFloat(celsiusInput.value);
    let ftemp = (cTemp*(9/5)) + 32;
    let kTemp = cTemp + 273.15;

    fahrenheitInput.value = (ftemp);
    kelvinInput.value = (kTemp);
});

fahrenheitInput.addEventListener('input', () => {
    let fTemp = parseFloat(fahrenheitInput.value);
    let ctemp = (fTemp - 32) * (5/9);
    let kTemp = (fTemp - 32) * (5/9) + 273.15;

    celsiusInput.value = (ctemp);
    kelvinInput.value = (kTemp);
});

kelvinInput.addEventListener('input', () => {
    let kTemp = parseFloat(kelvinInput.value);
    let ftemp = (kTemp - 273.15) * (9/5) +32;
    let cTemp = kTemp - 273.15;

    fahrenheitInput.value = (ftemp);
    celsiusInput.value = (cTemp);
});

btn.addEventListener('click', () => {
    celsiusInput.value = "";
    fahrenheitInput.value = "";
    kelvinInput.value = "";
});