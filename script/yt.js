
//////////////////////////////////////////////////////////////////////// WEB SVICE YOUTUBE  //////////////////////////////////////////////////////////////////
           

// ARRAY playlist with index played from user
var tablVideos = [
    [
        {"title":"Nom de votre playlist"},
        {"url":"https://www.youtube.com/embed/rI2vjPUztJc?autoplay=1", "title":"default"},
        {"url":"https://www.youtube.com/embed/rI2vjPUztJc?autoplay=1", "title":"default"}
    ],
    [
        {"title":"Nom de votre playlist"},
    ]
];
var currentVideoIndex = 1
var currentPlaylistIndex = 0
var tablIndexes = [1,0];
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
        // TODO: ajouter les vidéos de playlists(playlist dans l'url...)
        tablVideos[currentPlaylistIndex].push({"url": `${urlVideo.replace('watch?v=','embed/')}`, "title": `video ${tablVideos[currentPlaylistIndex].length}`});
        save();
        affichageVideoPlaylist();
        if(tablVideos[currentPlaylistIndex].length==1){affichagePlayerYt();}
        
    }
});

// LOCAL SAVE + RECUP PLAYLIST FUNCTIONS
function save(){
    localStorage.setItem("playlist",JSON.stringify(tablVideos))
}
function recupSave(){		
    let recup = JSON.parse(localStorage.getItem("playlist"))
    if (recup){
        tablVideos = recup;
    }
    else{
        tablVideos = [[{"title":"Nom de votre playlist"},{"url":"https://www.youtube.com/embed/rI2vjPUztJc?autoplay=1", "title":"default"},{"url":"https://www.youtube.com/embed/rI2vjPUztJc?autoplay=1", "title":"default"}],[{"title":"Nom de votre playlist"},]];
    }
    return tablVideos;
}
function saveIndexes(){
    localStorage.setItem("index",JSON.stringify(tablIndexes))
}

function recupSaveIndexes(){		
    let r = JSON.parse(localStorage.getItem("index"))
    if (r){
        tablIndexes = r;
    }
    else{
        tablIndexes = [1,0];
    }
    return tablIndexes;}
// CREATING Player according to the current "index"
function affichagePlayerYt(){
    tablVideos=recupSave();
    $(".contPlayerVideo").html("");
    $(".contPlayerVideo").html(`<iframe autoplay=1 allow="autoplay; fullscreen" id="inlineFrameExample"
    title="${tablVideos[currentPlaylistIndex][currentVideoIndex].title}"
    src="${tablVideos[currentPlaylistIndex][currentVideoIndex].url}">
    </iframe>`);   
}

//Display user's playlist
function affichageVideoPlaylist(){
    tablVideos=recupSave();
    $(".liste").html("");
    $(".playlistTitle").html("");
    console.log(currentPlaylistIndex);
    console.log(tablVideos[currentPlaylistIndex]);
    for (let i = 0; i<tablVideos[currentPlaylistIndex].length; i++){
        // regular expression to find the id of the current video and retrieve the video thumbnail
        if(i==0){
            var title = `
            <span id ='${i}' class = "spanTitlePlaylist" contenteditable='true'>${tablVideos[currentPlaylistIndex][i].title}</span>`;
        }
        if(i>0){
            var ch = tablVideos[currentPlaylistIndex][i].url.split(/[&?/]+/);
            var element =`
        <div class="row contentPlaylist">
            <button data-value='${i}'type="button" style ="background:url('https://img.youtube.com/vi/${ch[3]}/default.jpg') center no-repeat;);
            "class="play">
                <i class="bi bi-play-btn-fill"></i>
            </button>
            <div class="titlePlaylist">
                <li id='${i}'class='listes' contenteditable='true' >${tablVideos[currentPlaylistIndex][i].title}</li>
                <button data-value='${i}'type="button" class="delete">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        </div>`;
        
        }
        var elements;
        var playlistTitle;
        if (i==0){
            playlistTitle = title;
            $(".playlistTitle").html(playlistTitle);

        }
        if (i==1){
            elements = element;
        }
        else{
            elements += element;
        }
        $(".liste").html(elements);
       /*  new Sortable($(".liste"), {
            // options here
        }); */
    };
    // fonction au clic du delete qui permet de retirer l'élément de la playlist et donc du tableau:
    $(".delete").click(function(){
        var indexTableau =$(this).attr("data-value");
        tablVideos[currentPlaylistIndex].splice(indexTableau,1);
        save();
        affichageVideoPlaylist();
    })
    $(".play").click(function(){
        var indexTableau =$(this).attr("data-value");
        currentVideoIndex = indexTableau;
        affichagePlayerYt();
    })

    // To change the video's name
    $(".titlePlaylist>li").on('input',function(){
        var indexTableau =$(this).attr("id");
        tablVideos[currentPlaylistIndex][indexTableau].title = this.innerHTML;
        save();
    })  

    // To change the playlist's name
    $(".spanTitlePlaylist").on('input',function(){
        var indexTableau =$(this).attr("id");
        tablVideos[currentPlaylistIndex][indexTableau].title = this.innerHTML;
        save();
    })  
}
affichagePlayerYt();
affichageVideoPlaylist();
    
    // on click burger, display the new playlist
    $(".burger").click(function(){
        $(".sideMenu").toggleClass("burgerActive");
    }
    );
    function affichageListPlaylists(){
        // first build the HTML elements
        tablVideos=recupSave();
        $(".listePlaylist").html("");
        for (let i = 0; i<tablVideos.length; i++){
            for (var j = 1; j<tablVideos[i].length; j++){
                // retrieve the thumbnail of each videos to display it later
                console.log(j)
                if(1<j && j<5){console.log("coucoucoucou")};
                var ch = tablVideos[i][j].url.split(/[&?/]+/);
                if(j==1){videos = `<div class="menuVideos" style ="background:url('https://img.youtube.com/vi/${ch[3]}/default.jpg') center no-repeat;"></div>`;}
                else if(1<j && j<5){videos += `<div class="menuVideos" style ="background:url('https://img.youtube.com/vi/${ch[3]}/default.jpg') center no-repeat;"></div>`;}
                else if(j>4){console.log("saltuatuatuatujiatuiatuioj");}
            }
            console.log(videos);
            var element =`
            <li class='burgerLiPlaylist' id='${i}'>
               
                <div class="menuTitlePlaylist row ">
                    <span id='${i}' class="menuTitlePlaylistSpan"contenteditable='true'>${tablVideos[i][0].title}</span>
                </div>
                <button data-value='${i}'type="button" class="deletePlaylist">
                <i class="bi bi-trash-fill"></i>
            </button>
                <a id='${i}' class="playlist">
                    <div class="column menuContentPlaylist">
                        <div class="menuVideosCont">${videos}</div>
                    </div>
                </a>
            </li>`;
            videos="";
            if (!tablVideos[i][0].title){
            }
            $(".listePlaylist").append(element);
        };
        // then listen to delete event
        $(".deletePlaylist").click(function(){
            var indexTableauPlaylist =$(this).attr("data-value");
            tablVideos.splice(indexTableauPlaylist,1);
            save();
            affichageListPlaylists();
        })
        //and listen to modify playlist name addEventListener
        $(".menuTitlePlaylistSpan").on('input',function(){
            var indexTableau =$(this).attr("id");
            console.log(indexTableau);
            console.log(this.innerHTML);
            tablVideos[indexTableau][0].title = this.innerHTML;
            save();
        })  
        // and listen to change playlist running event
        $(".playlist").click(function(){
            console.log('coucou');
            var indexTableauPlaylist =$(this).attr("id");
            currentPlaylistIndex=indexTableauPlaylist;
            // saveIndexes();
            affichageVideoPlaylist();
            affichagePlayerYt();
        })
        
        
        
    }
    // add playlist event listener
    $(".addPlaylist").click(function(){
        console.log(tablVideos[0]);
        tablVideos.push([{"title":"Nom de votre playlist"},]);
        save();
        affichageListPlaylists();
        console.log(tablVideos);
    })
    affichageListPlaylists();

