import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              apiKey: "f129dd740c1d4657a8d96f3e4890679a", // Replace with your API key
              country: "us",
              category: "technology",
            },
          }
        );

        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container">
      <h1>Tech News</h1>
      <ul>
        {news.map((article) => (
          <li key={article.title}>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{
                  maxWidth: "80%",
                  marginBottom: "10px",
                  display: "block",
                  margin: "auto",
                }}
              />
            )}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
