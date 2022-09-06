---
layout: layouts/post.njk
thumbnail: /images/uploads/frustration-and-sadness.jpg
title: Frustration and Sadness.
description: I don't want leave you 11ty... :(
tags:
  - Dev
date: 2022-09-06T22:32:17.989Z
---
I was trying to create this new project ***HugeApk 2.0*** but it won't, at least not with 11ty. And I didn't want to do it any other way than with 11ty, it's simple, easy to use, and very optimized.

I created every little thing on the site but when I realized that the pagination of the **tags** didn't work, I started to rack my brains until I realized that it wouldn't be possible to paginate something that is already paginated.

If you look now at the `"Dev"` tag, you will see that it has **A LOT** of posts, which will be a terrible problem for the site's performance in the long run.

I've seen some great implementations to solve this problem, and yes this is a problem, nobody wants to see more than 100 posts at once, my 4G would hate me. The problem is that I just didn't know how to implement it in my case.

Let's say I have **3 Tags** on some posts, `"Dev"`, `"Boostrap 5"` and `"11ty"`. If I say that I only want to see the "Dev" tag, it should show me posts with the chosen tag and the pagination with the predefined size of posts per page. So we would have something like:

```markdown
total-length: 3
size: 1

/tags/Dev/
/tags/Dev/2/
/tags/Dev/3/
```

But, when I have used some implementations, what happens is that **all the collections** that exist are stored and used in this pagination, and I couldn't do it with just **1 collection**. When arriving at **page 3** as in the example above, the pagination button is still active, and then we have another problem, it will take me to another tag like `/tags/11ty/`behavior that in pagination is unwanted.

So I think at least for now, I'll say goodbye to 11ty but keep following the evolution of the project, I hope they make some more practical solutions to this problem.

> goodbye 11ty.