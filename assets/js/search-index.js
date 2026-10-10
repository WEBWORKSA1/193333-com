---
layout: null
---
window.SEARCH_INDEX=[{% for p in site.html_pages %}{% if p.title and p.noindex != true %}{"t":{{ p.title | jsonify }},"u":{{ p.url | jsonify }},"k":{{ p.description | default: '' | jsonify }}},{% endif %}{% endfor %}{% for p in site.angels %}{"t":{{ p.title | jsonify }},"u":{{ p.url | jsonify }},"k":"angel number meaning {{ p.num }}"},{% endfor %}{% for p in site.lifepaths %}{"t":{{ p.title | jsonify }},"u":{{ p.url | jsonify }},"k":"life path numerology"},{% endfor %}{% for p in site.guides %}{"t":{{ p.title | jsonify }},"u":{{ p.url | jsonify }},"k":{{ p.description | jsonify }}},{% endfor %}];
