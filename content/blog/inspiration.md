Title: About this site
Preview: Credit to all the people whose work inspired me when creating this site.
Date: 2023-03-24
Tags: meta

<!-- TODO: get grammarly extension for VSCode  -->

## Website Technologies

Originally, when I first thought about creating a blog, I started creating a prototype in [Vue.js](https://vuejs.org/), using the static site generator [Gridsome](https://gridsome.org/). I figured that using a framework to handle of a lot of the difficulties of static site generation would make the experience more enjoyable, and I would be able to quickly create a quality website.

However, bringing in web frameworks had its own problems. I still genuinely believe Gridsome + Vue is a very powerful option when it comes to static site generation, but I quickly found that once the codebase grew larger than what I could comfortably hold in my head, I stopped enjoying working on the site as much, and for a personal site that I'm doing for fun, that effectively killed the project for me.

Later, in a brief fascination with React, I tried to get a basic page started in a similar fashion, yet lost interest again.

In the end, what really prompted me to make a blog was stumbling across Brad Taunt's project [**B**logs **A**re **R**eally **F**un ('barf')](https://git.sr.ht/~bt/barf). barf is a fork of Karl Bartel's original [blog.sh](https://github.com/karlb/karl.berlin), both of which aim to create a static blog with an extrememly minimal code base. Finding these projects was a moment of clarity for me, as I realized that, at its core, creating a blog is about finding a way to express your thoughts and ideas with others, and it doesn't need to be through a blazing fast 🚀🚀 state-of-the-art ✨✨ single page jamstack webapp. I was overcomplicating it.

<aside>
    <p>
        That being said, I think blogs like [Josh Comeau's](https://www.joshwcomeau.com/) and [Bartosz Ciechanowski's](https://ciechanow.ski/) are a great examples of going above and beyond with visualizations and tools embedded directly into their blog posts.
    </p>
    <p>
        I'm just not doing that right now.
    </p>
</aside>

So, I slapped together a quick Ruby script, heavily reliant on [Pandoc](https://pandoc.org/), to convert markdown articles into a website. The script may not be "quality code", and it's certianly longer than both blog.sh and barf, but it's still short enough for me to enjoy working with it, and that's what matters to me.

## Website Design

When designing the actual look of the site, I drew heavily from [orlp.net](https://orlp.net/). I really like his code blocks, and overall aesthetic. [bazhenov.me](https://www.bazhenov.me/) was also inspirational as well.

I also took inspiration from the blogroll format from [perfectionkills.com](http://perfectionkills.com/).

I got the idea to display my name in a ridiculous amount of precision from [ottomated.net](https://ottomated.net/).

