/**
 * author: @arbolitoloco (Laura Rocha Prado)
 * version: 1.0
 *
 * Uses GBIF Species API to get the scientific name associated with the taxonKey (datasetKey)
 * Adds the scientific name to the page
 * Compares the scientific name to the "Gelechiidae species name" column in the CSV and grabs the corresponding "Host full name" column values and add unique values to the page as a list
 * Uses GBIF Occurrence API to get the latitude and longitude of the occurrences of the taxonKey and adds markers to the map
 * Uses GBIF Map API to get the density layer of the hosts and adds the layer(s) to the map in different colors
 * Map is plotted in /hostplants/hosts?taxonKey=XXXXX (where XXXXX is the GBIF taxonKey of the moth)
 */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const datasetKey = urlParams.get('taxonKey');
const datasetArticleElement = document.getElementById('insect-hosts-info');

if (datasetKey) {
  fetch(`https://api.gbif.org/v1/species/${datasetKey}/name`)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      const hostPlantsArray = [];
      fetch('/assets/Gelechiidae_HostPlants_06May2024-with-taxonKey.csv')
        .then((response) => response.text())
        .then((text) => {
          let rows = text.split('\n');
          rows.shift();
          rows.forEach((row) => {
            let columns = row.split(',');
            if (columns[1] && columns[1].includes(jsonResponse.canonicalName)) {
              hostPlantsArray.push({
                name: columns[0],
                colUrl: columns[4],
                taxonKey: columns[5],
              });
            }
          });
          createLayerGroup(hostPlantsArray);
          datasetArticleElement.innerHTML = datasetTemplate({
            ...jsonResponse,
            hostPlantsArray,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      datasetArticleElement.innerHTML = datasetTemplate(jsonResponse);
    })
    .catch(function (err) {
      console.log(err);
    });
} else {
  alert('no such dataset found');
}

// /** Map */

let L = window.L;
var map = L.map('insect-hosts-map');

const osmAttrib =
  'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
let osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let osm = new L.TileLayer(osmUrl, { attribution: osmAttrib });

map.setView(new L.LatLng(15, -25), 1.5);
map.addLayer(osm);

const insectLayerOptions = {
  style: 'fire.point',
  taxonKey: datasetKey,
  icon: '/assets/images/moth.png',
};

let mothIcon = L.icon({
  iconUrl: insectLayerOptions.icon,
  iconSize: [25], // size of the icon
});

let mothPoints =
  'https://api.gbif.org/v1/occurrence/search?acceptedTaxonKey=' +
  insectLayerOptions.taxonKey +
  '&limit=4000';

fetch(mothPoints)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonResponse) {
    let results = jsonResponse.results;
    for (let i = 0; i < results.length; i++) {
      if (!results[i].decimalLatitude || !results[i].decimalLongitude) {
        continue;
      }
      let lat = results[i].decimalLatitude;
      let lng = results[i].decimalLongitude;
      let marker = L.marker([lat, lng], { icon: mothIcon, opacity: 0.5 }).addTo(
        map
      );
    }
  })
  .catch(function (err) {
    console.log(err);
  });

function createLayerGroup(hostPlantsArray) {
  let overlayMaps = {};
  let plantLayerGroup = L.layerGroup();

  // Function to generate a random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  if (hostPlantsArray && hostPlantsArray.length > 0) {
    hostPlantsArray.forEach((hostPlant) => {
      if (hostPlant.taxonKey) {
        let color = getRandomColor();

        let colorizeLayer = `
      <svg
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        width='100%'
        height='100%'
        style='float:left'
      >
        <defs>
          <filter id='colorMask-${color}'>
            <feFlood flood-color='${color}' result='flood' />
            <feComposite in="SourceGraphic" in2="flood" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
          </filter>
        </defs>
      </svg>
      `;

        let plantDensityUrl = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@2x.png?srs=EPSG:3857&taxonKey=${hostPlant.taxonKey}&basisOfRecord=PRESERVED_SPECIMEN&bin=hex&hexPerTile=512&style=white.marker`;
        let plantDensityLayer = L.tileLayer(plantDensityUrl, {
          minZoom: 1,
          maxZoom: 30,
          zoomOffset: -1,
          tileSize: 512,
          opacity: 0.3,
          attribution: osmAttrib,
        });
        let svgLayer = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg'
        );
        svgLayer.innerHTML = colorizeLayer;

        plantDensityLayer.on('tileload', function (e) {
          let img = e.tile;
          img.style.filter = `url(#colorMask-${color})`;
        });

        plantLayerGroup.addLayer(plantDensityLayer);
        plantLayerGroup.addLayer(svgLayer);
        map.getPanes().overlayPane.appendChild(svgLayer);
        overlayMaps[
          `<span style="display: inline-block; width: 12px; height: 12px; background-color: ${color}; margin-right: 5px;"></span>${hostPlant.name}`
        ] = plantDensityLayer;
      }
    });
  }
  L.control.layers(null, overlayMaps).addTo(map);
}
