//////////////////////////////////////////////////////////////// API WEATHER //////////////////////////////////////////////////////////////////

 ////////////////////////////////////////////////////// POURQUOI J'AI CHOSI CETTE API ///////////////////////////////////////////
                                // J'ai sélectionné l'API openweather car la documentation est claire et rend l'api simple à utiliser. Avec la lattitude et la longitude
                                // renseignées, il suffit de parcourir dans la data pour sélectionner les éléments que l'on souhaite afficher.


// constante où le html sera généré
const contPopDpt = document.getElementById('contTemp');
// sur le bouton search, fonction pour aller chercher la température et le temps selon la localisation (lattitude et longitude à renseigner au préalable)
document.querySelector('#search').addEventListener('click',function(){
    // définition des variables lat et lon renseignées par l'utilisateur pour les intégrer dans l'url de la requête api
    var lat = document.getElementById('lat').value;
    var lon = document.getElementById('lon').value;
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=ded03a17fa55a77d2ce822284eb70b47`
        fetch(url)
        .then(res => res.json())
        .then(data => { 
            console.log(data);
            // dans la data, parcourt les éléments pour aller trouver la temperature current (data.current.temp) puis le temps (data.current.weather[0].main où le 0 fait rentrer dans un tableau)
            var temperature = Math.round((data.current.temp)-273.15);
            var temps = (data.current.weather[0].main);
            // création des variables générées en html avec: les labels pour l'affichage puis la data que l'utilisateur recherche: la temperature = temp et le temps = weather
            var temp = document.createElement("span");
            var weather = document.createElement("span");
            var tempLabel = document.createElement("span");
            var weatherLabel = document.createElement("span");
            // on rajoute la class span pour tous les traiter dans le style
            temp.className ="span";
            weather.className ="span";
            tempLabel.className ="span";
            weatherLabel.className ="span";
            // ajout du contenu à afficher, on récupère les variables qui correspondent à la data (temperature = data.current.temp) et (temps = data.current.weather[0].main)
            tempLabel.textContent = "Température :"
            weatherLabel.textContent = "Temps :"
            temp.textContent = temperature
            weather.textContent = temps
            // destruction du html en cas de nouvelle recherche pour afficher que la dernière recherche effectuée;
            contPopDpt.innerHTML = "";
            // génération des éléments dans le html
            contPopDpt.append(tempLabel, weatherLabel, temp ,weather );      
        });
    });


