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

{% for char in firstCharList %}

<div class="overflow-auto table is-narrow" markdown="block">
<table class="table is-narrow is-striped is-hoverable is-fullwidth">
<thead>
<tr>
<th class="has-text-centered" colspan="3" id="{{ char }}">{{ char }}</th>
</tr>
<tr>
<th class="has-text-centered">Authors</th>
<th>Year</th>
<th>Title</th>
</tr>
</thead>
<tbody>
{% for item in sortedLit %}
{% for pair in item %}
{% assign key = pair[0] %}
{% assign val = pair[1] %}
{% if key == "Authors" %}
{% assign firstChar = val | slice: 0 %}
{% if firstChar == char %}
<tr>
<td>{{ item.Authors }}</td>
<td>{{ item.Year }}</td>
  {% if item.Link != nil %}
   <td><a href="{{ item.Link }}" target="_blank">{{ item.Title | strip }}</a></td>
  {% else %}
  <td>{{ item.Title | strip }}</td>
  {% endif %}
 </tr>
 {% endif %}
 {% endif %}
 {% endfor %}
 {% endfor %}
 </tbody>
 </table>
 </div>
 {% endfor %}

