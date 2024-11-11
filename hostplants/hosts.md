---
klass: insect-hosts-map
title: Gelechiidae and plant hosts map
description: Occurrence map
layout: compose
composition:
  - type: pageMarkdown
---

<article id="insect-hosts-info"></article>
<br/>
<div class="container" id="insect-hosts-map"></div>
<br/>

<script>
  const datasetTemplate = dataset => `
  <h1>
    Host plants for <i>${dataset.canonicalName}</i>
    ${dataset.authorship && dataset.year ? `(${dataset.authorship}, ${dataset.year})` : dataset.bracketAuthorship && dataset.bracketYear ? `(${dataset.bracketAuthorship}, ${dataset.bracketYear})` : ''}
  </h1>
  <div id="before-map">
  ${dataset.hostPlantsArray && dataset.hostPlantsArray.length > 0 ? `
    <div>
      <p>The Gelechiidae taxon occurrences are represented in the map by a generic moth icon.</p>
      <p>To see the host occurrences in the map, click the layer icon on the top right corner and select the desired taxon. Some taxa might not be available in the map.</p>
      <p>Map layers kindly provided by GBIF.</p>
      <p>This list of hosts is improved from Gaden S. Robinson; Phillip R. Ackery; Ian Kitching; George W Beccaloni; Luis M. Hernández (2023). HOSTS - a Database of the World's Lepidopteran Hostplants [Data set]. Natural History Museum. https://doi.org/10.5519/havt50xw.</p>
    </div>
    <ul id="host-plants-list">
      ${dataset.hostPlantsArray ? dataset.hostPlantsArray.map(plant => `<li><i>${plant.name}</i> - <a href=${plant.colUrl}>See taxon profile in Catalog of Life</a></li>`).join('') : ''}
    </ul>`:`
    <div>
      <p>No hosts found.</p>
    </div>
    `}
  </div>
`;
</script>

<script src="/assets/leaflet.js"></script>
<script src="/assets/hosts.js"></script>
