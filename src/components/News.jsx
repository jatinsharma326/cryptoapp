import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Input } from "@mui/material";
import "../styles/news.css";

const ariaLabel = { "aria-label": "Description" };

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptoNews, setCryptoNews] = useState([]);

  const fetchNews = useCallback(() => {
    axios({
      method: "GET",
      url: "https://cryptocurrency-news-live.p.rapidapi.com/bitcoin-news",
      headers: {
        "X-RapidAPI-Host": "cryptocurrency-news-live.p.rapidapi.com",
        "X-RapidAPI-Key": `${process.env.React_APP_CryptoData_Key}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        // console.log(response);
        setCryptoNews(response?.data);
      })
      .catch((error) => {
        console.log(`The Error is ${error}`);
      });
  });

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <Input
        placeholder="News "
        inputProps={ariaLabel}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="allCryptoNewsDisplay">
        {cryptoNews
          ?.filter((news) => {
            if (searchTerm === "") {
              return news;
            } else if (
              news.source.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return news;
            }
            return news;
          })
          .map((news) => (
            <ul className="ulCryptoNews" key={news?.id}>
              <li>
                <Card sx={{ minWidth: 300 }} col-xs={4} className="cardValue">
                  <CardContent>
                    <Typography component="h4">
                      {news?.title.toUpperCase().slice(0, 30)}...
                    </Typography>
                    <a
                      className="newsanchor"
                      href={news?.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Typography variant="p" component="p">
                        {news?.source}
                      </Typography>
                      <Typography variant="p" component="p">
                        {news?.country}
                      </Typography>
                    </a>
                  </CardContent>
                </Card>
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default News;
