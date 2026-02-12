/* PARTIE CARTE */
let map = L.map('map', {
/*   attributionControl: false, */
  maxBounds: [[-60, -180], [84, 180]],
  maxBoundsViscosity: 1.0,
  minZoom: 2.2,
  maxZoom: 5,
}
).setView([48.866667, 2.333333], 2.4);

map.scrollWheelZoom.disable();
const overlay = document.querySelector('.map-overlay');

overlay.addEventListener('click', function () {
  map.scrollWheelZoom.enable();
  overlay.classList.add('hidden');
});

map.on('mouseout', function () {
  map.scrollWheelZoom.disable();
  overlay.classList.remove('hidden');
});


const BASEMAP_ID = "f1236d311bd44cadbccf5c1a377791b4";
const API_KEY = "AAPTxy8BH1VEsoebNVZXo8HurBOs35bG4WgeJXCdQmS-h4OC0l-hLprX5hmgCy6ZkmvqY_veVa7OZAplghE5ii9P7iGiItd80By48DdLQ10URl21KrVgBPAJOKZdzOEcba5l2OjxV8PNH9YQr9w94rRNpqihDKwQoKwlAAoklBcaT7PJJntM8Ijr0IFi0xBIaJXkqJfKE4ktnPuzlFwyzA2w5EnhX6nUfmo3a7kK5pDuxV0.AT1_3NDTS2le";

L.esri.Vector.vectorBasemapLayer(BASEMAP_ID, {
  apiKey: API_KEY
}).addTo(map);


fetch('data_pays_labubu.json')
  .then(response => response.json())
  .then(data => {
    data.forEach((item) => {
      if (item.valeur > 0 && item.valeur <= 25) {
        let marker = L.marker([item.latitude, item.longitude], { icon: petitLabubu }).addTo(map);
        marker.bindPopup("<h1 style='font-size:2.3em'>" + item.pays + "</h1>" + "<p style='font-size:1.5em; margin-top:10px'>Le mot \"Labubu\" représente <strong style='color:red'>"  + item.valeur + "% </strong> des recherhes Google de ce pays.</p>");
      }

      else if (item.valeur > 25 && item.valeur < 75) {
        let marker = L.marker([item.latitude, item.longitude], { icon: moyenLabubu }).addTo(map);
        marker.bindPopup("<h1 style='font-size:2.3em'>" + item.pays + "</h1>" + "<p style='font-size:1.5em; margin-top:10px'>Le mot \"Labubu\" représente <strong style='color:red'>"  + item.valeur + "% </strong> des recherhes Google de ce pays.</p>");
      }

      else {
        let marker = L.marker([item.latitude, item.longitude], { icon: grandLabubu }).addTo(map);
        marker.bindPopup("<h1 style='font-size:2.3em'>" + item.pays + "</h1>" + "<p style='font-size:1.5em; margin-top:10px'>Le mot \"Labubu\" représente <strong style='color:red'>"  + item.valeur + "% </strong> des recherhes Google de ce pays.</p>");
      }
    })
  });


let petitLabubu = L.icon({
  iconUrl: 'MarkersLabubu/labubu_marker_rouge.png',
  iconSize: [40, 40], // size of the icon
  iconAnchor: [26, 40], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
});

let moyenLabubu = L.icon({
  iconUrl: 'MarkersLabubu/labubu_marker_bleu.png',
  iconSize: [50, 50], // size of the icon
  iconAnchor: [26, 40], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
});

let grandLabubu = L.icon({
  iconUrl: 'MarkersLabubu/labubu_marker_violet.png',
  iconSize: [60, 60], // size of the icon
  iconAnchor: [30, 56], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
});

console.log("test")