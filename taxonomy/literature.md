---
layout: documentation
sideNavigation: sidenav.literature
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


{% assign sortedLit = site.data.csv.Gelechiidae-Reference-August2023 | sort: "Authors" %}
{% for item in sortedLit %}
{% for pair in item %}
{% assign key = pair[0] %}
{% assign val = pair[1] %}
{% if key == "Authors" %}
{% assign firstChar = val | slice: 0 %}
{% assign firstCharList = firstCharList | push: firstChar %}
{% assign firstCharList = firstCharList | uniq %}
{% endif %}
{% endfor %}
{% endfor %}
{{ firstCharList | inspect }}
 