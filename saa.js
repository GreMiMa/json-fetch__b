fetch('https://api.openweathermap.org/data/2.5/weather?lang=fi&q=helsinki&units=metric&APPID=665ecd56dfc08dbb50feb8b8f5034e28')
    // Muunnetaan vastaus JSON muotoon 
    .then(function (response) {
        return response.json();
    })

    // Käsitellään muunnettu (eli JSON muotoinen) vastaus 
    .then(function (responseJson) {
        // Kutsutaan funktiota ja välitetään sille json-vastaus  
        saa(responseJson, 'helsinki');
    })

    // Jos tuli jokin virhe 
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML =
            "<p>Tietoa ei pystytä hakemaan </p>" + error;
    });

fetch('https://api.openweathermap.org/data/2.5/weather?lang=fi&q=tampere&units=metric&APPID=665ecd56dfc08dbb50feb8b8f5034e28')
    // Muunnetaan vastaus JSON muotoon 
    .then(function (response) {
        return response.json();
    })

    // Käsitellään muunnettu (eli JSON muotoinen) vastaus 
    .then(function (responseJson) {
        // Kutsutaan funktiota ja välitetään sille json-vastaus  
        saa(responseJson, 'tampere');
    })

    // Jos tuli jokin virhe 
    .catch(function (error) {
        document.getElementById("vastaus1").innerHTML =
            "<p>Tietoa ei pystytä hakemaan </p>" + error;
    });

function saa(data, city) {
    var teksti = "";
    var kuva = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';


    //otsikkotiedon hakeminen
    teksti = teksti + "<h3>" + data.name + "</h3><ul>";

    teksti = teksti + "<p>Säätilan kuvaus: " + data.weather[0].description + "</p>";
    teksti = teksti + "<p>Lämpötila: " + data.main.temp + "</p>";
    teksti = teksti + "<p>Tuulen nopeus: " + data.wind.speed + " m/s </p>";
    teksti = teksti + "<p><img src='" + kuva + "' alt='kuva' ></p>";


    //listaelementti kiinni
    teksti = teksti + "</ul>";

    // tulosta teksti-muuttujan sisältö web-sivulle 
    if (city === 'helsinki') {
        document.getElementById("vastaus").innerHTML = teksti;
    } else {
        document.getElementById("vastaus1").innerHTML = teksti;
    }


}
