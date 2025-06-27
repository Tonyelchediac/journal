function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  if (clock) {
    clock.textContent = now.toLocaleTimeString();
  }
}
setInterval(updateClock, 1000);
loadNewsData();

// JavaScript for the news website
let newsData = [];
let currentDisplayCount = 3;
const articlesPerLoad = 3;

// Load news data from JSON file
async function loadNewsData() {
  try {
    const response = await fetch("js/news-data.json");
    const data = await response.json();
    newsData = data.articles;
    displayNews();
  } catch (error) {
    console.error("Error loading news data:", error);
  }
}

// Display news articles
function displayNews() {
  const newsGrid = document.getElementById("news-grid");
  newsGrid.innerHTML = "";

  const articlesToShow = newsData.slice(0, currentDisplayCount);

  articlesToShow.forEach((article) => {
    const articleElement = document.createElement("article");
    articleElement.className = "news-card";
    articleElement.innerHTML = `
                        <img src="${article.image}" alt="${article.title}">
                        <h3>${article.title}</h3>
                        <p>${article.summary}</p>
                        <a href="#" class="read-more" data-article-id="${article.id}">Read More</a>
                    `;
    newsGrid.appendChild(articleElement);
  });

  // Hide load more button if all articles are displayed
  const loadMoreBtn = document.getElementById("load-more-news");
  if (currentDisplayCount >= newsData.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }

  // Add event listeners to read more links
  addReadMoreListeners();
}

// Add event listeners to read more links
function addReadMoreListeners() {
  const readMoreLinks = document.querySelectorAll(".read-more");
  readMoreLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const articleId = parseInt(this.getAttribute("data-article-id"));
      showFullArticle(articleId);
    });
  });
}

// Show full article in modal
function showFullArticle(articleId) {
  const article = newsData.find((a) => a.id === articleId);
  if (article) {
    const modal = document.getElementById("article-modal");
    const modalContent = document.getElementById("modal-article-content");

    modalContent.innerHTML = `
                        <img src="${article.image}" alt="${
      article.title
    }" style="width: 100%; max-height: 300px; object-fit: cover; margin-bottom: 20px;">
                        <h2>${article.title}</h2>
                        <p class="article-date"><strong>Date:</strong> ${new Date(
                          article.date
                        ).toLocaleDateString()}</p>
                        <p class="article-category"><strong>Category:</strong> ${
                          article.category
                        }</p>
                        <div class="article-content">
                            <p>${article.content}</p>
                        </div>
                    `;

    modal.style.display = "block";
  }
}

// Load more news
document
  .getElementById("load-more-news")
  .addEventListener("click", function () {
    currentDisplayCount += articlesPerLoad;
    displayNews();
  });

// Modal functionality
const modal = document.getElementById("article-modal");
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Load news data on page load
window.onload = function () {
  loadNewsData();
};
