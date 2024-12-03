fetch('https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?departing_trains=100&include_nonstopping=false')
    // Muunnetaan vastaus JSON muotoon 
    .then(function (response) {
        return response.json();
    })

    // Käsitellään muunnettu (eli JSON muotoinen) vastaus 
    .then(function (responseJson) {
        // Kutsutaan funktiota ja välitetään sille json-vastaus  
        junat1(responseJson);

    })

    // Jos tuli jokin virhe 
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML =
            "<p>Tietoa ei pystytä hakemaan </p>" + error;
    })

function junat1(data) {
    var teksti = "";

    //sivun otsikko
    teksti = teksti + "<h1>Junaliikenne</h1>";

    for (var i = 0; i < data.length; i++) {

        //käy junan aikataulurivit läpi
        for (var j = 0; j < data[i].timeTableRows.length; j++) {

            //tarkistetaan lähteekö juna Helsingistä
            if (data[i].timeTableRows[j].stationShortCode == "HKI") {

                //tarkistetaan onko juna lähtevä
                if (data[i].timeTableRows[j].type == "DEPARTURE") {

                    //tarkistetaan onko juna pitkänmatkan juna
                    if (data[i].trainCategory == "Long-distance") {

                        teksti = teksti + "<div>";

                        //junan numero
                        teksti = teksti + "<p><strong>Junan numero: " + data[i].trainNumber + "</strong></p>";
                        //junan tyyppi
                        teksti = teksti + "<p><strong>Junan tyyppi: " + data[i].trainType + "</strong></p>";

                        //päivämäärä ja kellonaika
                        var pvm = data[i].timeTableRows[j].scheduledTime;
                        var aika = pvm.substr(0, 10) + " kello: " + pvm.substr(11, 5);

                        //haetaan junia, jotka lähtee Helsingistä
                        teksti = teksti + "<p>Lähtee Helsingistä " + aika + "</p>";

                        teksti = teksti + "<br></div>";

                    }
                }
            }
        }
    }


    // tulosta teksti-muuttujan sisältö web-sivulle 
    document.getElementById("vastaus").innerHTML = teksti;
}