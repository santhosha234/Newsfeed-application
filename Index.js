<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>JavaScript News Feed</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background: #f7f7f7;
      color: #333;
    }

    header {
      background: #2c3e50;
      color: #fff;
      padding: 1rem;
      text-align: center;
    }

    #feed {
      max-width: 700px;
      margin: 20px auto;
      padding: 0 10px;
    }

    .article {
      background: #fff;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .article h2 {
      font-size: 18px;
      margin: 0 0 5px;
    }

    .article p {
      font-size: 14px;
      color: #666;
    }

    .article a {
      text-decoration: none;
      color: #2c3e50;
    }

    #refresh {
      display: block;
      margin: 15px auto;
      padding: 10px 20px;
      background: #2c3e50;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    #refresh:hover {
      background: #1b252f;
    }
  </style>
</head>
<body>

<header>
  <h1>Latest News Feed</h1>
</header>

<button id="refresh">Refresh News</button>
<div id="feed"></div>

<script>
  // Put your NewsAPI key here
  const NEWS_API_KEY = 'YOUR_NEWS_API_KEY';
  const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

  async function fetchNews() {
    const feedEl = document.getElementById('feed');
    feedEl.innerHTML = '<p>Loading news...</p>';
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      feedEl.innerHTML = '';
      data.articles.forEach(article => {
        const div = document.createElement('div');
        div.className = 'article';
        div.innerHTML = `
          <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
          <p>${article.description || ''}</p>
        `;
        feedEl.appendChild(div);
      });
    } catch (err) {
      feedEl.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
  }

  document.getElementById('refresh').addEventListener('click', fetchNews);

  // Load on startup
  fetchNews();

  // Optional: auto-refresh every 5 minutes
  // setInterval(fetchNews, 5 * 60 * 1000);
</script>

</body>
</html>
