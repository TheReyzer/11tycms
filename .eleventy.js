module.exports = function (eleventyConfig) {
   eleventyConfig.addPassthroughCopy("images");
   eleventyConfig.addPassthroughCopy("admin");
   eleventyConfig.addPassthroughCopy("css");

   return {
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
      templateFormats: ["html","md","njk"]
   }
}