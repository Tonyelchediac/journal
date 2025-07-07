// Category page loader
class CategoryPageLoader {
    constructor(categoryName) {
        this.categoryName = categoryName.toLowerCase();
        this.articles = [];
    }

    async loadArticles() {
        try {
            const response = await fetch('json/news-data.json');
            const data = await response.json();
            
            // Filter articles by category
            this.articles = data.articles.filter(article => 
                article.category.toLowerCase() === this.categoryName ||
                article.category.toLowerCase().replace(/\s+/g, '-') === this.categoryName ||
                article.category.toLowerCase().replace(/\s+/g, '') === this.categoryName.replace(/\s+/g, '')
            );
            
            // Sort by date (newest first)
            this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            this.displayArticles();
        } catch (error) {
            console.error('Error loading articles:', error);
            this.showError();
        }
    }

    displayArticles() {
        const container = document.querySelector('.news-list');
        const noArticlesDiv = document.querySelector('.no-articles');
        
        if (this.articles.length === 0) {
            container.style.display = 'none';
            noArticlesDiv.style.display = 'block';
            return;
        }

        noArticlesDiv.style.display = 'none';
        container.innerHTML = '';

        this.articles.forEach(article => {
            const articleCard = this.createArticleCard(article);
            container.appendChild(articleCard);
        });
    }

    createArticleCard(article) {
        const card = document.createElement('div');
        card.className = 'news-item';
        card.onclick = () => window.location.href = `article.html?id=${article.id}`;

        const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        card.innerHTML = `
            ${article.image ? `<img src="${article.image}" alt="${article.title}" onerror="this.style.display='none'">` : ''}
            <div class="news-content">
                <h2 class="headline-h2">${article.title}</h2>
                <p class="content-p">${article.summary}</p>
                <div class="article-meta">
                    <span class="date">${formattedDate} |</span>
                    <span class="date">By ${article.author}</span>
                </div>
            </div>
        `;

        return card;
    }

    showError() {
        const container = document.querySelector('.articles-grid');
        container.innerHTML = '<div class="loading">Error loading articles. Please try again later.</div>';
    }

    updatePageTitle() {
        const titleElement = document.querySelector('.category-title');
        const subtitleElement = document.querySelector('.category-subtitle');
        
        if (titleElement) {
            titleElement.textContent = this.categoryName.charAt(0).toUpperCase() + this.categoryName.slice(1);
        }
        
        if (subtitleElement) {
            subtitleElement.textContent = `Latest ${this.categoryName} from The B Times`;
        }
        
        document.title = `${this.categoryName.charAt(0).toUpperCase() + this.categoryName.slice(1)} - The B Times`;
    }
}

// Initialize category page
function initializeCategoryPage(categoryName) {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new CategoryPageLoader(categoryName);
        loader.updatePageTitle();
        loader.loadArticles();
    });
}
