fetch('https://rata.digitraffic.fi/api/v1/live-trains/station/tpe?departing_trains=10&include_nonstopping=false')
    // Muunnetaan vastaus JSON muotoon 
    .then(function (response) {
        return response.json();
    })

    // Käsitellään muunnettu (eli JSON muotoinen) vastaus 
    .then(function (responseJson) {
        // Kutsutaan funktiota ja välitetään sille json-vastaus  
        junat(responseJson);

    })

    // Jos tuli jokin virhe 
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML =
            "<p>Tietoa ei pystytä hakemaan </p>" + error;
    })

function junat(data) {
    var teksti = "";

    //sivun otsikko
    teksti = teksti + "<h1>Junaliikenne</h1>";


    for (var i = 0; i < data.length; i++) {
        var juna = data[i];

        //lähtöasema
        var lahtoas = juna.timeTableRows[0].stationShortCode;

        // Määränpääasema
        var vika = juna.timeTableRows.length - 1;
        var maaranpaa = juna.timeTableRows[vika].stationShortCode;


        for (var j = 0; j < data[i].timeTableRows.length; j++) {
            // Haetaan vain saapuvat junat Tampereelle (TPE)
            if ((juna.timeTableRows[j].stationShortCode == "TPE" &&
                juna.timeTableRows[j].type == "ARRIVAL" || juna.timeTableRows[j].stationShortCode == "HKI" &&
                juna.timeTableRows[j].type == "ARRIVAL") &&
                ((lahtoas == "HKI" && maaranpaa == "TPE") || (lahtoas == "TPE" && maaranpaa == "HKI"))) {

                var pvm = juna.timeTableRows[j].scheduledTime;
                var aika = pvm.substr(0, 10) + " kello: " + pvm.substr(11, 5);

                // Varmista, että tulostetaan vain kerran
                if (teksti.indexOf(juna.trainNumber) === -1) {
                    teksti = teksti + "<p><strong>Juna nro: </strong> " + juna.trainNumber + "<br>";
                    teksti = teksti + "<p><strong>Junan tyyppi: </strong> " + juna.trainType + "</p>";
                    teksti = teksti + "<ul><p>Lähtee " + lahtoas + " Saapuu " + maaranpaa + " " + aika + "</ul>";
                }


            }


        }
    }
    // tulosta teksti-muuttujan sisältö web-sivulle 
    document.getElementById("vastaus").innerHTML = teksti;
}