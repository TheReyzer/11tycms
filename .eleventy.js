module.exports = function (eleventyConfig) {
   eleventyConfig.addPassthroughCopy("images");
   eleventyConfig.addPassthroughCopy("admin");
   eleventyConfig.addPassthroughCopy('css');
}