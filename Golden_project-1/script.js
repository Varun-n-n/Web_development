// Add more news articles and categorize them
const newsArticles = [
  { title: "Scientists Discover New Planet That Could Support Life", category: "World", articleId: "news1.html" },
  { title: "New Study Finds That Eating Chocolate Can Improve Your Mood", category: "World", articleId: "news2.html" },
  { title: "Self-Driving Cars Are Coming to Your City Soon", category: "Technology", articleId: "news3.html" },
  { title: "Artificial Intelligence Is Becoming More Powerful Than Ever Before", category: "Technology", articleId: "news4.html" },
  { title: "The Future of Work Is Changing, and We Need to Be Prepared", category: "Business", articleId: "news5.html" },
  { title: "New Advances in Renewable Energy Technology", category: "Technology", articleId: "news6.html" },
  { title: "Record-Breaking Sales for Tech Company XYZ", category: "Business", articleId: "news7.html" },
  { title: "Olympic Games 2024: What to Expect", category: "Sports", articleId: "news8.html" },
  { title: "Hollywood Stars Shine at the Oscars", category: "Entertainment", articleId: "news9.html" },
  { title: "World Leaders Gather for Global Summit", category: "World", articleId: "news10.html" }
];

const newsList = document.querySelector('#news-list');
const categoryList = document.querySelector('.category-list');

// Function to display a news article in the "Top News" section
const displayNewsArticle = (article) => {
  newsList.innerHTML = '';
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = article.articleId; // Get the article ID directly from the article object
  a.textContent = article.title;
  li.appendChild(a);
  newsList.appendChild(li);
  
  // Store the selected article index in a data attribute
  newsList.setAttribute('data-article-index', newsArticles.indexOf(article));
};

// Function to handle the click event on "Top News" articles and open the specific news_x.html page
const openSpecificNewsArticle = (article) => {
  const articleURL = article.articleId;
  window.location.href = articleURL; // Redirect to the specific news article page
};

// Add a click event listener to the "Top News" section
newsList.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default link behavior
  const articleIndex = parseInt(newsList.getAttribute('data-article-index'));
  const selectedArticle = newsArticles[articleIndex];
  openSpecificNewsArticle(selectedArticle);
});

// Function to display a random news article from a specific category in the "Top News" section
const displayRandomCategoryNews = (category) => {
  const filteredArticles = newsArticles.filter(article => article.category === category);
  if (filteredArticles.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredArticles.length);
    const randomCategoryArticle = filteredArticles[randomIndex];
    displayNewsArticle(randomCategoryArticle);
  } else {
    newsList.innerHTML = '<li>No articles in this category.</li>';
  }
};

// Display one random news article when the page loads
window.addEventListener('load', () => {
  // Initially, let's display a random news article
  const randomIndex = Math.floor(Math.random() * newsArticles.length);
  const randomArticle = newsArticles[randomIndex];
  displayNewsArticle(randomArticle);
});

// Display category-specific news when a category link is clicked
categoryList.addEventListener('click', (e) => {
  if (e.target.classList.contains('category-link')) {
    const selectedCategory = e.target.textContent;
    displayRandomCategoryNews(selectedCategory);
  }
});
