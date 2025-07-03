// Function to load and display breaking news from local JSON file
async function loadNewsData() {
    try {
        const response = await fetch('json/news-data.json');
        const data = await response.json();
        
        window.articlesData = data.articles;

        // Load sections with specific row ranges and category filtering
        loadBreakingNews(data.articles);
        loadArticlesSection(data.articles);
        loadSmallArticlesSection(data.articles);
        loadNewsSection(data.articles);
    } catch (error) {
        console.error('Error loading news data:', error);
    }
}

// Define allowed categories for news sections
const NEWS_CATEGORIES = [
    'news',
    'events',
    'politics',
    'ads',
    'sports',
    'technology',
    'lifestyle',
    'health and science',
    'sale and rent',
    'education and culture'
];

const ARTICLES_CATEGORIES = ['articles'];

// Function to populate breaking news section (first 10 rows from news categories only)
function loadBreakingNews(articles) {
    const breakingNewsContainer = document.querySelector('.breaking-news');
    if (!breakingNewsContainer) return;
    breakingNewsContainer.innerHTML = '';
    
    // Filter articles by news categories first, then take first 10
    const newsArticles = articles.filter(article => 
        NEWS_CATEGORIES.includes(article.category.toLowerCase())
    );
    
    const breakingNewsArticles = newsArticles.slice(0, 10);
    
    if (breakingNewsArticles.length === 0) {
        breakingNewsContainer.innerHTML = '<div class="loading">No breaking news available</div>';
        return;
    }
    
    breakingNewsArticles.forEach(article => {
        const newsItem = document.createElement('a');
        newsItem.href = `article.html?id=${article.id}`;
        newsItem.className = 'new';
        const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        newsItem.innerHTML = `
            <h2 class="headline-h2">${article.title}</h2>
            <div class="breaking-news-content">
                <p class="date"><i class="fa fa-calendar"></i> ${formattedDate}</p>
                <p class="date"><i class="fa fa-info-circle"></i> ${article.category}</p>
            </div>
        `;
        breakingNewsContainer.appendChild(newsItem);
    });
}

// Function to populate articles section (articles category only)
function loadArticlesSection(articles) {
    const articlesContent = document.querySelector('.articles-content');
    if (!articlesContent) return;
    articlesContent.innerHTML = '';
    
    // Filter articles by "articles" category only
    const articlesCategoryArticles = articles.filter(article => 
        ARTICLES_CATEGORIES.includes(article.category.toLowerCase())
    );
    
    // Take first 2 articles from the filtered results
    const mainArticles = articlesCategoryArticles.slice(0, 2);
    
    if (mainArticles.length === 0) {
        articlesContent.innerHTML = '<div class="loading">No articles available</div>';
        return;
    }
    
    mainArticles.forEach(article => {
        const articleElement = document.createElement('a');
        articleElement.href = `article.html?id=${article.id}`;
        articleElement.className = 'news-article-content';
        const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        articleElement.innerHTML = `
            <h2 class="headline-h2">${article.title}</h2>
            <p class="date"><i class="fas fa-calendar"></i> ${formattedDate}</p>
            <p class="content-p">${article.summary}</p>
        `;
        articlesContent.appendChild(articleElement);
    });
}

// Function to populate small articles section (articles category only)
function loadSmallArticlesSection(articles) {
    const smallArticlesContent = document.querySelector('.small-articles-content');
    if (!smallArticlesContent) return;
    smallArticlesContent.innerHTML = '';

    // Filter articles by "articles" category only
    const articlesCategoryArticles = articles.filter(article => 
        ARTICLES_CATEGORIES.includes(article.category.toLowerCase())
    );

    // Skip first 2 and take next 11 articles (index 2-12)
    const smallArticles = articlesCategoryArticles.slice(2, 13);

    if (smallArticles.length === 0) {
        smallArticlesContent.innerHTML = '<div class="loading">No additional articles available</div>';
        return;
    }

    smallArticles.forEach(article => {
        const articleElement = document.createElement('a');
        articleElement.href = `article.html?id=${article.id}`;
        articleElement.className = 'small-article-content';

        const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        articleElement.innerHTML = `
            <h2 class="headline-h2">${article.title}</h2>
            <p class="date"><i class="fas fa-calendar"></i> ${formattedDate}</p>
            <p class="content-p">${article.summary}</p>
        `;

        smallArticlesContent.appendChild(articleElement);
    });
}

// Function to generate media HTML (image or video)
function generateMediaHTML(article, size = 'default') {
    const hasImage = article.image && article.image.trim() !== '';
    const hasVideo = article.video && article.video.trim() !== '';
    
    let placeholderSize = '400x300';
    if (size === 'large') placeholderSize = '800x400';
    if (size === 'small') placeholderSize = '200x150';
    
    if (hasImage) {
        return `<img src="${article.image}" alt="${article.title}" onerror="this.src='https://via.placeholder.com/${placeholderSize}?text=Image+Not+Available'">`;
    } else if (hasVideo) {
        return `<video controls style="width: 100%;">
                    <source src="${article.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
    } else {
        return ''; // Return empty string if no media
    }
}

// Function to populate news section (news categories only)
function loadNewsSection(articles) {
    const newsList = document.querySelector('.news-list');
    if (!newsList) return;
    newsList.innerHTML = '';
    
    // Filter articles by news categories only
    const newsArticles = articles.filter(article => 
        NEWS_CATEGORIES.includes(article.category.toLowerCase())
    );
    
    if (newsArticles.length === 0) {
        newsList.innerHTML = '<div class="loading">No news available</div>';
        return;
    }
    
    newsArticles.forEach(article => {
        const newsItem = document.createElement('article');
        newsItem.className = 'news-item';
        
        const mediaHTML = generateMediaHTML(article);

        const readMoreLink = `<a href="article.html?id=${article.id}" class="read-more">Read more</a>`;

        newsItem.innerHTML = `
            ${mediaHTML}
            <div class="news-content">
                <h2 class="headline-h2">${article.title}</h2>
                <p class="content-p">${article.summary}</p>
                ${readMoreLink}
            </div>
        `;
        newsList.appendChild(newsItem);
    });
}

// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to load individual article (for article.html page)
async function loadArticle() {
    const articleId = getUrlParameter('id');
    if (!articleId) {
        document.getElementById('article-content').innerHTML = `
            <div class="error-message">
                <h2>Article Not Found</h2>
                <p>No article ID provided.</p>
                <a href="index.html" class="back-button">Return to Home</a>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch('json/news-data.json');
        const data = await response.json();

        const article = data.articles.find(a => a.id == articleId);
        if (!article) {
            document.getElementById('article-content').innerHTML = `
                <div class="error-message">
                    <h2>Article Not Found</h2>
                    <p>The requested article could not be found.</p>
                    <a href="index.html" class="back-button">Return to Home</a>
                </div>
            `;
            return;
        }

        // Check if article category is allowed to be displayed
        const allowedCategories = [...NEWS_CATEGORIES, ...ARTICLES_CATEGORIES];
        if (!allowedCategories.includes(article.category.toLowerCase())) {
            document.getElementById('article-content').innerHTML = `
                <div class="error-message">
                    <h2>Article Not Available</h2>
                    <p>This article is not available for viewing.</p>
                    <a href="index.html" class="back-button">Return to Home</a>
                </div>
            `;
            return;
        }

        const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        document.title = `${article.title} - The Batroun Times`;

        // Generate media HTML for the article
        const articleMediaHTML = generateMediaHTML(article, 'large');
        const mediaSection = articleMediaHTML ? `<div class="article-image">${articleMediaHTML}</div>` : '';

        document.getElementById('article-content').innerHTML = `
            <div class="article-header">
                <span class="article-category">${article.category.toUpperCase()}</span>
                <h2>${article.title}</h2>
                <div class="article-meta">
                    <p class="date"><i class="fas fa-calendar"></i> ${formattedDate}</p>
                    <p class="date"><i class="fas fa-user"></i> ${article.author}</p>
                </div>
            </div>
            ${mediaSection}
            <div class="article-body">
                <div class="content-p"><p><strong>${article.summary}</strong></p></div>
                <div class="content-p">${article.content.split('\n').map(p => `<p>${p}</p>`).join('')}</div>
            </div>
            <div class="article-footer">
                <div class="article-share">
                    <h4>Share this article:</h4>
                    <div class="share-buttons">
                        <a href="#" class="share-btn facebook" onclick="shareOnFacebook('${article.title}', window.location.href)">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="share-btn twitter" onclick="shareOnTwitter('${article.title}', window.location.href)">
                            <i class="fab fa-x-twitter"></i>
                        </a>
                        <a href="#" class="share-btn whatsapp" onclick="shareOnWhatsapp('${article.title}', window.location.href)">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;

        loadRelatedArticles(data.articles, article.category, article.id);
    } catch (error) {
        console.error('Error loading article:', error);
        document.getElementById('article-content').innerHTML = `
            <div class="error-message">
                <h2>Error Loading Article</h2>
                <p>There was an error loading the article. Please try again later.</p>
                <a href="index.html" class="back-button">Return to Home</a>
            </div>
        `;
    }
}

// Function to load related articles
function loadRelatedArticles(articles, category, currentArticleId) {
    const relatedContainer = document.querySelector('.related-articles-list');
    if (!relatedContainer) return;

    // Only show related articles if the category is allowed
    const allowedCategories = [...NEWS_CATEGORIES, ...ARTICLES_CATEGORIES];
    if (!allowedCategories.includes(category.toLowerCase())) {
        relatedContainer.innerHTML = '<p>No related articles found.</p>';
        return;
    }

    const relatedArticles = articles
        .filter(article => 
            article.category.toLowerCase() === category.toLowerCase() && 
            article.id != currentArticleId &&
            allowedCategories.includes(article.category.toLowerCase())
        )
        .slice(0, 3);

    if (relatedArticles.length === 0) {
        relatedContainer.innerHTML = '<p>No related articles found.</p>';
        return;
    }

    relatedContainer.innerHTML = '';
    relatedArticles.forEach(article => {
        const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const relatedMediaHTML = generateMediaHTML(article, 'small');

        const relatedItem = document.createElement('div');
        relatedItem.className = 'related-article-item';
        relatedItem.innerHTML = `
            <a href="article.html?id=${article.id}">
                ${relatedMediaHTML}
                <div class="related-article-content">
                    <h4 class="headline-h2">${article.title}</h4>
                    <p class="date">${formattedDate}</p>
                    <p class="content-p">${article.summary.substring(0, 100)}...</p>
                </div>
            </a>
        `;
        relatedContainer.appendChild(relatedItem);
    });
}

// Social sharing functions
function shareOnFacebook(title, url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}
function shareOnTwitter(title, url) {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
}
function shareOnWhatsapp(title, url) {
    const message = `B Times\n\n*${title}*\n\nRead more:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('article.html')) {
        loadArticle();
    } else {
        loadNewsData();
    }
});
