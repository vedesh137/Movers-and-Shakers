const APIController = (function () {
    const clientId = "";
    const clientSecret = "";
  
    // private methods
    const _getToken = async () => {
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
      });
  
      const data = await result.json();
      return data.access_token;
    };
  
    const _getTrack = async (token, trackEndPoint) => {
  
      const result = await fetch(`${trackEndPoint}`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
      });
  
      const data = await result.json();
      return data;
  }
  
    const _getSongs = async (token) => {
      //Popcaan default ^
  
      //selecting from html id
      const mySpoifyid = document.getElementById('mySpoifyid');
      const Aid = mySpoifyid.textContent;
      console.log(Aid);
  
      const limit = 10;
      const artistid = "6RHTUrRF63xao58xh9FXYJ";
      const result = await fetch(
        `https://api.spotify.com/v1/artists/${Aid}/top-tracks?market=ES`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
  
      const data = await result.json();
      console.log(data.tracks);
      return data.tracks;
    };
  
    return {
      getToken() {
        return _getToken();
      },
      getSongs(token) {
        return _getSongs(token);
      },
      getTrack(token, trackEndPoint) {
              return _getTrack(token, trackEndPoint);
          }
    };
  })();
  
  // UI Module
  const UIController = (function () {
    //object to hold references to html selectors
    const DOMElements = {
      selectSong: "#select_Song",
      selectPlaylist: "#select_playlist",
      buttonSubmit: "#btn_submit",
      divSongDetail: "#song-detail",
      hfToken: "#hidden_token",
      divSonglist: ".song-list",
    };
  
    //public methods
    return {
      //method to get input fields
      inputField() {
        return {
          tracks: document.querySelector(DOMElements.divSonglist),
          songDetail: document.querySelector(DOMElements.divSongDetail)
        };
      },
  
      // need method to create a track list group item
      createTrack(id, name) {
        const html = `<a  class="list-group-item list-group-item-action list-group-item-light" id="https://api.spotify.com/v1/tracks/${id}">${name}</a>`;
        document
          .querySelector(DOMElements.divSonglist)
          .insertAdjacentHTML("beforeend", html);
      },
  
      // need method to create the song detail
      createTrackDetail(img, title, id) {
        const detailDiv = document.querySelector(DOMElements.divSongDetail);
        // any time user clicks a new song, we need to clear out the song detail div
        detailDiv.innerHTML = "";
  
        const html = `
                  <div class="row col-sm-12 px-0">
                             
                  
                  <a href="https://open.spotify.com/track/${id}">
                  <img src="${img}" alt=""> 
                  </a>
                  </div>
                  <div class="row col-sm-12 px-0">
                      <a href="https://open.spotify.com/track/${id}" for="Song" class="form-label col-sm-12">${title}</a>
                  </div>
                  `;
  
        detailDiv.insertAdjacentHTML("beforeend", html);
      },
  
      resetTrackDetail() {
        this.inputField().songDetail.innerHTML = "";
      },
      //--
  
      storeToken(value) {
        document.querySelector(DOMElements.hfToken).value = value;
      },
  
      getStoredToken() {
        return {
          token: document.querySelector(DOMElements.hfToken).value,
        };
      },
    };
  })();
  
  const APPController = (function (UICtrl, APICtrl) {
    // get input field object ref
    const DOMInputs = UICtrl.inputField();
  
    // get Songs on page load
    const loadSongs = async () => {
      //get the token
      const token = await APICtrl.getToken();
      //store the token onto the page
      UICtrl.storeToken(token);
      //get the Songs
      const Songs = await APICtrl.getSongs(token);
      //populate our Songs select element
      Songs.forEach((element) => UICtrl.createTrack(element.id, element.name));
    };
  
    // create song selection click event listener
    DOMInputs.tracks.addEventListener("click", async (e) => {
      // prevent page reset
      e.preventDefault();
      UICtrl.resetTrackDetail();
      // get the token
      const token = UICtrl.getStoredToken().token;
      // get the track endpoint
      const trackEndpoint = e.target.id;

      console.log(trackEndpoint);
      
      //get the track object
      const track = await APICtrl.getTrack(token, trackEndpoint);
      // load the track details
      UICtrl.createTrackDetail(
        track.album.images[0].url,
        track.name,
        track.id
      );
    });
  
  
        // create song selection click event listener
        DOMInputs.tracks.addEventListener('click', async (e) => {
          // prevent page reset
          e.preventDefault();
          UICtrl.resetTrackDetail();
          // get the token
          const token = UICtrl.getStoredToken().token;
          // get the track endpoint
          const trackEndpoint = e.target.id;
          //get the track object
          const track = await APICtrl.getTrack(token, trackEndpoint);
          // load the track details
          UICtrl.createTrackDetail(track.album.images[0].url, track.name, track.id);
      }); 
  
    return {
      init() {
        console.log("App is starting");
        loadSongs();
      },
    };
  })(UIController, APIController);
  
  // will need to call a method to load the Songs on page load
  APPController.init();
  