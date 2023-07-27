---
layout: documentation
composition:
    - type: postHeader
    - type: pageMarkdown
lang-ref: genera
title: List of Gelechiidae Genera
background: /assets/images/Isophrictis_striatella_ASUHIC0090390.jpg
imageLicense: |
  *None for this image* But else you could add it here along with a [link perhaps](https://www.gbif.org/occurrence/2542961803)
height: 70vh
toc: false
---

<div class="overflow-auto" style="white-space: nowrap;" markdown="block">
  <table>
  {% assign sortedGenera = site.data.csv.Gelechiidae_Genera_2023 | sort: "Genus" %}
  {% for row in sortedGenera %}
  
  <tr>
  {{ row }}
  </tr>
  {% endfor %}
  </table>
</div>