//////////////////////////////////////////////////////////////////////// API GOUV //////////////////////////////////////////////////////////////////
                                    ////////////////////////////////// POURQUOI J'AI CHOSI CETTE API ///////////////////////////////////////////
                                // J'ai sélectionné l'API geo.api.gouv car la documentation est simple à utiliser et il suffit simplement de modifier
                                // l'url de la requête en utilisant les input de l'utilisateur pour arriver à une recherche personnalisée simple à mettre en place



// Habitants par ville selectionné //

// documentation du site
//'https://geo.api.gouv.fr/communes?codePostal=78000'
//'https://geo.api.gouv.fr/communes?nom=Nantes&fields=departement&boost=population&limit=5'

//Sur le clic du bouton recherché, récupère la ville cherchée, la transforme dans ce Format: "Ville" avec les variables qui transforment le contenu en minuscule
// puis la première lettre en majuscule
document.querySelector('#searchPopulation').addEventListener('click',function(){
    let villeRech = (document.getElementById('ville').value);
    let villeRechToLowerUpper = villeRech.toLowerCase();
    console.log(villeRechToLowerUpper);
    var villeR = villeRechToLowerUpper.replace(villeRechToLowerUpper[0], villeRechToLowerUpper[0].toUpperCase());
    console.log(villeR)
    // utilise la variable de ville recherchée pour accéder à la data grâce à la requête par recherche par nom de ville
    var url =`https://geo.api.gouv.fr/communes?nom=${villeR}`;
    fetch(url)
    .then(res => res.json())
    .then(data => { 
        // boucle si il y a plus d'une ville
        if (data.length>0){
            // boucle avec i pour rentrer dans l'index de la data correspondant à la ville recherchée (ex Marseille a pour première réponse Marseillette dans le json)
            for (let i = 0; i < data.length; i++){
                if (data[i].nom == villeR){
                    console.log(data);
                    // puis on initialise les variables pour trouver la population de la ville et le code de département
                    var population = data[i].population;
                    var departement = data[i].codeDepartement
                }
            }
        }
        // si il n'y a qu'une ville renvoyée dans la data, alors on peut rentrer dans cette dernière directement via l'index [0] puis chercher la population et le département
        else{
            var population = data[0].population;
            var departement = data[0].codeDepartement
        }
            // création des différents éléments à afficher pour avoir la réponse: les labels puis la data à afficher en lien avec la ville recherchée
        const contPopDpt = document.getElementById('contPopDpt');
        var pop = document.createElement("span");
        var dpt = document.createElement("span");
        var popLabel = document.createElement("span");
        var dptLabel = document.createElement("span");
            // on rajoute la class span pour tous les traiter dans le style avec un .span
        pop.className ="span";
        dpt.className ="span";
        popLabel.className ="span";
        dptLabel.className ="span";
        // ajout du contenu à afficher dans les balises <span>
        popLabel.textContent = "Habitants :"
        dptLabel.textContent = "Departement :"
        pop.textContent = population
        dpt.textContent = departement
            // destruction du html en cas de nouvelle recherche pour afficher que la dernière recherche effectuée;
            contPopDpt.innerHTML = "";
            // génération des éléments dans le html
        contPopDpt.append(popLabel, dptLabel, pop ,dpt );
    });
});