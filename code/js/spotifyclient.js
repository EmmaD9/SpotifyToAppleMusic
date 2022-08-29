var spotify_token = "";

/**
 * Authenticates with spotify
 * @param {*} client_id 
 * @param {*} client_secret 
 * @returns a promise, that when done will populate the global spotify_token
 */
function get_access_token(client_id, client_secret){
    
    let auth = "Basic " + btoa(client_id + ":" + client_secret);
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": auth,
        "Content-Type": "application/x-www-form-urlencoded"
       }
       
    let bodyContent = "grant_type=client_credentials";
    
    return fetch("https://accounts.spotify.com/api/token", { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        })
        .then(response => response.json())
        .then(result => spotify_token = result.access_token);
}


/**
 * Given spotify playlist id and authorization token, get the play list information
 * @param {*} playlist_id 
 * @param {*} token 
 * @returns a promise that will yield the spotify playlist structure
 */
function get_playlist(playlist_id, token){
    let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
       }
       
       return fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks", { 
         method: "GET",
         headers: headersList
       }).then(function(response) {
         return response.json();
       });
}
