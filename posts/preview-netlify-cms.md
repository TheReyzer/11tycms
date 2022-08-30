---
layout: layouts/post.njk
thumbnail: /images/uploads/img7.jpg
title: Preview Netlify CMS!
description: Now, when I'm writing this, I'm seeing the preview.
tags:
  - Dev
  - Bootstrap 5
date: 2022-08-30T18:00:20.851Z
---
So good! I have heard about ***custom preview*** on Netlify yesterday and start today searching more about this. First I think it dont't will be possible, because someone say Eleventy don't support that, but, if don't support, how I'm using right now!?

![Preview CMS](/images/uploads/preview.png "Preview CMS")

You just need to read the documentation about [custom preview](https://www.netlifycms.org/docs/customization/) and if you need a template for study like me, check this [article](https://ibywaks.medium.com/how-to-customize-content-preview-on-netlify-cms-with-gridsome-26e23561021) writed by Ibiyemi Adewakun that you can use on eleventy.

I have changed a little things and I will explain here.

This is my `/admin/index.html`

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  <title>Content Manager</title>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  <script>
    CMS.registerPreviewStyle("https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css");
    CMS.registerPreviewStyle("../css/global.css");
  </script>
  <script>

    var PostPreview = createClass({
      render: function() {
        const { entry, getAsset, widgetsFor } = this.props
        const imagePath = entry.getIn(['data', 'thumbnail'])
        const image = getAsset(imagePath)

        return h('div', {className: 'container-fluid mt-4 px-lg-5'},
          h('div', {className: 'd-flex justify-content-center mt-4'},
            h('img', {src: image.toString(), className: 'img-fluid post-image rounded-4 mb-5'})
          ),

          h('nav', {className: 'd-flex justify-content-center mt-4'},
            h('ol', {className: 'breadcrumb mx-auto px-2 rounded py-1 d-flex flex-row'},
              h('li', {className: 'breadcrumb-item fw-bold'},
                h('small', {className: 'breadcrumb-item fw-bold text-primary'},'Home')
              ),
              h('li', {className: 'breadcrumb-item fw-bold'},
                h('small', {className: 'breadcrumb-item fw-bold text-primary'},'Posts')
              ),
              h('li', {className: 'breadcrumb-item fw-bold last-bread text-secondary'},
                h('small', {className: 'fw-bold'},entry.getIn(['data', 'title']))
              )
            )
          ),

          h('div', {className: 'px-3 px-lg-5 mx-lg-5 my-4'},
            h('h1', {className: ''},entry.getIn(['data', 'title'])),
            h('p', {className: 'mb-4'}, entry.getIn(['data', 'description'])),
            h('div', {className: "text"}, this.props.widgetFor('body'))
          )
        );

      }
    });
  
    CMS.registerPreviewTemplate("posts", PostPreview);
  </script>
</body>
</html>
```

Above you can see on top of code this line:

```html
<script>
    CMS.registerPreviewStyle("https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css");
    CMS.registerPreviewStyle("../css/global.css");
 </script>
```

The first ***CMS.registerPreviewStyle*** calls ***Bootstrap 5***, you can install on your project with Yarn, but I didn't just because I don't want XD.

The second ***CMS.registerPreviewStyle*** call's the ***Global.css*** file on my `/css/` folder with some customizations that I made.

Down the code we have ***CMS.registerPreviewTemplate("posts", PostPreview);*** And it's set the post preview to Netlify understand what we want.

This is the basically scratch to start, have fun!