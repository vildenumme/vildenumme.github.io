
(() => {
  const POSTS_PER_PAGE = 3;
  const feed = document.querySelector("#post-feed");
  const previous = document.querySelector(".page-previous");
  const next = document.querySelector(".page-next");
  const status = document.querySelector(".page-status");

  if (!feed || !previous || !next || !status || !Array.isArray(window.blogPosts)) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedPage = Number.parseInt(params.get("page") || "1", 10);
  const totalPages = Math.max(1, Math.ceil(window.blogPosts.length / POSTS_PER_PAGE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;

  function pageUrl(page) {
    return page === 1 ? "index.html#feed" : `index.html?page=${page}#feed`;
  }

  function createPost(post) {
    return `
      <article class="feed-post">
        <img class="post-avatar" src="images/profile.jpg" alt="" />
        <div class="feed-post-content">
          <div class="feed-post-top">
            <div>
              <strong>Vilde</strong>
              <span>@vildenumme · ${post.shortDate}</span>
            </div>
            <button class="more-button" type="button" aria-label="More options">•••</button>
          </div>

          <p class="feed-text">${post.intro}</p>

          <a class="feed-preview" href="${post.href}">
            <div class="feed-preview-image ${post.previewClass}">
              <span>${post.previewHtml}</span>
            </div>
            <div class="feed-preview-copy">
              <span class="preview-domain">vildenumme.github.io</span>
              <h3>${post.title}</h3>
              <p>${post.description}</p>
              <span class="read-article">Read article →</span>
            </div>
          </a>

          <div class="post-actions">
            <button
              class="like-button"
              type="button"
              aria-pressed="false"
              data-count="${post.likes}"
            >
              <span class="action-icon" aria-hidden="true">♡</span>
              <span class="action-count">${post.likes}</span>
            </button>

            <button
              class="repost-button"
              type="button"
              aria-pressed="false"
              data-count="${post.reposts}"
            >
              <span class="action-icon" aria-hidden="true">↻</span>
              <span class="action-count">${post.reposts}</span>
            </button>

            <button class="share-post-button" type="button">
              <span class="action-icon" aria-hidden="true">↗</span>
              <span class="share-label">Share</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = window.blogPosts.slice(start, start + POSTS_PER_PAGE);
  feed.innerHTML = visiblePosts.map(createPost).join("");

  status.textContent = `Side ${currentPage} av ${totalPages}`;

  if (currentPage === 1) {
    previous.hidden = true;
    previous.removeAttribute("href");
  } else {
    previous.hidden = false;
    previous.href = pageUrl(currentPage - 1);
  }

  if (currentPage === totalPages) {
    next.hidden = true;
    next.removeAttribute("href");
  } else {
    next.hidden = false;
    next.href = pageUrl(currentPage + 1);
  }

  feed.addEventListener("click", async (event) => {
    const likeButton = event.target.closest(".like-button");
    const repostButton = event.target.closest(".repost-button");
    const shareButton = event.target.closest(".share-post-button");

    if (likeButton) {
      const baseCount = Number(likeButton.dataset.count || 0);
      const isActive = likeButton.getAttribute("aria-pressed") === "true";

      likeButton.setAttribute("aria-pressed", String(!isActive));
      likeButton.classList.toggle("active", !isActive);
      likeButton.querySelector(".action-icon").textContent = isActive ? "♡" : "♥";
      likeButton.querySelector(".action-count").textContent = String(
        isActive ? baseCount : baseCount + 1
      );
      return;
    }

    if (repostButton) {
      const baseCount = Number(repostButton.dataset.count || 0);
      const isActive = repostButton.getAttribute("aria-pressed") === "true";

      repostButton.setAttribute("aria-pressed", String(!isActive));
      repostButton.classList.toggle("active", !isActive);
      repostButton.querySelector(".action-count").textContent = String(
        isActive ? baseCount : baseCount + 1
      );
      return;
    }

    if (shareButton) {
      const post = shareButton.closest(".feed-post");
      const link = post?.querySelector(".feed-preview");
      const shareLabel = shareButton.querySelector(".share-label");
      const originalLabel = "Share";
      const url = link ? new URL(link.getAttribute("href"), window.location.href).href : window.location.href;

      try {
        if (navigator.share) {
          await navigator.share({ url });
          shareLabel.textContent = "Shared";
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          shareLabel.textContent = "Copied!";
        } else {
          shareLabel.textContent = "Done";
        }
      } catch {
        return;
      }

      shareButton.classList.add("active");
      window.setTimeout(() => {
        shareLabel.textContent = originalLabel;
        shareButton.classList.remove("active");
      }, 1400);
    }
  });

})();
