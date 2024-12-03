fetch('https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507')
    // Muunnetaan vastaus JSON muotoon 
    .then(function (response) {
        return response.json();
    })

    // Käsitellään muunnettu (eli JSON muotoinen) vastaus 
    .then(function (responseJson) {
        // Kutsutaan funktiota ja välitetään sille json-vastaus  
        liikennekamerat(responseJson);

    })

    // Jos tuli jokin virhe 
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML =
            "<p>Tietoa ei pystytä hakemaan </p>" + error;
    })

function liikennekamerat(data) {
    var teksti = "";

    //sivun otsikko
    teksti = teksti + "<h1>Liikennekamerakuvat</h1>";

    var aikaleima = data.properties.dataUpdatedTime;

    for (var i = 0; i < data.properties.presets.length; i++) {
        var kuvaData = data.properties.presets[i];

        //lisätäänkuvan tiedot tekstiin 
        teksti = teksti + "<h3>" + kuvaData.presentationName + "</h3>";
        teksti = teksti + "<p>" + aikaleima + "</p>";
        teksti = teksti + "<p><img src='" + kuvaData.imageUrl + "' alt='Liikennekamerakuva " + (i + 1) + "' style='width:400px;'></p>";

    }

    // tulosta teksti-muuttujan sisältö web-sivulle 
    document.getElementById("vastaus").innerHTML = teksti;
}