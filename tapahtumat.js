fetch('https://api.visittampere.com/api/v1/visittampere/event/published/all/?format=json&lang=fi')
    // Muunnetaan vastaus JSON muotoon 
    .then(function (response) {
        return response.json();
    })

    // Käsitellään muunnettu (eli JSON muotoinen) vastaus 
    .then(function (responseJson) {
        // Kutsutaan funktiota ja välitetään sille json-vastaus  
        tapahtumat(responseJson)
    })

    // Jos tuli jokin virhe 
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML =
            "<p>Tietoa ei pystytä hakemaan </p>" + error;
    })

function tapahtumat(data) {
    var teksti = "";

    //sivun otsikko
    teksti = teksti + "<h1>Tampereen tapahtumat</h1><ul>";

    for (var i = 0; i < data.length; i++) {
        //hae tapahtuman nimi, kuvaus ja url-osoite 
        teksti = teksti + "<h3>Tapahtuma: " + data[i].title + "</h3></p>";
        teksti = teksti + "<p>Kuvaus:" + data[i].description + "</p>";
        teksti = teksti + "<p>Linkki tapahtumaan:" + "<a href=' " + data[i].url + " '> " + data[i].url + "</a></p>";
    }

    //listaelementti kiinni
    teksti = teksti + "</ul>";

    // tulosta teksti-muuttujan sisältö web-sivulle 
    document.getElementById("vastaus").innerHTML = teksti;
}