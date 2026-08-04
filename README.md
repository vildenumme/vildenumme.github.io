# Vilde Blog Platform

## What changed
- Only one feed page is needed: `index.html`.
- Blog posts are stored in `js/posts.js`.
- JavaScript automatically shows 3 posts per page.
- Pagination uses URLs such as `index.html?page=2`.
- The first page hides the previous arrow.
- The final page hides the next arrow.
- The middle only shows `Side X av Y`.

## Add another post
1. Create the article file inside `posts/`.
2. Add one new object to the bottom of `js/posts.js`.
3. Keep newest posts at the top of the list.

The total number of pages is calculated automatically.


## Visual reactions
- Clicking the heart changes `♡` to `♥` and increases the displayed number by 1.
- Clicking again removes the visual like and restores the original number.
- Repost works the same way.
- Share opens the native share menu where supported, otherwise it copies the article link.
- Reactions are visual only and reset when the page reloads.
