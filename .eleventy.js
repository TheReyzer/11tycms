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
          //console.log( tagName, tagItems.length, pagedItems.length );
         for( let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
            
            tagMap.push({
               tagName: tagName,
               pageNumber: pageNumber,
               pageSize: pagedItems.length,
               pageData: pagedItems[pageNumber]
            });
         }
      }
      /* return data looks like:
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
      //console.log(tagMap);
      return tagMap
      ;
   });
}