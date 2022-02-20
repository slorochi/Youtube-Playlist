//////////////////////////////////////////////////////////////////////// WEB SVICE YOUTUBE  //////////////////////////////////////////////////////////////////
                             

// ARRAY playlist with index played from user
var tablVideos = ["https://www.youtube.com/embed/rI2vjPUztJc?autoplay=1"];
var index = 0;

// PUSH URL IN THE ARRAY PLAYLIST + SAVE and DISPLAY PLAYLIST
var searchurl = document.querySelector('#searchurl')
searchurl.addEventListener('click',function(){
    var urlVideo = (document.getElementById('url').value);
    if(urlVideo== ""){
        alert("Vous devez saisir une url dans la recherche.")
    }
    else{
        // utiliser embed pour pouvoir utiliser le lien de la vidéo
        urlVideo.replace('watch?v=','embed/');
        urlVideo += "?autoplay=1"
        tablVideos.push(urlVideo.replace('watch?v=','embed/'));
        save();
        affichageVideoPlaylist();
    }
});

// LOCAL SAVE + RECUP PLAYLIST FUNCTIONS
function save(){
    localStorage.setItem("playlist",JSON.stringify(tablVideos))
}
function recupSave(){		
    let recup = JSON.parse(localStorage.getItem("playlist"))
    tablVideos=recup;
}

// CREATING Player according to the current "index"
function affichagePlayerYt(){
    recupSave();
    $(".contPlayerVideo").html("");
    $(".contPlayerVideo").html(`<iframe autoplay=1 allow="autoplay; fullscreen" id="inlineFrameExample"
    title="youtube Video link"
    src="${tablVideos[index]}">
    </iframe>`);   
}

//Display user's playlist
function affichageVideoPlaylist(){
    recupSave();
    $(".liste").html("");
    for (let i = 0; i<tablVideos.length; i++){
        var element =`
        <div class="row contentPlaylist">
            <button data-value='${i}'type="button" class="play">
                <i class="bi bi-play-btn-fill"></i>
            </button>
            <div class="titlePlaylist">
                <li id='${i}'class='listes' contenteditable='true' >${tablVideos[i]}</li>
                <button data-value='${i}'type="button" class="delete">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        </div>`;
        var elements;
        if (i<=0){
            elements = element;
        }
        else{
            elements += element;
        }
        $(".liste").html(elements);
    };
    // fonction au clic du delete qui permet de retirer l'élément de la playlist et donc du tableau:
    $(".delete").click(function(){
        // récupère l'id du delete sur lequel on a cliqué (et donc de l'index qu'on doit splice du tableau)
        var indexTableau =$(this).attr("data-value");
        console.log(indexTableau);
        // on retire l'élément à supprimer du tableau
        tablVideos.splice(indexTableau,1);
        // puis on actualise l'affichage du player youtube et de la playList;
        /* affichagePlayerYt(); */
        save();
        affichageVideoPlaylist();
        console.log(tablVideos);
    })
    $(".play").click(function(){
        var indexTableau =$(this).attr("data-value");
        index = indexTableau;
        console.log(index);
        affichagePlayerYt();
    })
}
affichagePlayerYt();
affichageVideoPlaylist();

