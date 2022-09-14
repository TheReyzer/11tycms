---
layout: layouts/post.njk
id: 5
thumbnail: /images/uploads/pagination-maybe-is-done-.jpg
title: Pagination almost done!
description: I need make some checks but it's pretty fine!
tags:
  - Dev
date: 2022-08-31T22:52:36.044Z
---
I love how things work on 11ty. Yesterday I was maybe dawn because I cannot do the pagination system, but I don't give up, I just take a break to think.

I was thinking about playing ***Sea Of Thieves*** but my mind don't leave me, so I stay all afternoon studying about this and figuring. 

After a while, I open GitHub and find one interesting issue about 11ty pagination, when I open that and see this: `pagination. items` than I compare to my code, and see that I'm using `collections. posts` so you can see the difference.

Instead, get the info on the top of the page:

```
---
pagination:
  size: 3
  data: collections
---
```

I was getting the collections after change everything works beautiful and nice.

Resources:

* [11ty Pagination](https://www.11ty.dev/docs/pagination/)
* [11ty Pagination](https://www.11ty.dev/docs/pagination/nav/)
* [GitHub Issue](https://github.com/11ty/eleventy/issues/455)