---
layout: layouts/post.njk
id: 14
thumbnail: /images/uploads/welcome-night-mode.jpg
title: Welcome Night Mode!
description: No more pain to my eyes.
tags:
  - Dev
date: 2022-09-13T15:38:19.249Z
---
Yesterday I was reading some articles, about custom collections in **11Ty**, when I realize that my site doesn't have a Night Mode because every time I was looking at my site I want to cry.

So, I start to look for some implementations but for real, I just found three, and not work as well, I mean, when I click on the button and choose the dark mode, works, but when I choose the light mode (like default) it changes to dark mode again, I realize that implementations are not for this purpose.

After this, I start to create my implementation, and I will explain it here.

Let's start with `CSS` with my global file `global.css`.

```CSS
:root {
    --color-text: #222222;
    --color-text-50: #6c757d;
    --color-text-nav: #0000008c;
    --color-text-nav-hover: #000000b3;
    --color-background: #fffaf5;
    --color-background-25: #f0ece5;
}

[data-theme='dark'] {
  --color-text: #fffaf5;
  --color-text-50: #6c757d;
  --color-text-nav: #ffffff8c;
  --color-text-nav-hover: #ffffffb3;
  --color-background: #222222;
  --color-background-25: #191919;
}

body {
    color: var(--color-text);
    background-color: var(--color-background);
}
```

We have a light mode by default :root and a dark mode `data-theme='dark'`, which changes the colors and we just need to say what color we want to show on light and dark mode and pass this value using the `var(--variable)`.

In my navigation component called `Navbar.njk` I have the toggle button.

```html
<img class="toggle-dark-light" src="../../images/moon.svg" alt="" width="25" height="25"/>
```

Now we have the logic! In the base file, in my case `Layout.njk` before the `<body>` tags we will put this script.

```
<script>
  var themeColor = 'light';
  var logo = document.querySelector('.logo');
  var btnToggle = document.querySelector('.toggle-dark-light');
  var themeStorage = window.localStorage.getItem('theme');
            

  {# user click to change colors #}
    btnToggle.addEventListener('click',function(){
      if (themeColor === 'light') {
        // Set value of  darkmode to dark
        themeColor = 'dark';
        btnToggle.src = '../../images/sun.svg'
        logo.src  = '../../images/logo_light.svg'
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
      } else {
        // Set value of  darkmode to light
        themeColor = 'light';
        btnToggle.src = '../../images/moon.svg'
        logo.src  = '../../images/logo_dark.svg'
        document.documentElement.removeAttribute('data-theme');
        window.localStorage.setItem('theme', 'light');
      }
    });


{# if have localstorage set theme #}
  if(themeStorage){
    themeColor = themeStorage;
      if (themeColor === 'light') {
        // Set value of  darkmode to light
        themeColor = 'light';
        logo.src  = '../../images/logo_dark.svg'
        btnToggle.src = '../../images/moon.svg'
        document.documentElement.removeAttribute('data-theme');
      } else {
        // Set value of  darkmode to dark
        themeColor = 'dark';
        logo.src  = '../../images/logo_light.svg'
        btnToggle.src = '../../images/sun.svg'
        document.documentElement.setAttribute('data-theme', 'dark');
      } 
    }
    {# if don't have localstorage, set light #}
    else {
      // Set value of  darkmode to light
      themeColor = 'light';
      btnToggle.src = '../../images/moon.svg'
      document.documentElement.removeAttribute('data-theme');
      window.localStorage.setItem('theme', 'light');
    }
            
</script>
```

Let's put it in parts. We have 4 variables: 

* ***themeColor*** - Save the state of color
* ***logo*** - for change the src between light/dark mode
* ***btnToggle*** - to switch theme
* ***themeStorage*** - save the user preference in LocalStorage

After declaring all these variables, we need to create an interaction from the user to the button:

```javascript
{# user click to change colors #}
    btnToggle.addEventListener('click',function(){
      if (themeColor === 'light') {
        // Set value of  darkmode to dark
        themeColor = 'dark';
        btnToggle.src = '../../images/sun.svg'
        logo.src  = '../../images/logo_light.svg'
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
      } else {
        // Set value of  darkmode to light
        themeColor = 'light';
        btnToggle.src = '../../images/moon.svg'
        logo.src  = '../../images/logo_dark.svg'
        document.documentElement.removeAttribute('data-theme');
        window.localStorage.setItem('theme', 'light');
      }
    });
```

When the user clicks on `btnToggle`, it checks if `themeColor` has a `light` value or doesn't if have we changed to the dark value, change the **src** from the ***logo***, change the **src** from the ***button***, and set in the document the attribute `data-theme 'dark'` and save in ***localStorage***. Same for light mode.

Now we check when the user loads the page if has any value saved on ***localStorage***:

```javascript
{# if have localstorage set theme #}
  if(themeStorage){
    themeColor = themeStorage;
      if (themeColor === 'light') {
        // Set value of  darkmode to light
        themeColor = 'light';
        logo.src  = '../../images/logo_dark.svg'
        btnToggle.src = '../../images/moon.svg'
        document.documentElement.removeAttribute('data-theme');
      } else {
        // Set value of  darkmode to dark
        themeColor = 'dark';
        logo.src  = '../../images/logo_light.svg'
        btnToggle.src = '../../images/sun.svg'
        document.documentElement.setAttribute('data-theme', 'dark');
      } 
    }
    {# if don't have localstorage, set light #}
    else {
      // Set value of  darkmode to light
      themeColor = 'light';
      btnToggle.src = '../../images/moon.svg'
      document.documentElement.removeAttribute('data-theme');
      window.localStorage.setItem('theme', 'light');
    }
```

It has, it sets the saved value and changes the **src** from **variables**, if don't have any value saved, it saves a light value and set all src from variables.

It's all, I hope it helps people to do a Night Mode system without a ***flicker*** of light/dark mode! See you.
