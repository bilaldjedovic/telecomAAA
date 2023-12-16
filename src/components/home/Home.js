import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 20px auto;
`;

const Title = styled.h1`
  color: #333;
`;

const NewsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NewsItem = styled.li`
  margin-bottom: 30px;
`;

const Image = styled.img`
  max-width: 80%;
  margin-bottom: 10px;
  display: block;
  margin: auto;
`;

const ArticleTitle = styled.h2`
  color: #444;
`;

const ArticleDescription = styled.p`
  color: #666;
`;

const ReadMoreLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

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
    <Container>
      <Title>Tech News</Title>
      <NewsList>
        {news.map((article) => (
          <NewsItem key={article.title}>
            {article.urlToImage && (
              <Image src={article.urlToImage} alt={article.title} />
            )}
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleDescription>{article.description}</ArticleDescription>
            <ReadMoreLink
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </ReadMoreLink>
          </NewsItem>
        ))}
      </NewsList>
    </Container>
  );
};

export default Home;
