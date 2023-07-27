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

<div class="overflow-auto" style="white-space: wrap;" markdown="block">
  <table>
  {% assign sortedGenera = site.data.csv.Gelechiidae_Genera_07272023 | sort: "Genus" %}
  {% for row in sortedGenera %}
  {% if forloop.first %}
  
  <tr>
  {% for pair in row %}
  <th>{{ pair[0] }} </th>
  {% endfor %}
  </tr>
  {% endif %}

      {% tablerow pair in row %}
        {{ pair[1] }}
      {% endtablerow %}
  {% endfor %}
  </table>
</div>