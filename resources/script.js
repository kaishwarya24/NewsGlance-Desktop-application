const newsAPIKey = '9cb349111a70401f9e095e2a1cac3524';
let articles = [];
let currentPage = 0;
const pageSize = 3;



async function fetchNews(query = '') {
  try {
    const url = query
      ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${newsAPIKey}`
      : `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${newsAPIKey}`;
    const response = await axios.get(url);
    articles = response.data.articles || [];
    currentPage = 0;
    displayNews();
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function displayNews() {



    
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = '';

  const start = currentPage * pageSize;
  const end = start + pageSize;
  const currentArticles = articles.slice(start, end);

  if (currentArticles.length === 0) {
    newsContainer.innerHTML = '<p class="text-center col-span-3">No articles found.</p>';
    return;
  }

  currentArticles.forEach(article => {
    const card = `
  <div class="news-card">
    <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="${article.title}" class="w-full h-48 object-cover rounded-md mb-4">
    <h3 class="text-xl font-semibold mb-2">${article.title}</h3>
    <p class="text-gray-600 dark:text-gray-300 mb-4">${article.description || 'No description available.'}</p>
    <a href="${article.url}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">Read more</a>
  </div>
`;

    newsContainer.innerHTML += card;
  });
}

function nextPage() {
  if ((currentPage + 1) * pageSize < articles.length) {
    currentPage++;
    displayNews();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    displayNews();
  }
}

function searchNews() {
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    fetchNews(query);
  }
}

function toggleTheme() {
  const html = document.documentElement;
  
  const button = document.querySelector('.theme-toggle');
    html.classList.toggle('dark');


  if (html.classList.contains('dark')) {
    button.textContent = 'Light Theme';
  } else {
    button.textContent = 'Dark Theme';
  }
}

window.onload = () => fetchNews();
