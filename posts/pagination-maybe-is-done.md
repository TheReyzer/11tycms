---
layout: layouts/post.njk
thumbnail: /images/uploads/pagination-maybe-is-done-.jpg
title: Pagination maybe is done!
description: I need make some checks but it's pretty fine!
tags:
  - Dev
date: 2022-08-31T22:52:36.044Z
---
I love how the things work on 11ty. Yesterday I was maybe dawn because I cannot do the pagination system, but I don't give up, I just take a break for think.

I was thinking about play ***Sea Of Thieves*** but my mind don't leave me, so I stay all afternoon studying about this and figuring. 

After a while, I open the github and find one interesting issue about 11ty pagination, when I open that and see this: {% for post in pagination.items %} than I compare to my code, and see that I'm using `collections.posts` so you can see the difference.

This change make evertything works beautiful and nice.

Resources:

* [11ty Pagination](https://www.11ty.dev/docs/pagination/)
* [11ty Pagination Navegation](https://www.11ty.dev/docs/pagination/nav/)
* [Github Issue](https://github.com/11ty/eleventy/issues/455)