
// defines songs as 
let songs = [];

var playlistId = '';
var gplaylist = null;

function start(){ 

    var link = readLine("What is the link of the playlist you'd like to import? ");
    getSpotify(link);
    print("The songs on your playlist will be:" + songs + ".");

}

function gotPlaylist(playlist){
        console.log("Playlist!!!" + playlist);
        gplaylist = playlist;
        var elementData = document.getElementById("playlistData");
        elementData.innerText = JSON.stringify(playlist);

        // Loop over tracks and print out list.
        for( i = 0; i < playlist.items.length; i++ ){
            console.log(playlist.items[i].track);
        }
}

function gotAccessToken(value){
    if(!value){
        alert("Failed to get access token :((((((");
    } else {
        console.log("Access Token: " + value);
        var p2 = get_playlist(playlistId, value);
        p2.then(
            gotPlaylist,
            function(error){
                alert("ERRR");

            }
        )
    }
}

//this function gets the songs from the spotify link and adds them to a list/array

function getSpotify(){
    playlistId = document.getElementById("spotifyPlaylistInput").value;
    var link = playlistId.split('/')
    playlistId = link[link.length-1];

    var clientId = document.getElementById("clientId").value;

    var secretClientId = document.getElementById("secretClientId").value;

    console.log( playlistId + " " + clientId + " " + secretClientId );
    var p = get_access_token(clientId, secretClientId);
    p.then(
        gotAccessToken,
        function(error){
            alert("Hey. No." + error);
        }
    );

}