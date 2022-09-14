---
layout: layouts/post.njk
id: 15
thumbnail: /images/uploads/pagination-tags-have-arrived.jpg
title: Pagination Tags have arrived!
description: I finally did it, thanks Zach and the community for support.
categories:
  - Dev
date: 2022-09-14T18:17:44.929Z
---
Let's start...

I'm using the code from Zach:

```javascript
.eleventy.js

module.exports = function (eleventyConfig) {
   eleventyConfig.addPassthroughCopy("images");
   eleventyConfig.addPassthroughCopy("admin");
   eleventyConfig.addPassthroughCopy('css');

   var lodashChunk = require('lodash.chunk');

   // note that this uses the lodash.chunk method, so you’ll have to require that
   eleventyConfig.addCollection("doublePagination", function(collection) {
      // Get unique list of tags
      let tagSet = new Set();
      collection.getAllSorted().map(function(item) {
         if( "tags" in item.data ) {
            let tags = item.data.tags;

            // optionally filter things out before you iterate over?
            for (let tag of tags) {
               tagSet.add(tag);
            }

         }
      });

      // Get each item that matches the tag
      let paginationSize = 3;
      let tagMap = [];
      let tagArray = [...tagSet];
      for( let tagName of tagArray) {
         let tagItems = collection.getFilteredByTag(tagName);
         let pagedItems = lodashChunk(tagItems, paginationSize);
         // console.log( tagName, tagItems.length, pagedItems.length );
         for( let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
            tagMap.push({
               tagName: tagName,
               pageNumber: pageNumber,
               pageData: pagedItems[pageNumber]
            });
         }
      }

      /* return data looks like this:
         [{
            tagName: "tag1",
            pageNumber: 0
            pageData: [] // array of items
         },{
            tagName: "tag1",
            pageNumber: 1
            pageData: [] // array of items
         },{
            tagName: "tag1",
            pageNumber: 2
            pageData: [] // array of items
         },{
            tagName: "tag2",
            pageNumber: 0
            pageData: [] // array of items
         }]
      */
      //console.log( tagMap );
      return tagMap;
   });
}
```

And these is my `Tags.njk`:

```html
tags.njk

---
layout: layouts/base.njk
pagination:
  data: collections.doublePagination
  size: 1
  alias: tag
permalink: /tags/{{ tag.tagName }}/{% if tag.pageNumber %}{{ tag.pageNumber + 1 }}/{% endif %}
---

<h3>Tagged: "{{ tag.tagName }}"</h3>

<section class="row d-flex justify-content-center px-4">
        {% for post in tag.pageData %}
            <div class="w-100 col-12 col-md-6 col-lg-4 w-lg-25 mx-lg-3 pb-4 mb-3 border-0 rounded-2 d-flex flex-column">
                <a href="{{ post.url | url }}">
                    <img class="img-fluid rounded-3 border-0 w-100 post-image-preview" src="{{ post.data.thumbnail | url }}" alt="{{ post.data.title }}">
                </a>
                <h5 class="title-post mt-1 mb-0 fw-bold">{{ post.data.title }}</h5> 
                <small class="text-secondary mb-3 small">{{ post.data.description }}</small>
            </div>
        {% endfor %}
</section>

{% if pagination.pageLinks.length > 1 %}
<nav>
  <ul class="pagination justify-content-center">
    <li class=" mx-3">
  {% if pagination.previousPageLink %}
      <a class="border-0 rounded-1 btn-light-green fw-bold shadow-none px-3 py-1 page-link" href="{{ pagination.previousPageHref | url }}" aria-label="Previous">Prev</a>
  {% else %}
      <a class="user-non border-0 rounded-1 btn-light-green fw-bold shadow-none px-3 py-1 page-link" href="" aria-label="Previous">Prev</a>
  {% endif %}
    </li>

    
    <li class=" mx-3">
  {% if pagination.nextPageLink %}
      <a class="border-0 rounded-1 btn-light-green fw-bold shadow-none px-3 py-1 page-link" href="{{ pagination.nextPageHref | url }}" aria-label="Previous">Next</a>
  {% else %}
      <a class="user-non border-0 rounded-1 btn-light-green fw-bold shadow-none px-3 py-1 page-link" href="" aria-label="Previous">Next</a>
  {% endif %}
    </li>
  </ul>
</nav>
{% endif %}
```