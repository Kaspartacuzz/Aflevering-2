// Constructor function til at skabe album objekter
function Album(name, artist, year, website, sange) {
  this.name = name;
  this.artist = artist;
  this.year = year;
  this.website = website;
  this.sange = sange;
}

// Funktion til at tilføje en div med album info til HTML
function addDivWithAlbum(album, parentid) {
  let parentElement = document.getElementById(parentid);
  let elementToAdd =
"<div>" +
    "<h2>" + album.name + "<h2>" + 
    "<p>" + "Af " + album.artist + " i " + album.year + ", " + 

// HTML-link der åbner albumets hjemmeside i en ny fane
    '<a href="' + album.website + '" target="_blank">Tryk her for mere information</a><br>' + "</p>" +

// Knappen "Sange", der viser/skjuler en liste med sangtitler, når knappen trykkes
    "<button id='" + album.name + "-toggleButton' onclick=\"toggleSange('" + album.name + "-sange', '" + album.name + "-toggleButton')\">Vis Sange</button>" +
    "<ol id='" + album.name + "-sange' style='display: none;'>" +
    album.sange.map(sange => "<li>" + sange.trackTitle + "</li>").join('') +
    "</ol><br><br>" +
"</div>";

// Tilføjer det nye element til parent-elementet
  parentElement.innerHTML += elementToAdd;
}

// Funktion til at vise/skjule sangene
function toggleSange(id, buttonId) {
  let songList = document.getElementById(id);
  let toggleButton = document.getElementById(buttonId);
  if (songList.style.display === "none") {
    songList.style.display = "block";
    toggleButton.textContent = "Skjul Sange";
  } else {
    songList.style.display = "none";
    toggleButton.textContent = "Vis Sange";
  }
}

// Henter JSON-data fra fil og opretter album objekter
fetchContent("Data/albums.json").then((albums) => {
  let albumObjects = [];

  for (let i = 0; i < albums.length; i++) {
    const album = new Album(
      albums[i].albumName,
      albums[i].artistName,
      albums[i].productionYear, 
      albums[i].artistWebsite,
      albums[i].trackList
    );
    albumObjects.push(album);
  }
  
// Loop gennem album objekter og tilføjer dem til HTML
  albumObjects.forEach(
    function (a) {
      addDivWithAlbum(a, "content");
    });
});

// Funktion til at hente JSON-data fra en given URL (VIGTIG at huske)
async function fetchContent(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
