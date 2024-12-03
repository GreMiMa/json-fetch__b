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
    });

function junat1(data) {
    var teksti = "";

    // Sivun otsikko
    teksti = teksti + "<h1>Junaliikenne</h1>";

    for (var i = 0; i < data.length; i++) {
        var juna = data[i];

        // Käy junan aikataulurivit läpi
        for (var j = 0; j < juna.timeTableRows.length; j++) {
            // Tarkistetaan lähteekö juna Helsingistä (HKI)
            if (juna.timeTableRows[j].stationShortCode == "HKI" && juna.timeTableRows[j].type == "DEPARTURE") {
                // Haetaan Tampereelle saapumisaika
                var saapumisaika = null;

                for (var k = 0; k < juna.timeTableRows.length; k++) {
                    if (juna.timeTableRows[k].stationShortCode == "TPE" && juna.timeTableRows[k].type == "ARRIVAL") {
                        var saapumisPvm = juna.timeTableRows[k].scheduledTime;
                        saapumisaika = saapumisPvm.substr(0, 10) + " kello: " + saapumisPvm.substr(11, 5);
                        break; // Lopetetaan, kun saapumisaika on löytynyt
                    }
                }

                // Näytetään vain pitkän matkan junat
                if (juna.trainCategory == "Long-distance") {
                    teksti = teksti + "<p>Junan numero: " + juna.trainNumber + "</p>";
                    teksti = teksti + "<p>Junan tyyppi: " + juna.trainType + "</p>";

                    var lahtemisPvm = juna.timeTableRows[j].scheduledTime;
                    var lahtoAika = lahtemisPvm.substr(0, 10) + " kello: " + lahtemisPvm.substr(11, 5);

                    teksti = teksti + "<p>Lähtee Helsingistä: " + lahtoAika + "</p>";

                    if (saapumisaika) {
                        teksti = teksti + "<p>Saapuu Tampereelle: " + saapumisaika + "</p>";
                    } else {
                        teksti = teksti + "<p>Saapumisaika Tampereelle ei ole saatavilla.</p>";
                    }
                }
            }
        }
    }

    // Tulosta teksti-muuttujan sisältö web-sivulle 
    document.getElementById("vastaus").innerHTML = teksti;
}
