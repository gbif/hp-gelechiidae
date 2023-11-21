---
layout: compose
composition:
    - type: postHeader
    - type: pageMarkdown
lang-ref: literature
title: Literature
background: /assets/images/Aristotelia_hexcopa_ASUHIC0090317.jpg
imageLicense: |
  Photo by Sangmi Lee via [ASUHIC](https://www.gbif.org/occurrence/2542961803)
height: 70vh
toc: false
---

<div class="overflow-auto table is-narrow" markdown="block">
  <table>
  {% assign sortedAuthors = site.data.csv.Gelechiidae-Reference-August2023 | sort: "Authors" %}
  {% for row in sortedAuthors %}
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